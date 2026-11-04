import { Dominio } from '../../dominio/entities/dominio.entity';
import {
  BaseMeta,
  ColumnNumericTransformer,
  ESTADO,
  ESTADO_DOCUMENTO,
  ESTADO_OPERACION,
  MONEDA,
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
import { Concepto } from 'src/modules/concepto/entities/concepto.entity';
import { Proveedor } from '../../proveedor/entities/proveedor.entity';
import { Almacen } from 'src/modules/sucursal/entities/almacen.entity';

@Entity('compra')
export class Compra extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  fecha: Date;

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

  @Column({
    name: 'total_moneda_base',
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
  })
  totalMonedaBase: number;

  @Column({
    name: 'tipo_cambio',
    type: 'numeric',
    scale: 2,
    precision: 15,
    transformer: new ColumnNumericTransformer(),
  })
  tipoCambio: number;

  // relacion
  @Column({ name: 'moneda_id' })
  monedaId: MONEDA;

  @ManyToOne(() => Concepto, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'moneda_id', referencedColumnName: 'value' })
  moneda: Concepto;

  @OneToMany(() => CompraDetalle, (cp) => cp.compra, { cascade: true })
  detalles: CompraDetalle[];

  @Column({ name: 'estado_actual_id', nullable: true })
  estadoActualId: number;

  @OneToOne(() => CompraEstado, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'estado_actual_id' })
  estadoActual: CompraEstado;

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

  @Column({ name: 'almacen_id' })
  almacenId: number;

  @ManyToOne(() => Almacen)
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacen;

  @Column({ name: 'proveedor_id' })
  proveedorId: number;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'proveedor_id' })
  proveedor: Proveedor;
}
