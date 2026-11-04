import { ESTRATEGIA_SESION } from '../constant';
import { ACCION, MONEDA, PERFIL } from '../enum';

export interface IAuthTokenJwt {
  id: number;
  usuario: string;
  estrategia: ESTRATEGIA_SESION;
  dominio: number;
  sesion: number;
  nombreCompleto: string;
}

export interface IRefreshTokenJwt {
  usuario: string;
  estrategia: ESTRATEGIA_SESION;
}

export interface IAuth extends IAuthTokenJwt {
  sucursal: number;
  sucursales: number[];
  perfiles: PERFIL[];
  permisos: Map<ACCION, boolean>;
  accesos: number[];
  monedaBase: MONEDA;
  //grupos: number[]
}
