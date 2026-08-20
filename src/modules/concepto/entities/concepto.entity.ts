import { CATEGORIA} from '../../../core';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('concepto')
@Unique('concept_pk', ['enum', 'value'])
export class Concepto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  enum: CATEGORIA;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'varchar', length: 150 })
  concepto: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
