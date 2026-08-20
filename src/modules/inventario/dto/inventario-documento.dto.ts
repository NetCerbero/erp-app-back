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
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { DOCUMENTO_ORIGEN, ESTADO_DOCUMENTO } from 'src/core';

export class InventarioOperacionListDto {
  @IsDefined()
  @IsISO8601()
  inicio: Date;

  @IsDefined()
  @IsISO8601()
  fin: Date;
}

export class CrearInventarioDocumentoDetalleDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  cantidad: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacion: string;

  @IsDefined()
  @IsNumber()
  productoId: number;
}

export class CrearInventarioDocumentoDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsDefined()
  @IsNumber()
  tipo: DOCUMENTO_ORIGEN;

  @IsDefined()
  @IsISO8601()
  fechaDocumento: string;

  @IsDefined()
  estado: ESTADO_DOCUMENTO;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacion: string;

  @IsDefined()
  @IsNumber()
  almacenOrigenId: number;

  @IsOptional()
  @IsNumber()
  almacenDestinoId?: number;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CrearInventarioDocumentoDetalleDto)
  detalles: CrearInventarioDocumentoDetalleDto[];
}
