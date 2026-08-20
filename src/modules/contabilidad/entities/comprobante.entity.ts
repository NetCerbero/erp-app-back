import { BaseMeta, ESTADO_DOCUMENTO, TIPO_COMPROBANTE } from '../../../core';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contabilidad_comprobante')
export class Comprobante extends BaseMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'text' })
  glosa: string;

  @Column({ type: 'decimal', precision: 20, scale: 2 })
  monto: number;

  @Column({ type: 'smallint' })
  estado: ESTADO_DOCUMENTO;

  @Column({ type: 'smallint' })
  tipo: TIPO_COMPROBANTE;

  @Column({ type: 'uuid' })
  quienGeneroId: string;

  @Column({ type: 'uuid' })
  quienAproboId: string;

  @Column({ type: 'uuid' })
  quienAnuloId: string;
}
