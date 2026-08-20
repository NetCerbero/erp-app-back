import { Dominio } from '../../dominio/entities/dominio.entity';
import {
  BaseMeta,
  ColumnNumericTransformer,
  ESTADO_DOCUMENTO,
  TIPO_DOCUMENTO,
} from '../../../core';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompraDetalle } from './compra-detalle.entity';
import { CompraEstado } from './compra-estado.entity';
import { Sucursal } from '../../sucursal/entities/sucursal.entity';

@Entity('compra')
export class Compra extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  fecha: Date;

  @Column({ name: 'proveedor_id' })
  proveedorId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  identificador: string;

  @Column({ type: 'smallint' })
  estado: ESTADO_DOCUMENTO;

  @Column({ name: 'tipo_comprobante', type: 'smallint' })
  tipoComprobante: TIPO_DOCUMENTO;

  @Column({
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  @OneToMany(() => CompraDetalle, (cp) => cp.compra, { cascade: true })
  detalles: CompraDetalle[];

  @Column({ name: 'estado_actual_id', nullable: true })
  estadoActualId: number;

  @OneToOne(()=> CompraEstado,{createForeignKeyConstraints: false})
  @JoinColumn({name:"estado_actual_id"})
  estadoActual: CompraEstado

  @OneToMany(() => CompraEstado, (estado) => estado.compra)
  estados: CompraEstado[];

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  @Column({ name: 'sucursal_id' })
  sucursalId: number;

  @ManyToOne(() => Sucursal)
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Sucursal;
}
