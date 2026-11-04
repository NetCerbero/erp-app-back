import { BaseMeta, ColumnNumericTransformer, MONEDA } from 'src/core';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('moneda_tasa_cambio')
export class TasaCambio extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'moneda_id', type: 'smallint' })
  monedaId: MONEDA;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({
    type: 'numeric',
    precision: 20,
    scale: 2,
    default: 1,
    transformer: new ColumnNumericTransformer(),
  })
  compra: number;

  @Column({
    type: 'numeric',
    precision: 20,
    scale: 2,
    default: 1,
    transformer: new ColumnNumericTransformer(),
  })
  venta: number;

  @Column({ name: 'empresa_id' })
  empresaId: number;
}
