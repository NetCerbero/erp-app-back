import { BaseMeta } from '../../../core';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Credencial } from './credencial.entity';
import { Dominio } from '../../dominio/entities/dominio.entity';
import { Sucursal } from '../../sucursal/entities/sucursal.entity';

@Entity('usuario_persona')
export class Persona extends BaseMeta {
  @PrimaryGeneratedColumn({type:"bigint"})
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  alias?: string;

  @Column({ type: 'varchar', length: 200, name: 'nombre_completo' })
  nombreCompleto: string;

  @Column({type:"int", nullable:true})
  tipoIdentificador:number 
  
  @Column({ type: 'varchar', length: 20, nullable: true })
  identificador?: string;

  @Column({ type: 'varchar', length: 5, name: 'codigo_pais', nullable: true })
  codigoPais?: string;

  @Column({ type: 'int', nullable: true })
  celular?: number;

  @Column({ type: 'boolean', name: 'es_visible', default: true })
  esVisible: boolean; // si no es visible no mostrar en los reportes o tripulantes del viaje chofer|ayudante|etc
  // RELACIONES

  @Column({ name: 'sucursal_id', nullable: true })
  sucursalId: number;

  @ManyToOne(() => Sucursal, { nullable: true })
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Sucursal;

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio)
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  @OneToOne(() => Credencial, (p) => p.persona, { cascade: true })
  credencial: Credencial;

  //AQUI DEBE IR LOS PERFILES VENDEDOR|ADMIN|CHOFER|AYUDANTE|AZAFATA|ENCARGADO|SUPERVISOR 
}
