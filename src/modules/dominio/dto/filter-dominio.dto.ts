import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { ESTADO, ORDEN } from "src/core";

export class DominioFilterDto {
    @IsOptional()
    @IsEnum(ESTADO)
    estado?: ESTADO

    @IsOptional()
    @IsBoolean()
    esPublico?: boolean;

    @IsOptional()
    @IsEnum(ORDEN)
    orden?:ORDEN
}