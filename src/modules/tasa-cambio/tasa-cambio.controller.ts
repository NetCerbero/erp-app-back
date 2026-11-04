import { Controller, Get, UseGuards } from '@nestjs/common';
import { TasaCambioService } from './tasa-cambio.service';
import { ActionGuard } from 'src/core/guard/action.guard';
import { Auth, IAuth, JwtAuthGuard } from 'src/core';

@Controller({ version: '1', path: 'tasa-cambio' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class TasaCambioController {
  constructor(private readonly tasaCambioSrv: TasaCambioService) {}

  @Get('/ultima-cotizacion')
  ultimaCotizacion(@Auth() auth: IAuth) {
    return this.tasaCambioSrv.ultimaCotizacion(auth);
  }
}
