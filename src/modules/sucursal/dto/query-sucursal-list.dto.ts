import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ESTADO } from 'src/core';

export class QuerySucursalList {
  @IsOptional()
  //@Transform(({value}) => ESTADO[value])
  //@IsEnum(ESTADO)
  @IsNumber()
  estado: ESTADO;
}
