import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CompraRepository } from './repositories/compra.repository';
import { CompraEstadoRepository } from './repositories/compra-estado.repository';
import { CompraDetalleRepository } from './repositories/compra-detalle.repository';
import {
  DOCUMENTO_ORIGEN,
  ESTADO_DOCUMENTO,
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

@Injectable()
export class CompraService {
  constructor(
    private readonly compraRep: CompraRepository,
    private readonly compraEstadoRep: CompraEstadoRepository,
    private readonly compraDetalleRep: CompraDetalleRepository,
    private readonly movimientoInventarioService: InventarioMovimientoService,
    private readonly almacenService: AlmacenService
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
    
    return await this.compraRep.manager.transaction(
      TRANSACTION.READ_COMMITTED,
      async (manager: EntityManager) => {
        //
        const existe = id ? await this.bloquearCompra(auth, id, manager) : null;

        const { total, detalleMovimiento } = payload.detalles.reduce(
          (prev, act) => {
            const total = act.cantidad * act.costoUnitario;
            prev.detalleMovimiento.push(
              this.compraDetalleRep.create({
                ...act,
                total,
                almacenId: act.almacenId,
                empresaId: auth.dominio,
                compraId: existe?.id,
              }),
            );
            prev.total += total;
            return prev;
          },
          { total: 0, detalleMovimiento: [] as any[] },
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

        // BLOQUEANDO ALMACEN
        if (!estabaConfirmada && seEstaConfirmando) {
          await this.almacenService.bloquearAlmacenes(
            auth,
            detalleMovimiento.map((x) => x.almacenId),
            manager,
          );
        }
        // CREACION Y EDICION COMPRA
        let compraGuardaOActualizada: Compra;
        if (!existe) {
          try {
            const compra = await manager.save(Compra, {
              ...rstPayload,
              detalles: detalleMovimiento,
              total,
              empresaId: auth.dominio,
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

            await Promise.all(
              existentes.map((detalle) => {
                manager.update(CompraDetalle, detalle.id, {
                  cantidad: detalle.cantidad,
                  costoUnitario: detalle.costoUnitario,
                  total: detalle.total,
                  almacenId: detalle.almacenId,
                  productoId: detalle.productoId,
                });
              }),
            );
            // for (const detalle of existentes) {
            //   const rsp = await manager.update(CompraDetalle, detalle.id, {
            //     cantidad: detalle.cantidad,
            //     costoUnitario: detalle.costoUnitario,
            //     total: detalle.total,
            //     almacenId: detalle.almacenId,
            //     productoId: detalle.productoId,
            //   });
            //   existendesSave.push(detalle);
            // }
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
      await this.movimientoInventarioService.registrarTransaccion(manager, {
        documentoId: compra.id,
        documentoOrigen: DOCUMENTO_ORIGEN.COMPRA,
        empresaId: compra.empresaId,
        fechaDocumento: compra.fecha,
        observacion: `COMPRA #${compra.identificador}`,
        tipo: TIPO_MOVIMIENTO.ENTRADA,
        usuarioId: auth.id,
        detalles: compra.detalles.map((item) => ({
          almacenId: item.almacenId,
          cantidad: Math.abs(item.cantidad),
          costoUnitario: item.costoUnitario,
          productoId: item.productoId,
          signo: item.cantidad > 0 ? 1 : -1,
        })),
      });
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

  async bloquearCompra(auth: IAuth, id: number, manager?: EntityManager) {
    return await (manager ?? this.compraRep.manager)
      .createQueryBuilder(Compra, 'c')
      .leftJoinAndSelect('c.estadoActual', 'estadoActual')
      .setLock('pessimistic_write')
      .where('c.id = :id', { id })
      .andWhere('c.empresaId = :empresaId', {
        empresaId: auth.dominio,
      })
      .getOne();
  }
}
