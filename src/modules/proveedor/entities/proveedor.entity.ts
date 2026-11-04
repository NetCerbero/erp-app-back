import { BaseMeta, ESTADO } from 'src/core';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('proveedor')
export class Proveedor extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacion: string;

  @Column({ type: 'smallint', default: ESTADO.ACTIVO })
  estado: ESTADO;

  @Column({ name: 'empresa_id' })
  empresaId: number;
}
