import {
  Column,
  Entity,
  Index,
  IsNull,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseMeta, DOCUMENTO_ORIGEN, TIPO_MOVIMIENTO } from '../../../core';
import { Dominio } from '../../dominio/entities/dominio.entity';
import { Inventario } from './inventario.entity';
import { InventarioMovimientoDetalle } from './inventario-movimiento-detalle.entity';

@Index('idx_movimiento_referencia', ['documentoOrigen', 'documentoId'], {
  where: '"deleted_at" IS NULL',
})
// //TODO: no olvidar poner desc en la migracion
// @Index('idx_kardex', ['productoId', 'almacenId', 'fecha'], {
//   where: '"deleted_at" IS NULL',
// })
// @Index('idx_producto_almacen', ['productoId', 'almacenId'], {
//   where: '"deleted_at" IS NULL',
// })
@Index('idx_empresa', ['empresaId'], { where: '"deleted_at" IS NULL' })
@Entity('inventario_movimiento')
export class InventarioMovimiento extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'smallint' })
  tipo: TIPO_MOVIMIENTO;

  @Column({ name: 'fecha_documento', type: 'timestamp' })
  fechaDocumento: Date;

  @Column({ name: 'documento_origen', type: 'smallint' })
  documentoOrigen: DOCUMENTO_ORIGEN;

  @Column({ name: 'documento_id', type: 'bigint' })
  documentoId: number;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  // RELACION
  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  // usuario
  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @OneToMany(() => InventarioMovimientoDetalle, (im) => im.movimiento, {
    cascade: true,
  })
  detalles: InventarioMovimientoDetalle[];
}
