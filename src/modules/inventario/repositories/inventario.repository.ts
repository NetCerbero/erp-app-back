import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Inventario } from '../entities/inventario.entity';
import { IInventario } from '../interfaces/inventario.interface';

@Injectable()
export class InventarioRepository extends Repository<Inventario> {
  constructor(private readonly source: DataSource) {
    super(Inventario, source.createEntityManager());
  }

  async insertarMasivo(
    lista: IInventario[],
    afectaCosto: boolean,
    manager?: EntityManager,
  ) {
    if (lista.length == 0) return;
    const values: string[] = [];
    const params: any[] = [];

    lista.forEach((item, index) => {
      const base = index * 5;

      values.push(
        `($${base + 1}::numeric, $${base + 2}::numeric, $${base + 3}::bigint, $${base + 4}::bigint, $${base + 5}::integer)`,
      );

      params.push(
        item.cantidadUnidadBase,
        item.costoUnidadBase,
        item.productoId,
        item.almacenId,
        item.empresaId,
      );
    });

    const ENV = process.env.ENV || '';

    const sql = `INSERT INTO ${ENV}.inventario(cantidad_unidad_base, costo_unidad_base, producto_id, almacen_id, empresa_id)
      values ${values.join(', ')}
      ON CONFLICT (producto_id,almacen_id,empresa_id)
      DO UPDATE
      SET cantidad_unidad_base = inventario.cantidad_unidad_base + EXCLUDED.cantidad_unidad_base,
      ${afectaCosto ? `costo_unidad_base = (EXCLUDED.costo_unidad_base * EXCLUDED.cantidad_unidad_base + inventario.costo_unidad_base*inventario.cantidad_unidad_base) / (EXCLUDED.cantidad_unidad_base + inventario.cantidad_unidad_base)` : ''},
      updated_at = now();`;
    console.log(sql, params);
    await (manager ?? this.manager).query(sql, params);
  }
}
