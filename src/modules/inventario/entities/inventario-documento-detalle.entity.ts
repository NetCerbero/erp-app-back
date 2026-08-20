import { BaseMeta, ColumnNumericTransformer } from '../../../core';
import { Producto } from '../../producto/entities/producto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventarioDocumento } from './inventario-documento.entity';
import { Dominio } from '../../dominio/entities/dominio.entity';

@Entity('inventario_documento_detalle')
export class InventarioDocumentoDetalle extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
  })
  cantidad: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
    name: 'cantidad_anterior',
  })
  cantidadAnterior?: number;

  // @Column({ type: 'smallint' })
  // signo: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacion: string;

  // Relacion
  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'documento_id' })
  documentoId: number;

  @ManyToOne(() => InventarioDocumento)
  @JoinColumn({ name: 'documento_id' })
  documento: InventarioDocumento;

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;
}
