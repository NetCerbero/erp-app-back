import { IsBoolean, IsDefined, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"
import { ESTADO } from "src/core"

export class CreateSucursalDto {
    @IsDefined()
    @IsString()
    @MaxLength(255)
    identificador: string

    @IsOptional()
    @IsString()
    @MaxLength(255)
    direccion: string

    @IsOptional()
    @IsString()
    @MaxLength(50)
    contacto: string

    @IsOptional()
    @IsString()
    @MaxLength(10)
    codigo: string

    @IsOptional()
    @IsEnum(ESTADO)
    estado: ESTADO

    // @IsOptional()
    // @IsBoolean()
    // esPublico: boolean

    @IsDefined()
    @IsNumber()
    ubicacionId: number
}
