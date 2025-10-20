import { IsBoolean, IsDefined, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"
import { ESTADO } from "src/core"

export class CreateUbicacionDto {
    @IsDefined()
    @MaxLength(255)
    @IsString()
    nombre: string

    @IsDefined()
    @MaxLength(20)
    @IsString()
    abreviatura: string

    @IsOptional()
    @IsBoolean()
    esPublico: boolean

    @IsOptional()
    @IsEnum(ESTADO)
    estado: ESTADO

    @IsOptional()
    @IsNumber()
    padreId: number

}
