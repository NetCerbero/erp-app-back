import { Dominio } from '../../dominio/entities/dominio.entity';
import { DOCUMENTO_ORIGEN } from '../../../core';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('codigo_correlativo')
export class CodigoCorrelativo extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  tipo: DOCUMENTO_ORIGEN;

  @Column({ name: 'sucursal_id', type: 'int', nullable: true })
  sucursalId: number;

  @Column()
  prefijo: string;

  @Column()
  anio: number;

  @Column({ type: 'int' })
  ultimo: number;

  // relacion
  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
    select: false,
  })
  deletedAt: Date;
}
