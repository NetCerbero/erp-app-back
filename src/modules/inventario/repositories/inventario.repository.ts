import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Inventario } from '../entities/inventario.entity';
import { IInventario } from '../interfaces/inventario.interface';

@Injectable()
export class InventarioRepository extends Repository<Inventario> {
  constructor(private readonly source: DataSource) {
    super(Inventario, source.createEntityManager());
  }

  async insertarMasivo(lista: IInventario[], manager?: EntityManager) {
    if (lista.length == 0) return;
    const values: string[] = [];
    const params: any[] = [];

    lista.forEach((item, index) => {
      const base = index * 4;

      values.push(`($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`);

      params.push(
        item.cantidad,
        item.productoId,
        item.almacenId,
        item.empresaId,
      );
    });
    const sql = `INSERT INTO inventario (cantidad, producto_id, almacen_id, empresa_id)
      values ${values.join(', ')}
      ON CONFLICT (producto_id,almacen_id,empresa_id)
      DO UPDATE
      SET cantidad = inventario.cantidad + EXCLUDED.cantidad, updated_at = now();`;
    console.log(sql, params);
    await (manager ?? this.manager).query(sql, params);
  }
}
