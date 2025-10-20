import { ESTRATEGIA_SESION } from "../constant";
import { ACCION, PERFIL } from "../enum";

export interface IAuthTokenJwt {
    id: string;
    usuario: string;
    estrategia: ESTRATEGIA_SESION;
    dominio: number;
    sesion: string;
    nombreCompleto: string
}

export interface IRefreshTokenJwt {
    usuario: string;
    estrategia: ESTRATEGIA_SESION;
}

export interface IAuth extends IAuthTokenJwt {
    sucursal:number,
    sucursales:number[],
    perfiles: PERFIL[]
    permisos: ACCION[]
    accesos: number[]
    //grupos: number[]
}