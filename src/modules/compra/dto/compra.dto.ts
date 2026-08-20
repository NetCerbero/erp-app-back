import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ESTADO_DOCUMENTO, TIPO_DOCUMENTO } from 'src/core';

export class CrearDetalleCompraDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  @Min(1)
  cantidad: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  costoUnitario: number;

  @IsDefined()
  @IsNumber()
  almacenId: number;

  @IsDefined()
  @IsNumber()
  productoId: number;
}

export class CrearCompraDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsISO8601()
  fecha: Date;

  @IsDefined()
  @IsString()
  @MaxLength(50)
  identificador: string;

  @IsDefined()
  @IsNumber()
  proveedorId: number;

  @IsDefined()
  @IsNumber()
  sucursalId: number;

  @IsDefined()
  @IsNumber()
  estado: ESTADO_DOCUMENTO;

  @IsDefined()
  tipoComprobante: TIPO_DOCUMENTO;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CrearDetalleCompraDto)
  @ValidateNested({each:true})
  detalles: CrearDetalleCompraDto[];
}
