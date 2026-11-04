import { Type } from 'class-transformer';
import {
  arrayMinSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ESTADO, MONEDA, TIPO_PRODUCTO } from 'src/core';

export class CreateListaPrecioProducto {
   @IsOptional()
  @IsNumber()
  id?: number
  
  @IsDefined()
  @IsNumber()
  listaPrecioId: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  precio: number;

  @IsDefined()
  @IsEnum(MONEDA)
  monedaId: number;

  @IsDefined()
  @IsNumber()
  unidadId: number;
}
export class CreateProductoDto {
  @IsOptional()
  @IsNumber()
  id?: number

  @IsDefined()
  @IsString()
  @MaxLength(255)
  nombre: string;

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

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateListaPrecioProducto)
  listaPrecios: CreateListaPrecioProducto[];
}
