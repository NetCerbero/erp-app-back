import { BaseMeta, ESTADO, TIPO_CUENTA } from '../../../core';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CuentaAnalitico } from './cuenta-analitico.entity';

@Entity('contabilidad_cuenta')
@Index('UQ_cuenta_codigo_not_deleted', ['codigo','empresaId'], {
  unique: true,
  where: '"deleted_at" IS NULL', // 👈 Índice parcial
})
export class Cuenta extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  cuenta: string;

  // 1 = ACTIVO | 2 = PASIVO | 3 = PATRIMONIO | 4 = INGRESO | 5 = EGRESO
  @Column({ type: 'smallint' })
  tipo: TIPO_CUENTA;

  @Column({ type: 'int' })
  nivel: number;

  @Column({ type: 'bool', name: 'es_imputable', default: false })
  esImputable: boolean;

  @Column({ type: 'smallint', default: ESTADO.ACTIVO })
  estado: number;

  @Column({ type: 'int', name: 'empresa_id', nullable: true })
  empresaId: number;

  @Column({ type: 'int', name: 'cuenta_superior_id', nullable: true })
  cuentaSuperiorId: number;

  @ManyToOne(() => Cuenta, (pl) => pl.listaCuenta, { nullable: true })
  @JoinColumn({ name: 'cuenta_superior_id' })
  cuentaSuperior: Cuenta;

  @OneToMany(() => Cuenta, (pl) => pl.cuentaSuperior, { cascade: true })
  listaCuenta: Cuenta[];

  @OneToMany(() => CuentaAnalitico, (ca) => ca.cuenta, { cascade: true })
  analiticos: CuentaAnalitico[];
}
