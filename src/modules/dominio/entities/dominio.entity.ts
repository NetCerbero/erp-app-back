import { Permiso } from '../../permiso/entities/permiso.entity';
import { BaseMeta, ESTADO, MONEDA } from '../../../core';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuario_dominio')
export class Dominio extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  alias?: string;

  @Column({ type: 'varchar', name: 'razon_social', length: 200 })
  razonSocial: string;

  @Column({ type: 'varchar', length: 20 })
  identificador: string;

  @Column({ type: 'int', name: 'codigo_pais', nullable: true })
  codigoPais?: number;

  @Column({ type: 'int', nullable: true })
  celular?: number;

  @Column({ type: 'smallint', default: ESTADO.ACTIVO })
  estado?: ESTADO;

  @Column({ type: 'text', nullable: true })
  logo?: string;

  @Column({ type: 'bool', name: 'es_publico', default: false })
  esPublico?: boolean;

  // PREFERENCIA EMPRESA
  @Column({ name: 'moneda_base', default: MONEDA.BOB })
  monedaBase: MONEDA;

  //
  @Column({ type: 'int', name: 'permiso_id', nullable: true })
  permisoId?: number;

  @ManyToOne(() => Permiso)
  @JoinColumn({ name: 'permiso_id' })
  permiso: Permiso;
}
