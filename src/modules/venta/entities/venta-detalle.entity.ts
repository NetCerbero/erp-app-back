import { BaseMeta } from 'src/core';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('venta_recibo_detalle')
export class VentaNotaDetalle extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;
}
