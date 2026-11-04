import { BaseMeta, ColumnNumericTransformer } from '../../../core';
import { Producto } from '../../producto/entities/producto.entity';
import { Almacen } from '../../sucursal/entities/almacen.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Dominio } from '../../dominio/entities/dominio.entity';
import { UnidadMedida } from 'src/modules/unidad-medida/entities/unidad-medida.entity';

@Entity('compra_detalle')
export class CompraDetalle extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    type: 'numeric',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  cantidad: number;

  @Column({
    name: 'cantidad_base',
    type: 'numeric',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  cantidadBase: number;

  @Column({
    name: 'costo_unitario',
    type: 'numeric',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  costoUnitario: number;

  @Column({
    name: 'costo_unitario_moneda_base',
    type: 'numeric',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  costoUnitarioMonedaBase: number;

  @Column({
    name: 'total',
    type: 'numeric',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  @Column({
    name: 'total_moneda_base',
    type: 'numeric',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  totalMonedaBase: number;

  //RELACION
  @Column({ name: 'unidad_id' })
  unidadId: number;

  @ManyToOne(() => UnidadMedida)
  @JoinColumn({ name: 'unidad_id' })
  unidad: UnidadMedida;

  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'compra_id' })
  compraId: number;

  @ManyToOne(() => Compra)
  @JoinColumn({ name: 'compra_id' })
  compra: Compra;

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;
}
