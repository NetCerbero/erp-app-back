import { Sucursal } from '../../sucursal/entities/sucursal.entity';
import { BaseMeta, ESTADO, ESTADO_CAJA } from '../../../core';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Almacen } from 'src/modules/sucursal/entities/almacen.entity';

export class Caja extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'smallint' })
  estado: ESTADO;

  @Column({ type: 'smallint' })
  estadoIntermedio: ESTADO_CAJA;

  //RELACION

  @Column({ name: 'sucursal_id' })
  sucursalId: number;

  @ManyToOne(() => Sucursal)
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Sucursal;

  @Column({ name: 'almacen_id' })
  almacenId: number;

  @ManyToOne(() => Almacen)
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacen;
}
