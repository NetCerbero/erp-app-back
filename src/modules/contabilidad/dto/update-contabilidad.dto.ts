import { PartialType } from '@nestjs/mapped-types';
import { CreateContabilidadDto } from './create-contabilidad.dto';

export class UpdateContabilidadDto extends PartialType(CreateContabilidadDto) {}
