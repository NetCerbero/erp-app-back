import { BaseMeta, ESTADO, MONEDA } from 'src/core';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductoListaPrecioDetalle } from './producto-lista-precio-detalle.entity';
import { Concepto } from 'src/modules/concepto/entities/concepto.entity';

@Entity('producto_lista_precio')
export class ProductoListaPrecio extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ name: 'moneda_id', type: 'int' })
  monedaId: MONEDA;

  // relacion
  @ManyToOne(() => Concepto, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'moneda_id', referencedColumnName: 'value' })
  moneda: Concepto;

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @Column({ type: 'smallint', default: ESTADO.ACTIVO })
  estado: ESTADO;

  @OneToMany(() => ProductoListaPrecioDetalle, (lp) => lp.listaPrecio)
  listaPrecios: ProductoListaPrecioDetalle[];
}
