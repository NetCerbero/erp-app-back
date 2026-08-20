import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { TIPO_CUENTA } from 'src/core';

export class CreateCuentaDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  cuentaSuperiorId?: number;

  @IsDefined()
  @IsString()
  @MaxLength(255)
  cuenta: string;

  @IsDefined()
  @IsBoolean()
  esImputable: boolean;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(2)
  codigoAnalitico: number[];

  @IsDefined()
  @IsNumber()
  @Max(1000)
  codigo: string;

  @IsDefined()
  @IsEnum(TIPO_CUENTA)
  tipo: TIPO_CUENTA;
}

export class CreatePlanCuentaMasivoDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPlanCuentaMasivoDto)
  @ValidateNested({ each: true })
  lista: ItemPlanCuentaMasivoDto[];
}

export class ItemPlanCuentaMasivoDto {
  @IsDefined()
  @Transform(({ value }) => value?.toString())
  @Matches(/^\d+(\.\d+)*$/, {
    message: 'El formato no es válido. Solo se permiten números separados por puntos.',
  })
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
  @Transform(({ value }) => (value === '' ? null : value.toString()))
  @IsString()
  'CODIGO ANALITICO': string;

  @IsDefined()
  @IsString()
  @IsIn(['ACTIVO', 'PASIVO', 'PATRIMONIO', 'INGRESO', 'EGRESO'])
  @MaxLength(20)
  //@Transform(({ value }) => TIPO_CUENTA[value])
  TIPO: string;
}
