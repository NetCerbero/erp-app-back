import { Controller, UseGuards } from '@nestjs/common';
import { VentaService } from './venta.service';
import { ActionGuard } from 'src/core/guard/action.guard';
import { JwtAuthGuard } from 'src/core';

@Controller({ version: '1', path: 'venta' })
@UseGuards(JwtAuthGuard,ActionGuard)
export class VentaController {
  constructor(private readonly ventaSrv: VentaService) {}
}
