import { BaseMeta, ColumnNumericTransformer } from 'src/core';
import { Cliente } from 'src/modules/cliente/entities/cliente.entity';
import { TasaCambio } from 'src/modules/tasa-cambio/entities/tasa-cambio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VentaEstado } from './venta-estado.entity';

export enum ESTADO_VENTA {
  ANULADO = 1,
  PENDIENTE = 2,
  COMPLETADO = 3,
}

export enum FORMA_PAGO {
  CONTADO = 1,
}

@Entity('venta_recibo')
export class Venta extends BaseMeta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint' })
  monedaId: number;

  @Column({ name: 'tasa_cambio_id', nullable: true })
  tasaCambioId: number;

  @ManyToOne(() => TasaCambio)
  @JoinColumn({ name: 'tasa_cambio_id' })
  tasaCambio: TasaCambio;

  @Column({ name: 'tasa_cambio_aplicada' })
  tasaCambioAplicada: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
  })
  descuento: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
    name: 'sub_total',
  })
  subTotal: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
    name: 'descuento_base',
  })
  descuentoBase: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
    name: 'sub_total_base',
  })
  subTotalBase: number;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
    name: 'total_base',
  })
  totalBase: number;

  @Column({ name: 'estado_actual' })
  estadoActual: ESTADO_VENTA;

  @Column({ nullable: true })
  estadoId: string;

  @OneToOne(() => VentaEstado, { nullable: true })
  @JoinColumn({ name: 'estado_id' })
  estado: VentaEstado;

  @Column({ type: 'smallint', name: 'forma_pago', default: FORMA_PAGO.CONTADO })
  formaPago: FORMA_PAGO;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ name: 'empresa_id' })
  empresaId: number;
}
