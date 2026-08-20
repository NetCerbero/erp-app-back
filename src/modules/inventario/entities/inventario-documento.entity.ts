import { BaseMeta, DOCUMENTO_ORIGEN, ESTADO_DOCUMENTO } from '../../../core';
import { Dominio } from '../../dominio/entities/dominio.entity';
import { Almacen } from '../../sucursal/entities/almacen.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,

} from 'typeorm';
import { InventarioDocumentoDetalle } from './inventario-documento-detalle.entity';
import { Credencial } from '../../usuario/entities/credencial.entity';

@Entity('inventario_documento')
@Index(
  'idx_inventario_documento_inicial',
  ['empresaId', 'almacenOrigenId', 'tipo', 'estado'],
  {
    where: `deleted_at IS NULL and tipo = ${DOCUMENTO_ORIGEN.INICIAL} and estado = ${ESTADO_DOCUMENTO.CONFIRMADO}`,
    unique: true
  },

)
export class InventarioDocumento extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 40 })
  codigo: string;

  @Column({ type: 'smallint' })
  tipo: DOCUMENTO_ORIGEN;

  @Column({ name: 'fecha_documento', type: 'timestamp' })
  fechaDocumento: Date;

  @Column({ type: 'smallint' })
  estado: ESTADO_DOCUMENTO;

  @Column({ type: 'text', nullable: true })
  observacion: string;

  // Relacion

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @ManyToOne(() => Dominio, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Dominio;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(() => Credencial)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Credencial;

  @Column({ name: 'almacen_origen_id' })
  almacenOrigenId: number;

  @ManyToOne(() => Almacen)
  @JoinColumn({ name: 'almacen_origen_id' })
  almacenOrigen: Almacen;

  @Column({ name: 'almacen_destino_id', nullable: true })
  almacenDestinoId: number;

  @ManyToOne(() => Almacen, { nullable: true })
  @JoinColumn({ name: 'almacen_destino_id' })
  almacenDestino: Almacen;

  @OneToMany(() => InventarioDocumentoDetalle, (idd) => idd.documento, {
    cascade: true,
  })
  detalles: InventarioDocumentoDetalle[];
}
