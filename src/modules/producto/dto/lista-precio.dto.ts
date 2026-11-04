import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsEnum, MaxLength } from 'class-validator';
import { ESTADO, MONEDA } from 'src/core';

export class CrearListaPrecioDto {
  @IsDefined()
  @MaxLength(100)
  nombre: string;

  @IsDefined()
  @IsEnum(ESTADO)
  estado: ESTADO;

  @IsDefined()
  @IsEnum(MONEDA)
  monedaId: MONEDA;
}

export class ActuarlizarListaPrecioDto extends PartialType(
  CrearListaPrecioDto,
) {}
