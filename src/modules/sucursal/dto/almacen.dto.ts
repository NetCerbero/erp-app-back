import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDefined, IsNumber, IsString, MaxLength } from 'class-validator';
import { ESTADO } from 'src/core';
import { TIPO_ALMACEN } from 'src/core/enum/sucursal.enum';

export class CreateAlmacenDto {
  @IsDefined()
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsDefined()
  @IsNumber()
  tipo: TIPO_ALMACEN;

  @IsDefined()
  @IsNumber()
  estado: ESTADO;

  @IsDefined()
  @IsBoolean()
  esPrincipal: boolean;

  @IsDefined()
  @IsBoolean()
  permiteVenta: boolean;

  @IsDefined()
  @IsBoolean()
  permiteTransferencia: boolean;

  @IsDefined()
  @IsNumber()
  sucursalId: number;
}

export class UpdateAlmacenDto extends PartialType(CreateAlmacenDto){}
