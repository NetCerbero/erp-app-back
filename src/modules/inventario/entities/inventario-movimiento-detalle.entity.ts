import { BaseMeta, ColumnNumericTransformer } from '../../../core';
import { Producto } from '../../producto/entities/producto.entity';
import { Almacen } from '../../sucursal/entities/almacen.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventarioMovimiento } from './inventario-movimiento.entity';

@Entity('inventario_movimiento_detalle')
export class InventarioMovimientoDetalle extends BaseMeta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
  })
  cantidad: number;

  @Column({
    type: 'numeric',
    name: 'costo_unitario',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  costoUnitario?: number;

  @Column({ type: 'smallint' })
  signo: number;

  // Relacion

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
