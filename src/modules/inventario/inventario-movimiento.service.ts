import { Injectable, Logger } from '@nestjs/common';
import { InventarioMovimientoRepository } from './repositories/inventario-movimiento.repository';
import { InventarioDocumentoDetalleRepository } from './repositories/inventario-documento-detalle.repository';
import { IMovimiento } from './interfaces/inventario-movimiento.interface';
import { EntityManager } from 'typeorm';
import { InventarioMovimiento } from './entities/inventario-movimiento.entity';
import { InventarioService } from './inventario.service';
import { IInventario } from './interfaces/inventario.interface';
import { IAuth } from 'src/core';
import { InventarioMovimientoDetalle } from './entities/inventario-movimiento-detalle.entity';

@Injectable()
export class InventarioMovimientoService {
  constructor(
    private readonly movimientoRep: InventarioMovimientoRepository,
    private readonly movimientoDetRep: InventarioDocumentoDetalleRepository,
    private readonly inventarioService: InventarioService,
  ) {}

  async registrarTransaccion(
    manager: EntityManager,
    params: IMovimiento,
    afectaCosto: boolean,
  ) {
    console.log("registrarTransaccion INV MOV",params)
    const movimiento = await manager.save(InventarioMovimiento, { ...params });
    const detalles: IInventario[] = movimiento.detalles.map((item) => ({
      almacenId: item.almacenId,
      empresaId: movimiento.empresaId,
      productoId: item.productoId,
      cantidadUnidadBase: item.cantidadUnidadBase,
      costoUnidadBase: item.costoUnitarioMonedaBase,
    }));
    Logger.debug('Registrando movimiento inventario', 'Movimiento Inventario');
    await this.inventarioService.registrar(detalles, afectaCosto, manager);
  }

  async existeMovimiento(
    auth: IAuth,
    almacenId: number,
    manager?: EntityManager,
  ) {
    const existeMovimiento = await (manager ?? this.movimientoRep.manager)
      .createQueryBuilder(InventarioMovimientoDetalle, 'd')
      .innerJoin('d.movimiento', 'm')
      .where('m.empresa_id = :empresaId', {
        empresaId: auth.dominio,
      })
      .andWhere('d.almacen_id = :almacenId', {
        almacenId: almacenId,
      })
      .getExists();

    return existeMovimiento;
  }
}
