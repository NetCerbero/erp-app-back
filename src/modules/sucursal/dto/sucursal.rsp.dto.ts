import { Expose, Type } from "class-transformer"
import { ESTADO } from "src/core"
import { UbicacionRspDto } from "src/modules/ubicacion/dto/ubicacion.rsp.dto"

export class SucursalRspDto {
    @Expose()
    id: number
    @Expose()
    identificador: string
    @Expose()
    direccion: string
    @Expose()
    codigo: string
    @Expose()
    contacto: string
    @Expose()
    estado: ESTADO
    // @Expose()
    // esPublico: boolean
    @Expose()
    ubicacionId: number

    @Expose()
    @Type(() => UbicacionRspDto)
    ubicacion: UbicacionRspDto
}