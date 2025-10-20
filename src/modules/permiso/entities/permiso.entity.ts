import { BaseMeta, ESTADO } from '../../../core';
import { Dominio } from '../../dominio/entities/dominio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermisoAccion } from './permiso-accion.entity';

@Entity('permiso_usuario')
export class Permiso extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 10, default: ESTADO.ACTIVO })
  estado: ESTADO;

  @Column({ name: 'es_editable', type: 'bool', default: true })
  esEditable: boolean;// CUANDO SON PERMISO GLOBAL GENERICO NO TIENE EMPRESA ASOCIADA ES UN PERFIL EMPRESA O ADMIN

  // RELACION
  @Column({ name: 'empresa_id', nullable: true })
  empresaId: number;

  @ManyToMany(() => Dominio, { nullable: true })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  @OneToMany(() => PermisoAccion, (p) => p.permiso, { cascade: true })
  acciones: PermisoAccion[];

  @OneToMany(() => Dominio, (c) => c.permiso)
  dominios: Dominio[];
}
