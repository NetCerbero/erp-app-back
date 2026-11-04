import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CompraRepository } from './repositories/compra.repository';
import { CompraEstadoRepository } from './repositories/compra-estado.repository';
import { CompraDetalleRepository } from './repositories/compra-detalle.repository';
import {
  DOCUMENTO_ORIGEN,
  ESTADO_DOCUMENTO,
  ESTADO_OPERACION,
  IAuth,
  MSG,
  TIPO_MOVIMIENTO,
  TRANSACTION,
} from 'src/core';
import { CrearCompraDto } from './dto/compra.dto';
import { EntityManager, In, IsNull, Not } from 'typeorm';
import { InventarioService } from '../inventario/inventario.service';
import { Compra } from './entities/compra.entity';
import { InventarioMovimientoService } from '../inventario/inventario-movimiento.service';
import { CompraEstado } from './entities/compra-estado.entity';
import { CompraDetalle } from './entities/compra-detalle.entity';
import { AlmacenService } from '../sucursal/almacen.service';
import { UnidadMedidaService } from '../unidad-medida/unidad-medida.service';
import { TasaCambioService } from '../tasa-cambio/tasa-cambio.service';
import { bulkUpdate } from 'src/core/orm/update-builk.orm';
import Decimal from 'decimal.js';

@Injectable()
export class CompraService {
  constructor(
    private readonly compraRep: CompraRepository,
    private readonly compraEstadoRep: CompraEstadoRepository,
    private readonly compraDetalleRep: CompraDetalleRepository,
    private readonly movimientoInventarioService: InventarioMovimientoService,
    private readonly almacenService: AlmacenService,
    private readonly unidadService: UnidadMedidaService,
    private readonly tasaCambioService: TasaCambioService,
  ) {}

  async listar(auth: IAuth) {
    const lista = await this.compraRep.find({
      where: { empresaId: auth.dominio, estadoActualId: Not(IsNull()) },
      order: {
        fecha: 'DESC',
        createdAt: 'DESC',
      },
      relations: [
        'estadoActual',
        'estadoActual.usuario',
        'estadoActual.usuario.persona',
        'sucursal',
        'sucursal.ubicacion',
      ],
    });

    return lista.map((item) => {
      return {
        id: item.id,
        proveedor: item.proveedorId,
        fecha: item.fecha,
        estado: item.estado,
        total: item.total,
        sucursal: item.sucursal.identificador,
        ubicacion: item.sucursal.ubicacion.nombre,
        usuario: item.estadoActual.usuario.usuario,
        nombreCompleto: item.estadoActual.usuario.persona.nombreCompleto,
        alias: item.estadoActual.usuario.persona.alias,
        createdAt: item.createdAt,
        identificador: item.identificador,
      };
    });
  }

  async crear(auth: IAuth, payload: CrearCompraDto) {
    const { id, detalles, ...rstPayload } = payload;

    console.log('PAYLOAD', JSON.stringify(payload));
    //throw new ConflictException("sdasds")

    return await this.compraRep.manager.transaction(
      TRANSACTION.SERIALIZABLE,
      async (manager: EntityManager) => {
        //
        const existe = id
          ? await this.compraRep.findOne({
              select: {
                id: true,
                identificador: true,
                empresaId: true,
                almacenId: true,
                estadoActual: { id: true, estado: true },
              },
              where: { id, empresaId: auth.dominio },
              relations: ['estadoActual'],
            })
          : null;

        const unidadIds = detalles.map((item) => item.unidadId);

        const mapUnidadConBase =
          await this.unidadService.obtenerMapConUnidadBase(auth, unidadIds);
        const { total, totalMonedaBase, detalleMovimiento } =
          payload.detalles.reduce(
            (prev, act) => {
              const total = +new Decimal(act.cantidad).mul(act.costoUnitario);
              const montoBase = this.tasaCambioService.convertir(
                act.costoUnitario,
                rstPayload.monedaId,
                rstPayload.tipoCambio,
                auth.monedaBase,
              );
              const unidad = mapUnidadConBase.get(act.unidadId);

              const cantidadBase = this.unidadService.convertir(
                act.cantidad,
                {
                  categoriaId: unidad!.categoria,
                  factor: unidad!.factor,
                },
                {
                  categoriaId: unidad!.categoria,
                  factor: unidad!.factorBase,
                },
              );
              const costoUnitarioMonedaBase = +new Decimal(montoBase.monto).div(
                unidad!.factor,
              );
              const totalBase = +new Decimal(cantidadBase).mul(
                costoUnitarioMonedaBase,
              );

              prev.detalleMovimiento.push(
                this.compraDetalleRep.create({
                  ...act,
                  total,
                  empresaId: auth.dominio,
                  compraId: existe?.id,
                  cantidadBase: cantidadBase,
                  costoUnitarioMonedaBase: costoUnitarioMonedaBase,
                  totalMonedaBase: totalBase,
                }),
              );
              prev.total += total;
              prev.totalMonedaBase += totalBase;
              return prev;
            },
            { total: 0, totalMonedaBase: 0, detalleMovimiento: [] as any[] },
          );

        const estadoCreado = this.compraEstadoRep.create({
          estado: payload.estado,
          usuarioId: auth.id,
          compraId: existe?.id,
        });

        const estabaConfirmada =
          existe?.estadoActual?.estado === ESTADO_DOCUMENTO.CONFIRMADO;

        const seEstaConfirmando =
          payload.estado === ESTADO_DOCUMENTO.CONFIRMADO;

        if (estabaConfirmada)
          throw new ConflictException(
            `La compra #${existe?.identificador} ya se encuentra confirmado, no se puede hacer modificaciones.`,
          );

        // CREACION Y EDICION COMPRA
        let compraGuardaOActualizada: Compra;
        if (!existe) {
          try {
            const compra = await manager.save(Compra, {
              ...rstPayload,
              detalles: detalleMovimiento,
              total,
              empresaId: auth.dominio,
              totalMonedaBase: totalMonedaBase,
            });
            estadoCreado.compraId = compra.id;
            const estadoActual = await manager.save(CompraEstado, estadoCreado);
            if (estadoActual) {
              await manager.update(Compra, compra.id, {
                estadoActualId: estadoActual.id,
              });
            }
            compra.estadoActual = estadoActual;
            compraGuardaOActualizada = compra;
          } catch (error) {
            Logger.error(error);
            throw new ConflictException(
              `No se ha podido registrar la compra #${payload.identificador}.`,
            );
          }
        } else {
          try {
            //ACTUALIZAR
            const idsPayload = detalleMovimiento
              .filter((d) => d.id)
              .map((d) => d.id);

            const actualizando = await manager.save(Compra, {
              ...existe,
              ...rstPayload,
              total,
              totalMonedaBase,
            });

            // ELIMINAR DETALLES QUE A NO SON PARTE DE LA COMPRA
            idsPayload.length > 0 &&
              (await manager.softDelete(CompraDetalle, {
                compraId: actualizando.id,
                id: Not(In(idsPayload)),
              }));

            const existentes = detalleMovimiento.filter((d) => d.id);
            const nuevos = detalleMovimiento.filter((d) => !d.id);

            const existendesSave: any[] = existentes;

            await bulkUpdate(manager, CompraDetalle, existendesSave, {
              key: 'id',
              fields: [
                'id',
                'cantidad',
                'costoUnitario',
                'total',
                'cantidadBase',
                'costoUnitarioMonedaBase',
                'totalMonedaBase',
                'unidadId',
                'productoId',
              ],
            });
            // await Promise.all(
            //   existentes.map((detalle) => {
            //     manager.update(CompraDetalle, detalle.id, {
            //       cantidad: detalle.cantidad,
            //       costoUnitario: detalle.costoUnitario,
            //       total: detalle.total,
            //       cantidadBase: detalle.cantidadBase,
            //       costoUnitarioMonedaBase: detalle.costoUnitarioMonedaBase,
            //       totalMonedaBase: detalle.totalMonedaBase,
            //       unidadId: detalle.unidadId,
            //       productoId: detalle.productoId,
            //     });
            //   }),
            // );
            const nuevosSave =
              nuevos.length > 0
                ? await manager.save(
                    CompraDetalle,
                    nuevos.map((d) => ({
                      cantidad: d.cantidad,
                      costoUnitario: d.costoUnitario,
                      total: d.total,
                      almacenId: d.almacenId,
                      productoId: d.productoId,
                      compraId: Number(actualizando.id),
                      empresaId: auth.dominio,
                      cantidadBase: d.cantidadBase,
                      costoUnitarioMonedaBase: d.costoUnitarioMonedaBase,
                      totalMonedaBase: d.totalMonedaBase,
                      unidadId: d.unidadId,
                    })),
                  )
                : [];
            estadoCreado.compraId = actualizando.id;
            const estadoActual = await manager.save(CompraEstado, estadoCreado);
            if (estadoActual) {
              await manager.update(Compra, actualizando.id, {
                estadoActualId: estadoActual.id,
              });
            }
            actualizando.estadoActual = estadoActual;
            actualizando.detalles = [...existendesSave, ...nuevosSave];
            compraGuardaOActualizada = actualizando;
          } catch (error) {
            Logger.error(error);
            throw new ConflictException(
              `No se ha podido editar la compra #${payload.identificador}.`,
            );
          }
        }

        if (!estabaConfirmada && seEstaConfirmando) {
          await this.registrarMovimientoTransaccion(
            manager,
            auth,
            compraGuardaOActualizada,
          );
        }
        return compraGuardaOActualizada;
      },
    );
  }

  async registrarMovimientoTransaccion(
    manager: EntityManager,
    auth: IAuth,
    compra: Compra,
  ) {
    try {
      console.log("COMPRA registrarMovimientoTransaccion",compra)
      await this.movimientoInventarioService.registrarTransaccion(
        manager,
        {
          documentoId: compra.id,
          documentoOrigen: DOCUMENTO_ORIGEN.COMPRA,
          empresaId: compra.empresaId,
          fechaDocumento: compra.fecha,
          observacion: `COMPRA #${compra.identificador}`,
          tipo: TIPO_MOVIMIENTO.ENTRADA,
          usuarioId: auth.id,
          monedaId: compra.monedaId,
          almacenId: compra.almacenId,
          detalles: compra.detalles.map((item) => ({
            unidadId: item.unidadId,
            cantidad: item.cantidad,
            costoUnitario: item.costoUnitario,
            costoTotal: item.total,
            productoId: item.productoId,
            almacenId: compra.almacenId,
            cantidadUnidadBase: item.cantidadBase,
            costoUnitarioMonedaBase: item.costoUnitarioMonedaBase,
            costoTotalMonedaBase: item.totalMonedaBase,
            empresaId: item.empresaId,
          })),
        },
        true,
      );
    } catch (error) {
      Logger.error(error);
      throw new ConflictException(
        `No se ha podido generar el movimiento de la compra #${compra.identificador}.`,
      );
    }
  }

  async getById(auth: IAuth, id: number) {
    const compra = await this.compraRep.findOne({
      where: { empresaId: auth.dominio, id },
      relations: ['estadoActual', 'sucursal', 'detalles'],
    });
    if (!compra) {
      throw new ConflictException(MSG.NOT_FOUND);
    }
    return compra;
  }
}
