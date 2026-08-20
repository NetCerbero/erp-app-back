import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ACCION, Actions, Auth, IAuth, JwtAuthGuard } from 'src/core';
import { CompraService } from './compra.service';
import { ActionGuard } from 'src/core/guard/action.guard';
import { CrearCompraDto } from './dto/compra.dto';

@Controller({ version: '1', path: 'compra' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class CompraController {
  constructor(private readonly compra: CompraService) {}

  @Get()
  @Actions(ACCION.LISTAR_COMPRA)
  listar(@Auth() auth: IAuth) {
    return this.compra.listar(auth);
  }

  @Get('/:id')
  @Actions(ACCION.LISTAR_COMPRA)
  getById(@Auth() auth: IAuth, @Param('id', ParseIntPipe) compraId: number) {
    return this.compra.getById(auth, compraId);
  }

  // @Post()
  // @Actions()
  // confirmar() {}

  // @Post()
  // @Actions(ACCION.ANULAR_COMPRA)
  // anular() {}

  @Actions(ACCION.CREAR_COMPRA, ACCION.CONFIRMAR_COMPRA)
  @Post()
  crear(@Auth() auth: IAuth, @Body() data: CrearCompraDto) {
    return this.compra.crear(auth, data);
  }
}
