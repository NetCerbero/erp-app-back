import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InventarioDocumentoService } from './inventario-documento.service';
import { ACCION, Actions, Auth, IAuth, JwtAuthGuard } from 'src/core';
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
  @Actions(ACCION.LISTAR_OPERACION_INVENTARIO)
  listarOperacion(
    @Auth() auth: IAuth,
    @Body() params: InventarioOperacionListDto,
  ) {
    return this.inventarioDoc.listaOperacion(auth, params);
  }

  @Post('/crear')
  @Actions(ACCION.CREAR_OPERACION_INVENTARIO)
  crear(@Auth() auth: IAuth, @Body() params: CrearInventarioDocumentoDto) {
    return this.inventarioDoc.crear(auth, params);
  }

  @Get('/:id')
  @Actions(ACCION.CREAR_OPERACION_INVENTARIO)
  obtener(@Auth() auth: IAuth, @Param('id') id: number) {
    return this.inventarioDoc.obtener(auth, id);
  }

  @Get('/detalle/:id')
  @Actions(ACCION.LISTAR_OPERACION_INVENTARIO)
  obtenerDetalle(@Auth() auth: IAuth, @Param('id') id: number) {
    return this.inventarioDoc.obtenerDetalle(auth, id);
  }

  @Post('/confirmar/:id')
  @Actions(ACCION.CONFIRMAR_OPERACION_INVENTARIO)
  confirmar(@Auth() auth: IAuth, @Param('id') id: number) {
    return this.inventarioDoc.confirmar(auth, id);
  }

  @Delete('/:id')
  @Actions(ACCION.ANULAR_OPERACION_INVENTARIO)
  anular(@Auth() auth: IAuth, @Param('id') id: number) {
    return this.inventarioDoc.anular(auth, id);
  }
}
