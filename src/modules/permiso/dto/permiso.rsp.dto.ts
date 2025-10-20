import { Expose, Type } from "class-transformer";
import { ACCION, ESTADO } from "src/core";

export class PermisoAccionRspDto {
    @Expose()
    id: number;
    @Expose()
    accion: ACCION
}

export class PermisoRspDto {
    @Expose()
    id: number;
    @Expose()
    nombre: string;
    @Expose()
    estado: ESTADO
}

export class AccionRspDto {
    @Expose()
    id: number
    @Expose()
    accion: number
    @Expose()
    estado: ESTADO
}

export class PaginaRspDto {
    @Expose()
    id: number
    @Expose()
    nombre: string
    @Expose()
    icono?: string
    @Expose()
    url: string
    @Expose()
    orden: number
    @Expose()
    estado: ESTADO
    @Expose()
    visibleEnMenu: boolean
    @Expose()
    @Type(() => AccionRspDto)
    acciones: AccionRspDto[]
}

export class MenuRspDto {
    @Expose()
    id: number
    @Expose()
    nombre: string
    @Expose()
    orden: number
    @Expose()
    estado: ESTADO
    @Expose()
    mostrarEnMenu: boolean
    @Expose()
    icono: string
    @Expose()
    @Type(() => PaginaRspDto)
    paginas: PaginaRspDto[]
}


