import { Transform } from "class-transformer";
import { IsArray, IsEnum } from "class-validator";
import { CATEGORIA } from "src/core";

export class QueryConcepto {
    @IsArray()
    @IsEnum(CATEGORIA, { each: true })
    @Transform(({ value }) => {
        let transformer:Number[] = []
        if (Array.isArray(value)) {
            transformer = value.map(e => Number(e))

        } else {
            transformer = [Number(value)]
        }
        return transformer
    })
    enums: CATEGORIA[]
}