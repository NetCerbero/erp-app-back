import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ESTADO } from 'src/core';

export class QueryPermissionList {
  @IsOptional() // Para que el campo sea opcional
  @IsBoolean() // Valida que el valor sea 'true' o 'false'
  @Transform(({ value }) => value === 'true') // Transforma el string 'true' o 'false' a un valor booleano
  loadActions?: boolean;

  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : value))
  @IsNumber()
  estado?: ESTADO;
}
