import { Injectable } from '@nestjs/common';
import { InventarioDocumento } from '../entities/inventario-documento.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class InventarioDocumentoRepository extends Repository<InventarioDocumento> {
  constructor(private readonly source: DataSource) {
    super(InventarioDocumento, source.createEntityManager());
  }

  async updateMasivo(
    lista: {
      id: number;
      cantidad: number;
      cantidadAnterior?: number | null;
      productoId: number;
      observacion: string | null;
      empresaId: number;
    }[],
    manager?: EntityManager,
  ) {
    if (!lista.length) {
      return;
    }
    const values: unknown[] = [];

    const rows = lista.map((detalle) => {
      const startIndex = values.length + 1;

      values.push(
        detalle.id,
        detalle.cantidad,
        detalle.cantidadAnterior,
        detalle.observacion,
        detalle.productoId,
        detalle.empresaId,
      );

      return `($${startIndex}::bigint,
      $${startIndex + 1}::numeric,
      $${startIndex + 2}::numeric,
      $${startIndex + 3}::varchar,
      $${startIndex + 4}::bigint,
      $${startIndex + 5}::integer)`;
    });

    const ENV = process.env.ENV || '';
    const sql = `

    update ${ENV}.inventario_documento_detalle AS target
    set 
      cantidad = source.cantidad,
      cantidad_anterior = source.cantidad_anterior,
      observacion = source.observacion,
      producto_id = source.producto_id,
      empresa_id = source.empresa_id,
      updated_at = CURRENT_TIMESTAMP
    FROM (
      VALUES
        ${rows.join(',')}
    ) AS source (
      id,
      cantidad,
      cantidad_anterior,
      observacion,
      producto_id,
      empresa_id
    )
    WHERE target.id = source.id
  `;
    await (manager ?? this.manager).query(sql, values);
  }
}
