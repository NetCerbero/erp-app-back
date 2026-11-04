import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { Auth, IAuth, JwtAuthGuard } from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';

@Controller({ version: '1', path: 'proveedor' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class ProveedorController {
  constructor(private readonly proveedorSrv: ProveedorService) {}

  @Get('/listar/activos')
  listarActivos(@Auth() auth: IAuth) {
    return this.proveedorSrv.listarActivos(auth);
  }
}
