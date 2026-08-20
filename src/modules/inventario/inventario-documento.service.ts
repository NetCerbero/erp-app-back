import {
  DOCUMENTO_ORIGEN,
  ESTADO_DOCUMENTO,
  IAuth,
  MSG,
  TIPO_MOVIMIENTO,
  TRANSACTION,
} from 'src/core';
import { InventarioDocumentoRepository } from './repositories/inventario-documento.repository';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CrearInventarioDocumentoDto,
  InventarioOperacionListDto,
} from './dto/inventario-documento.dto';
import {
  And,
  Between,
  EntityManager,
  In,
  LessThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { InventarioDocumento } from './entities/inventario-documento.entity';
import { InventarioDocumentoDetalleRepository } from './repositories/inventario-documento-detalle.repository';
import { InventarioService } from './inventario.service';
import { CodigoCorrelativoService } from '../codigo-correlativo/codigo-correlativo.service';
import { InventarioDocumentoDetalle } from './entities/inventario-documento-detalle.entity';
import { InventarioMovimientoService } from './inventario-movimiento.service';
import { InventarioMovimiento } from './entities/inventario-movimiento.entity';
import { InventarioMovimientoDetalle } from './entities/inventario-movimiento-detalle.entity';
import { AlmacenService } from '../sucursal/almacen.service';

@Injectable()
export class InventarioDocumentoService {
  constructor(
    private readonly documentoRep: InventarioDocumentoRepository,
    private readonly documentoDetalleRep: InventarioDocumentoDetalleRepository,
    private readonly inventarioSrv: InventarioService,
    private readonly codigoCorrelativoSrv: CodigoCorrelativoService,
    private readonly movimientoInventarioService: InventarioMovimientoService,
    private readonly almacenService: AlmacenService,
  ) {}

  async listaOperacion(auth: IAuth, params: InventarioOperacionListDto) {
    const operaciones = await this.documentoRep.find({
      select: {
        id: true,
        codigo: true,
        fechaDocumento: true,
        observacion: true,
        estado: true,
        tipo: true,
        usuario: {
          id: true,
          usuario: true,
          persona: {
            id: true,
            nombreCompleto: true,
            alias: true,
          },
        },
        almacenOrigen: {
          id: true,
          nombre: true,
          inventarioInicial: true,
          sucursal: {
            id: true,
            identificador: true,
            ubicacion: {
              id: true,
              nombre: true,
              abreviatura: true,
            },
          },
        },
        almacenDestino: {
          id: true,
          nombre: true,
          inventarioInicial: true,
          sucursal: {
            id: true,
            identificador: true,
            ubicacion: {
              id: true,
              nombre: true,
              abreviatura: true,
            },
          },
        },
      },
      where: {
        empresaId: auth.dominio,
        fechaDocumento: And(
          MoreThanOrEqual(params.inicio),
          LessThan(params.fin),
        ),
      },
      order: {
        fechaDocumento: 'desc',
        id: 'desc',
      },
      relations: [
        'almacenOrigen',
        'almacenOrigen.sucursal',
        'almacenOrigen.sucursal.ubicacion',
        'almacenDestino',
        'almacenDestino.sucursal',
        'almacenDestino.sucursal.ubicacion',
        'usuario',
        'usuario.persona',
      ],
    });

    return operaciones.map((item) => {
      return {
        id: item.id,
        estado: item.estado,
        codigo: item.codigo,
        tipo: DOCUMENTO_ORIGEN[item.tipo],
        fechaDocumento: item.fechaDocumento,
        observacion: item.observacion,
        almacenOrigen: `${item.almacenOrigen.nombre} - ${item.almacenOrigen.sucursal.ubicacion.abreviatura}`,
        almacenDestino:
          item.almacenDestino && item.tipo == DOCUMENTO_ORIGEN.TRASPASO
            ? `${item.almacenDestino.nombre} - ${item.almacenDestino.sucursal.ubicacion.abreviatura}`
            : null,
        createdAt: item.createdAt,
        usuario: item.usuario.persona.nombreCompleto,
      };
    });
  }

  async crear(auth: IAuth, payload: CrearInventarioDocumentoDto) {
    const { id, detalles, ...rstPayload } = payload;

    return await this.documentoRep.manager.transaction(
      TRANSACTION.READ_COMMITTED,
      async (manager: EntityManager) => {
        const existe = payload.id
          ? await this.bloquearOperacion(auth, payload.id, manager)
          : null;

        const estabaConfirmada = existe?.estado === ESTADO_DOCUMENTO.CONFIRMADO;
        const seEstaConfirmando =
          payload.estado === ESTADO_DOCUMENTO.CONFIRMADO;

        if (estabaConfirmada)
          throw new ConflictException(
            `La operacion #${existe?.codigo} ya se encuentra confirmado, no se puede hacer modificaciones.`,
          );

        const detallesDocumento = detalles.map((item) => {
          return this.documentoDetalleRep.create({
            id: item.id,
            empresaId: auth.dominio,
            cantidad: item.cantidad,
            observacion: item.observacion,
            productoId: item.productoId,
          });
        });

        //Bloquear almacenes
        const almacenIds = [payload.almacenOrigenId];
        if (payload.tipo == DOCUMENTO_ORIGEN.TRASPASO) {
          if (!payload.almacenDestinoId)
            throw new ConflictException(MSG.ALMACEN_NOT_DESTINO);
          almacenIds.push(payload.almacenDestinoId);
        }

        if (!estabaConfirmada && seEstaConfirmando) {
          await this.almacenService.bloquearAlmacenes(
            auth,
            almacenIds,
            manager,
          );
        }
        
        // revisar si existe el inventario inicial
        if (!existe && payload.tipo === DOCUMENTO_ORIGEN.INICIAL) {
          const existeMovimiento =
            await this.movimientoInventarioService.existeMovimiento(
              auth,
              payload.almacenOrigenId,
              manager,
            );

          if (existeMovimiento) {
            throw new ConflictException(MSG.INVENTARIO_EXISTE_MOVIMIENTO);
          }
        }

        let documentoGuardaOActualizada: InventarioDocumento;
        if (!existe) {
          const codigo = await this.codigoCorrelativoSrv.generarCodigo(
            manager,
            {
              tipo: payload.tipo,
              empresaId: auth.dominio,
              // SI PONGO SUCURSAL YA NO ES GLOBAL
              //sucursalId: auth.sucursal
            },
          );

          try {
            const inventario = seEstaConfirmando
              ? await this.inventarioSrv.listarStocks(
                  payload.almacenOrigenId,
                  detallesDocumento.map((item) => item.productoId),
                  manager,
                )
              : new Map();
            documentoGuardaOActualizada = await manager.save(
              InventarioDocumento,
              {
                ...payload,
                codigo,
                empresaId: auth.dominio,
                usuarioId: auth.id,
                detalles: detallesDocumento.map((item) => {
                  if (seEstaConfirmando) {
                    item.cantidadAnterior =
                      inventario.get(item.productoId + '')?.cantidad ||
                      undefined;
                  }

                  return item;
                }),
              },
            );
          } catch (error) {
            Logger.error(error);
            throw new ConflictException(
              `No se ha podido registrar el documento #${codigo}.`,
            );
          }
        } else {
          try {
            //ACTUALIZAR
            const idsPayload = detallesDocumento
              .filter((d) => d.id)
              .map((d) => d.id);

            const actualizando = await manager.save(InventarioDocumento, {
              ...existe,
              ...rstPayload,
            });

            // ELIMINAR DETALLES QUE NO SON PARTE DE LA COMPRA
            idsPayload.length > 0 &&
              (await manager.softDelete(InventarioDocumentoDetalle, {
                documentoId: actualizando.id,
                id: Not(In(idsPayload)),
              }));

            const existentes = detallesDocumento.filter((d) => d.id);
            const nuevos = detallesDocumento.filter((d) => !d.id);

            const existendesSave: any[] = existentes;

            const inventario = seEstaConfirmando
              ? await this.inventarioSrv.listarStocks(
                  payload.almacenOrigenId,
                  detallesDocumento.map((item) => item.productoId),
                  manager,
                )
              : new Map();

            await Promise.all(
              existentes.map((detalle) => {
                let cantidadAnterior;
                if (seEstaConfirmando) {
                  cantidadAnterior =
                    inventario.get(detalle.productoId + '')?.cantidad ||
                    undefined;
                }

                manager.update(InventarioDocumentoDetalle, detalle.id, {
                  cantidad: detalle.cantidad,
                  cantidadAnterior: cantidadAnterior,
                  productoId: detalle.productoId,
                  observacion: detalle.observacion,
                  empresaId: detalle.empresaId,
                });
              }),
            );

            const nuevosSave =
              nuevos.length > 0
                ? await manager.save(
                    InventarioDocumentoDetalle,
                    nuevos.map((d) => ({
                      cantidad: d.cantidad,
                      cantidadAnterior:
                        inventario.get(d.productoId + '')?.cantidad ||
                        undefined,
                      productoId: d.productoId,
                      documentoId: Number(actualizando.id),
                      empresaId: auth.dominio,
                      observacion: d.observacion,
                    })),
                  )
                : [];
            actualizando.detalles = [...existendesSave, ...nuevosSave];

            documentoGuardaOActualizada = actualizando;
          } catch (error) {
            Logger.error(error);
            throw new ConflictException(
              `No se ha podido editar el documento #${existe!.codigo}.`,
            );
          }
        }

        if (!estabaConfirmada && seEstaConfirmando) {
          await this.registrarMovimientoTransaccion(
            manager,
            auth,
            documentoGuardaOActualizada,
          );
        }

        return documentoGuardaOActualizada;
      },
    );
  }

  async registrarMovimientoTransaccion(
    manager: EntityManager,
    auth: IAuth,
    operacion: InventarioDocumento,
  ) {
    try {
      if (
        [DOCUMENTO_ORIGEN.AJUSTE, DOCUMENTO_ORIGEN.INICIAL].includes(
          operacion.tipo,
        )
      ) {
        await this.movimientoInventarioService.registrarTransaccion(manager, {
          documentoId: operacion.id,
          documentoOrigen: operacion.tipo,
          empresaId: operacion.empresaId,
          fechaDocumento: operacion.fechaDocumento,
          observacion: `#${operacion.codigo}`,
          tipo:
            operacion.tipo == DOCUMENTO_ORIGEN.AJUSTE
              ? TIPO_MOVIMIENTO.AJUSTE
              : TIPO_MOVIMIENTO.ENTRADA,
          usuarioId: auth.id,
          detalles: operacion.detalles.map((item) => ({
            almacenId: operacion.almacenOrigenId,
            cantidad: Math.abs((item.cantidadAnterior ?? 0) - item.cantidad),
            productoId: item.productoId,
            signo: (item.cantidadAnterior ?? 0) > item.cantidad ? -1 : 1,
          })),
        });
      } else if (DOCUMENTO_ORIGEN.TRASPASO == operacion.tipo) {
        await this.movimientoInventarioService.registrarTransaccion(manager, {
          documentoId: operacion.id,
          documentoOrigen: operacion.tipo,
          empresaId: operacion.empresaId,
          fechaDocumento: operacion.fechaDocumento,
          observacion: `#${operacion.codigo}`,
          tipo: TIPO_MOVIMIENTO.SALIDA,
          usuarioId: auth.id,
          detalles: operacion.detalles.map((item) => ({
            almacenId: operacion.almacenOrigenId,
            cantidad: Math.abs(item.cantidad),
            productoId: item.productoId,
            signo: -1, //NEGATIVO
          })),
        });

        await this.movimientoInventarioService.registrarTransaccion(manager, {
          documentoId: operacion.id,
          documentoOrigen: operacion.tipo,
          empresaId: operacion.empresaId,
          fechaDocumento: operacion.fechaDocumento,
          observacion: `#${operacion.codigo}`,
          tipo: TIPO_MOVIMIENTO.ENTRADA,
          usuarioId: auth.id,
          detalles: operacion.detalles.map((item) => ({
            almacenId: operacion.almacenDestinoId,
            cantidad: Math.abs(item.cantidad),
            productoId: item.productoId,
            signo: 1, //POSITIVO
          })),
        });
      }
    } catch (error) {
      Logger.error(error);
      throw new ConflictException(
        `No se ha podido generar el movimiento de la operacion #${operacion.codigo}.`,
      );
    }
  }

  async obtener(auth: IAuth, operacionId: number) {
    const operacion = await this.documentoRep.findOne({
      where: {
        id: operacionId,
        empresaId: auth.dominio,
      },
      relations: ['detalles'],
    });
    return operacion;
  }

  async bloquearOperacion(auth: IAuth, id: number, manager?: EntityManager) {
    return await (manager ?? this.documentoRep.manager)
      .createQueryBuilder(InventarioDocumento, 'd')
      .setLock('pessimistic_write')
      .where('d.id = :id', { id })
      .andWhere('d.empresaId = :empresaId', {
        empresaId: auth.dominio,
      })
      .getOne();
  }
}
