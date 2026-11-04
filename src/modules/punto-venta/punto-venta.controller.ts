import { Controller, Get } from '@nestjs/common';
import { PuntoVentaService } from './punto-venta.service';
import { Auth, IAuth } from 'src/core';

@Controller({ version: '1', path: 'punto-venta' })
export class PuntoVentaController {
    constructor(
        private readonly puntoVentaSrv: PuntoVentaService
    ){}

    @Get()
    listarAlmacen(
        @Auth() auth:IAuth
    ){
        return this.puntoVentaSrv
    }
}
