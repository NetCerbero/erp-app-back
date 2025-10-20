import { BaseMeta, ESTADO } from '../../../core';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contabilidad_plan_cuenta')
export class PlanCuenta extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  cuenta: string;

  // 1 = ACTIVO | 2 = PASIVO | 3 = PATRIMONIO | 4 = INGRESO | 5 = EGRESO
  @Column({ type:"smallint"})
  tipo:  number

  @Column({ type: 'int' })
  nivel: number;

  @Column({ type: 'bool', name: 'es_imputable', default: false })
  esImputable: boolean;

  @Column({ type: 'varchar', length: 10, default: ESTADO.ACTIVO })
  estado: string;

  @Column({ type: 'int', name: 'codigo_analitico', nullable: true })
  codigoAnalitico: number;

  @Column({ type: 'int', name: 'empresa_id', nullable: true })
  empresaId: number;

  @Column({ type: 'int', name: 'cuenta_superior_id', nullable: true })
  cuentaSuperiorId: number;

  @ManyToOne(() => PlanCuenta, (pl) => pl.listaCuenta, { nullable: true })
  @JoinColumn({ name: 'cuenta_superior_id' })
  cuentaSuperior: PlanCuenta;

  @OneToMany(() => PlanCuenta, (pl) => pl.cuentaSuperior, { cascade: true })
  listaCuenta: PlanCuenta[];
}
