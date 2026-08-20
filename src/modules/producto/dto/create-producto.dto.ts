import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ESTADO, TIPO_PRODUCTO } from 'src/core';

export class CreateProductoDto {
  @IsDefined()
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsOptional()
  @IsNumber()
  costo: number;

  @IsDefined()
  @IsNumber()
  precioBase: number;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsEnum(TIPO_PRODUCTO)
  tipo: TIPO_PRODUCTO;

  @IsOptional()
  @IsEnum(ESTADO)
  estado: ESTADO;

  @IsOptional()
  @IsBoolean()
  tpv: boolean;

  @IsOptional()
  @IsBoolean()
  controlStock: boolean;

  @IsDefined()
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  disponiblesEn: number[];

  // @IsDefined()
  // @IsArray()
  // @IsNumber({}, { each: true })
  // @ArrayMinSize(1)
  // grupos: number[]
}
