import { ESTADO_DOCUMENTO } from '../../../core';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Credencial } from '../../usuario/entities/credencial.entity';

@Entity('compra_estado')
export class CompraEstado extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint' })
  estado: ESTADO_DOCUMENTO;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
    select: false,
  })
  deletedAt: Date;

  // Relacion
  @Column({ name: 'compra_id', nullable: true })
  compraId: number;

  @ManyToOne(() => Compra, { nullable: true })
  @JoinColumn({ name: 'compra_id' })
  compra: Compra;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(() => Credencial)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Credencial;
}
