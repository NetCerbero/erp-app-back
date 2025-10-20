import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { ACCION, ESTADO } from "src/core";

export class AccionDto {
    @IsDefined()
    @IsEnum(ACCION)
    accion: ACCION
}
export class CreatePermisoDto {
    @IsDefined()
    @MaxLength(255)
    @IsString()
    nombre: string;

    @IsOptional()
    @IsEnum(ESTADO)
    estado?: ESTADO

    @IsDefined()
    @Type(() => AccionDto)
    @ValidateNested({ each: true })
    @IsArray()
    @ArrayMinSize(1)
    acciones: AccionDto[]
}
