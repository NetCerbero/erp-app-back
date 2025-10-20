import { Transform } from "class-transformer"
import { IsBoolean, IsEnum, IsOptional } from "class-validator"
import { ESTADO } from "src/core"

export class QueryGroupList{
    // @IsOptional() // Para que el campo sea opcional
    // @IsBoolean() // Valida que el valor sea 'true' o 'false'
    // @Transform(({ value }) => value === 'true') // Transforma 
    // porDefecto?:boolean
    
    @IsOptional()
    @IsEnum(ESTADO)
    estado?:ESTADO
}