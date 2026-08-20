import { BaseMeta, ColumnNumericTransformer } from '../../../core';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Almacen } from '../../sucursal/entities/almacen.entity';
import { Dominio } from '../../dominio/entities/dominio.entity';
import { Producto } from '../../producto/entities/producto.entity';
import { InventarioMovimiento } from './inventario-movimiento.entity';

@Index(
  'uq_inventario_producto_almacen_active',
  ['productoId', 'almacenId', 'empresaId'],
  {
    unique: true,
  },
)
@Index('idx_inventario_producto_active', ['productoId'])
@Index('idx_inventario_almacen_active', ['almacenId'])
@Index('idx_inventario_empresa_active', ['empresaId'])
@Entity('inventario')
export class Inventario {
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
    name: 'cantidad_minima',
    nullable: true,
  })
  cantidadMinima: number;

  //Relacion

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

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
