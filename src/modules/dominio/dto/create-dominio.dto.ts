import { IsBoolean, IsDefined, IsEnum, IsNumber, IsOptional, IsString, Max, MaxLength } from "class-validator"
import { ESTADO } from "src/core"

export class CreateDominioDto {
    @IsOptional()
    @MaxLength(200)
    @IsString()
    alias?: string

    @IsDefined()
    @MaxLength(20)
    @IsString()
    identificador: string

    @IsDefined()
    @MaxLength(200)
    @IsString()
    razonSocial: string

    @IsOptional()
    @IsNumber()
    codigoPais?: number

    @IsOptional()
    @IsNumber()
    celular?: number

    @IsOptional()
    @IsNumber()
    permisoId?: number

    @IsOptional()
    @IsEnum(ESTADO)
    estado?: ESTADO
    logo?: string

    @IsOptional()
    @IsBoolean()
    esPublico?: boolean
}
