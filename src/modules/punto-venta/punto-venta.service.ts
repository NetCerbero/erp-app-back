import { Injectable } from '@nestjs/common';
import { AlmacenService } from '../sucursal/almacen.service';
import { IAuth } from 'src/core';

@Injectable()
export class PuntoVentaService {
  constructor(private readonly almacenSrv: AlmacenService) {}

  listarAlmacen(auth: IAuth) {
    const puedeVenderOtroAlmacen = true;
    return this.almacenSrv.listarAlmacen(auth);
  }
}
