import { IsEnum, IsOptional } from "class-validator";
import { ESTADO } from "../constant";

export class QueryListDto{
    @IsOptional()
    @IsEnum(ESTADO)
    estado?:ESTADO
}