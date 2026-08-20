import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseMeta, ESTADO } from '../../../core';
import { TIPO_ALMACEN } from '../../../core/enum/sucursal.enum';
import { Sucursal } from './sucursal.entity';

@Entity('sucursal_almacen')
export class Almacen extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'smallint' })
  tipo: TIPO_ALMACEN;

  @Column({ type: 'smallint', default: ESTADO.ACTIVO })
  estado: ESTADO;

  @Column({ type: 'bool', name: 'es_principal', default: false })
  esPrincipal: boolean;

  @Column({ type: 'bool', name: 'permite_venta', default: false })
  permiteVenta: boolean;

  @Column({ type: 'bool', name: 'premite_transferencia', default: true })
  permiteTransferencia: boolean;

  @Column({ type: 'bool', name: 'inventario_inicial', default: false })
  inventarioInicial: boolean;

  // Relacion

  @Column({ type: 'int', name: 'empresa_id' })
  empresaId: number;

  @Column({ name: 'sucursal_id' })
  sucursalId: number;

  @ManyToOne(() => Sucursal, (s) => s.almacenes)
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Sucursal;
}
