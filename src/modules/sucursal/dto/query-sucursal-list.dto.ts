import { IsEnum, IsOptional } from "class-validator";
import { ESTADO } from "src/core";

export class QuerySucursalList{
    @IsOptional()
    @IsEnum(ESTADO)
    estado:ESTADO
}