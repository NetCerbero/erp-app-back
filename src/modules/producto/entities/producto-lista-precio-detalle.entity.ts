import { BaseMeta, ColumnNumericTransformer } from 'src/core';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductoListaPrecio } from './producto-lista-precio.entity';
import { UnidadMedida } from 'src/modules/unidad-medida/entities/unidad-medida.entity';
import { Producto } from './producto.entity';

@Entity('producto_lista_precio_detalle')
export class ProductoListaPrecioDetalle extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'numeric',
    precision: 20,
    scale: 2,
    default: 1,
    transformer: new ColumnNumericTransformer(),
  })
  precio: number;

  // RELACIONES
  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'unidad_id' })
  unidadId: number;

  @ManyToOne(() => UnidadMedida)
  @JoinColumn({ name: 'unidad_id' })
  unidad: UnidadMedida;

  @Column({ name: 'lista_precio_id' })
  listaPrecioId: number;

  @ManyToOne(() => ProductoListaPrecio)
  @JoinColumn({ name: 'lista_precio_id' })
  listaPrecio: ProductoListaPrecio;

  @Column({ name: 'empresa_id' })
  empresaId: number;
}
