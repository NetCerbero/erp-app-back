import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaDto } from './create-contabilidad.dto';

export class UpdateCuentadDto extends PartialType(CreateCuentaDto) {}
