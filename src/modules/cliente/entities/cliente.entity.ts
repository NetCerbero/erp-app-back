import { BaseMeta, ESTADO } from 'src/core';
import { Ubicacion } from 'src/modules/ubicacion/entities/ubicacion.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('venta_cliente')
export class Cliente extends BaseMeta {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 50, nullable: true })
  codigo: string;

  @Column({ type: 'smallint' })
  estado: ESTADO;

  @Column({ length: 255, name: 'nombre_completo' })
  nombreCompleto: string;

  @Column({ length: 255 })
  apellidos: string;

  @Column({ type: 'smallint', nullable: true })
  genero: number;

  @Column({ length: 10, name: 'codigo_pais', nullable: true })
  codigoPais: string;

  @Column({ length: 20, nullable: true })
  celular: string;

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @Column({ name: 'ubicacion_id', nullable: true })
  ubicacionId: number;

  @ManyToOne(() => Ubicacion, { nullable: true })
  @JoinColumn({ name: 'ubicacion_id' })
  ubicacion: Ubicacion;
}
