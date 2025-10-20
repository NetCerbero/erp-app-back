import { Expose } from "class-transformer"
import { ESTADO } from "src/core"

export class UbicacionRspDto{
    @Expose()
    id:number
    @Expose()
    nombre:string
    @Expose()
    abreviatura:string
    @Expose()
    estado:ESTADO
    @Expose()
    esPublico:boolean
}