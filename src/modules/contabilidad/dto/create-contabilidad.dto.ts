import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { TIPO_CUENTA } from 'src/core';

export class CreateContabilidadDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPlanCuentaMasivoDto)
  @ValidateNested({ each: true })
  lista: ItemPlanCuentaMasivoDto[];
}

export class ItemPlanCuentaMasivoDto {
  @IsDefined()
  @IsString()
  @Transform(({ value }) => value?.toString())
  @MaxLength(50)
  CODIGO: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  CUENTA: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value === 'SI' ? 'SI' : 'NO'))
  @MaxLength(2)
  IMPUTABLE: 'SI' | 'NO';

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsNumber()
  'CODIGO ANALITICO': number;

  @IsDefined()
  @IsString()
  @IsIn(['ACTIVO', 'PASIVO', 'PATRIMONIO', 'INGRESO', 'EGRESO'])
  @MaxLength(20)
  //@Transform(({ value }) => TIPO_CUENTA[value])
  TIPO: string;
}
