import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cuenta } from './cuenta.entity';
import { ANALITICO_CUENTA, BaseMeta } from '../../../core';

@Entity('contabilidad_cuenta_analitico')
export class CuentaAnalitico extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint', name: 'codigo_analitico' })
  codigoAnalitico: ANALITICO_CUENTA;

  @Column({ name: 'cuenta_id' })
  cuentaId: number;

  @ManyToOne(() => Cuenta, c => c.analiticos)
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: Cuenta;

  @Column({ type: 'int', name: 'empresa_id', nullable: true })
  empresaId: number;
}
