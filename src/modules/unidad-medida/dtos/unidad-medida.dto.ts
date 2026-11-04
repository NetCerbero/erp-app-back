import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ESTADO } from 'src/core';
import { CATEGORIA_UNIDAD_MEDIDA } from 'src/core/enum/unidad-medida.enum';

export class CrearUnidadMedidaDto {
  @IsDefined()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsDefined()
  @IsString()
  @MaxLength(20)
  codigo: string;

  @IsDefined()
  @IsBoolean()
  esBase: boolean;

  @IsDefined()
  @IsEnum(ESTADO)
  estado: ESTADO;

  @IsDefined()
  @IsEnum(CATEGORIA_UNIDAD_MEDIDA)
  categoriaId: CATEGORIA_UNIDAD_MEDIDA;

  @IsDefined()
  @IsNumber()
  factor: number;
}

export class ActualizarUnidadMedidaDto extends PartialType(
  CrearUnidadMedidaDto,
) {}
