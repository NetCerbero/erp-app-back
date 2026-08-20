import { BaseMeta } from '../../../core';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario_acceso_sesion')
export class AccesoSesion extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text', name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ type: 'text', nullable: true, name: 'user_agent' })
  userAgent: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  ip: string;

  @Column({ type: 'bigint', name: 'credencial_id' })
  credencialId: number;
}
