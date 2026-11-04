import { BaseMeta } from 'src/core';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ESTADO_VENTA, Venta } from './venta.entity';

@Entity('venta_estado')
export class VentaEstado extends BaseMeta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint' })
  estado: ESTADO_VENTA;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ name: 'venta_id' })
  ventaId: number;

  @ManyToOne(() => Venta)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;
}
