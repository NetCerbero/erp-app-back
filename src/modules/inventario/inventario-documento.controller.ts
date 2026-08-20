import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InventarioDocumentoService } from './inventario-documento.service';
import { Auth, IAuth, JwtAuthGuard } from 'src/core';
import {
  CrearInventarioDocumentoDto,
  InventarioOperacionListDto,
} from './dto/inventario-documento.dto';
import { ActionGuard } from 'src/core/guard/action.guard';

@Controller({ version: '1', path: 'inventario-documento' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class InventarioDocumentoController {
  constructor(private readonly inventarioDoc: InventarioDocumentoService) {}

  @Post()
  listarOperacion(
    @Auth() auth: IAuth,
    @Body() params: InventarioOperacionListDto,
  ) {
    return this.inventarioDoc.listaOperacion(auth, params);
  }

  @Post('/crear')
  crear(@Auth() auth: IAuth, @Body() params: CrearInventarioDocumentoDto) {
    return this.inventarioDoc.crear(auth, params);
  }

  @Get('/:id')
  obtener(@Auth() auth: IAuth, @Param('id') id: number) {
    return this.inventarioDoc.obtener(auth, id);
  }
}
