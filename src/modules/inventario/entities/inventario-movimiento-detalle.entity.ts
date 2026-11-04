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
import { InventarioMovimiento } from './inventario-movimiento.entity';
import { Dominio } from 'src/modules/dominio/entities/dominio.entity';

@Entity('inventario_movimiento_detalle')
export class InventarioMovimientoDetalle extends BaseMeta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'numeric',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  cantidad: number;

  @Column({
    type: 'numeric',
    name: 'costo_unitario',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  costoUnitario: number;

  @Column({
    type: 'numeric',
    name: 'costo_total',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  costoTotal: number;

  // unidad base
  @Column({
    name: 'cantidad_unidad_base',
    type: 'numeric',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  cantidadUnidadBase: number;

  @Column({
    type: 'numeric',
    name: 'costo_unitario_moneda_base',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  costoUnitarioMonedaBase: number;

  @Column({
    type: 'numeric',
    name: 'costo_total_moneda_base',
    scale: 6,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  costoTotalMonedaBase: number;

  // Relacion

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'almacen_id' })
  almacenId: number;

  @ManyToOne(() => Almacen)
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacen;

  @Column({ name: 'movimiento_id' })
  movimientoId: number;

  @ManyToOne(() => InventarioMovimiento)
  @JoinColumn({ name: 'movimiento_id' })
  movimiento: InventarioMovimiento;
}
