import { IsBoolean, IsDefined, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"
import { ESTADO } from "src/core"

export class CreateGrupoDto {
    @IsDefined()
    @IsString()
    @MaxLength(100)
    nombre: string

    @IsOptional()
    @IsString()
    @MaxLength(20)
    color?: string

    @IsOptional()
    @IsEnum(ESTADO)
    estado?:ESTADO

    @IsOptional()
    @IsBoolean()
    porDefecto?: boolean
}