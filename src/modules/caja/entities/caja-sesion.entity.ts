import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseMeta, ESTADO_CAJA } from '../../../core';

export class CajaSesion extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_apertura' })
  fechaApertura: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'fecha_cierre' })
  fechaCierre: number;

  @Column({ type: 'numeric', nullable: true, name: 'fecha_cierre' })
  montoInicial: number;

  @Column({ type: 'smallint' })
  estado: ESTADO_CAJA;

  @Column({ name: 'caja_id' })
  cajaId: number;

  @Column({ name: 'usuario_apertura_id' })
  usuarioAperturaId: number;

  @Column({ name: 'usuario_cierre_id' })
  usuarioCierreId: number;
}
