import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductoListaPrecioService } from './producto-lista-precio.service';
import { ACCION, Actions, Auth, JwtAuthGuard } from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';
import {
  ActuarlizarListaPrecioDto,
  CrearListaPrecioDto,
} from './dto/lista-precio.dto';

@Controller({ version: '1', path: 'producto-lista-precio' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class ProductoListaPrecioController {
  constructor(private readonly listaPrecioSrv: ProductoListaPrecioService) {}

  @Get()
  @Actions(ACCION.LISTAR_LISTA_PRECIO)
  listar(@Auth() auth) {
    return this.listaPrecioSrv.listar(auth);
  }

  @Get('/:id')
  @Actions(ACCION.LISTAR_LISTA_PRECIO)
  obtener(@Auth() auth, @Param('id', new ParseIntPipe()) id: number) {
    return this.listaPrecioSrv.obtener(auth, id);
  }

  @Post()
  @Actions(ACCION.CREAR_LISTA_PRECIO)
  crear(@Auth() auth, @Body() payload: CrearListaPrecioDto) {
    return this.listaPrecioSrv.crear(auth, payload);
  }

  @Patch('/:id')
  @Actions(ACCION.EDITAR_LISTA_PRECIO)
  actualizar(
    @Auth() auth,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() payload: ActuarlizarListaPrecioDto,
  ) {
    return this.listaPrecioSrv.actualizar(auth, id, payload);
  }

  @Delete('/:id')
  eliminar(@Auth() auth, @Param('id', new ParseIntPipe()) id: number) {
    return this.listaPrecioSrv.eliminar(auth, id);
  }

  @Get('/item-opcion/listar-activos')
  listarActivos(@Auth() auth) {
    return this.listaPrecioSrv.listarActivos(auth);
  }
}
