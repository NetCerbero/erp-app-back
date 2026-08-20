import {
  BaseMeta,
  ColumnNumericTransformer,
  ESTADO,
  TIPO_PRODUCTO,
} from '../../../core';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dominio } from '../../dominio/entities/dominio.entity';
import { ProductoSucursal } from './producto-sucursal.entity';
import { Inventario } from '../../inventario/entities/inventario.entity';

@Entity('producto')
export class Producto extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  identificador: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
    nullable: true,
  })
  costo: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
    name: 'precio_base',
  })
  precioBase: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: TIPO_PRODUCTO.SERVICIO })
  tipo: TIPO_PRODUCTO;

  @Column({ type: 'smallint', default: ESTADO.ACTIVO })
  estado: ESTADO;

  @Column({ type: 'boolean', default: false })
  tpv: boolean;

  @Column({ type: 'boolean', name: 'control_stock', default: false })
  controlStock: boolean;

  // Relacion
  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  @OneToMany(() => ProductoSucursal, (p) => p.producto, { cascade: true })
  disponiblesEn: ProductoSucursal[];

  @OneToMany(() => Inventario, (inv) => inv.producto)
  stocks: Inventario[];
}
