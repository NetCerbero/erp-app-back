import { IsNumber, IsOptional } from 'class-validator';
import { ESTADO } from '../constant';
import { Transform } from 'class-transformer';

export class QueryListDto {
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : value))
  @IsNumber()
  estado?: ESTADO;
}
