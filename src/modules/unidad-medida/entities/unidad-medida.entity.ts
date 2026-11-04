import { BaseMeta, ColumnNumericTransformer, ESTADO } from '../../../core';
import { CATEGORIA_UNIDAD_MEDIDA } from '../../../core/enum/unidad-medida.enum';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('unidad_medida')
@Index('idx_unidad_medida_base', ['categoriaId', 'codigo', 'empresaId'], {
  where: 'deleted_at is null and es_base = true',
  unique: true,
})
export class UnidadMedida extends BaseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'smallint', name:"categoria_id" })
  categoriaId: CATEGORIA_UNIDAD_MEDIDA;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 20 })
  codigo: string;

  @Column({
    type: 'numeric',
    precision: 20,
    scale: 10,
    default: 1,
    transformer: new ColumnNumericTransformer(),
  })
  factor: number;

  @Column({ type: 'bool', name:"es_base" , default: false })
  esBase: boolean;

  @Column({ type: 'smallint', default: ESTADO.ACTIVO })
  estado: ESTADO;

  @Column({ name: 'empresa_id' })
  empresaId: number;
}
