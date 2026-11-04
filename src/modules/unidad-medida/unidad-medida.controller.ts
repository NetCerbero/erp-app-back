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
import { UnidadMedidaService } from './unidad-medida.service';
import {
  ActualizarUnidadMedidaDto,
  CrearUnidadMedidaDto,
} from './dtos/unidad-medida.dto';
import { ACCION, Actions, Auth, IAuth, JwtAuthGuard } from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';

@Controller({ version: '1', path: 'unidad-medida' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class UnidadMedidaController {
  constructor(private readonly unidadMedidaSrv: UnidadMedidaService) {}

  @Post()
  @Actions(ACCION.CREAR_UNIDAD_MEDIDA)
  crear(@Auth() auth: IAuth, @Body() payload: CrearUnidadMedidaDto) {
    return this.unidadMedidaSrv.crear(auth, payload);
  }

  @Get()
  @Actions(ACCION.LISTAR_UNIDAD_MEDIDA)
  listar(@Auth() auth: IAuth) {
    return this.unidadMedidaSrv.listar(auth);
  }

  @Get('/:id')
  @Actions(ACCION.LISTAR_UNIDAD_MEDIDA)
  obtener(@Auth() auth: IAuth, @Param('id', new ParseIntPipe()) id: number) {
    return this.unidadMedidaSrv.obtener(auth, id);
  }

  @Get('/options/listar-activos')
  @Actions(ACCION.LISTAR_UNIDAD_MEDIDA)
  listarActivos(@Auth() auth: IAuth) {
    return this.unidadMedidaSrv.listarActivos(auth);
  }

  @Patch('/:id')
  @Actions(ACCION.EDITAR_UNIDAD_MEDIDA)
  actualizar(
    @Auth() auth: IAuth,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() payload: ActualizarUnidadMedidaDto,
  ) {
    return this.unidadMedidaSrv.actualizar(auth, id, payload);
  }

  @Delete('/:id')
  @Actions(ACCION.ELIMINAR_UNIDAD_MEDIDA)
  eliminar(@Auth() auth: IAuth, @Param('id', new ParseIntPipe()) id: number) {
    return this.unidadMedidaSrv.eliminar(auth, id);
  }
}
