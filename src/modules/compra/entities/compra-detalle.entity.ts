import { BaseMeta, ColumnNumericTransformer } from '../../../core';
import { Producto } from '../../producto/entities/producto.entity';
import { Almacen } from '../../sucursal/entities/almacen.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Dominio } from '../../dominio/entities/dominio.entity';

@Entity('compra_detalle')
export class CompraDetalle extends BaseMeta {
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
    name: 'costo_unitario',
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
  })
  costoUnitario: number;

  @Column({
    name: 'total',
    type: 'numeric',
    scale: 2,
    precision: 18,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  //RELACION
  @Column({ name: 'almacen_id' })
  almacenId: number;

  @ManyToOne(() => Almacen)
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacen;

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
