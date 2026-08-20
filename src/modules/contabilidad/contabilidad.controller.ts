import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContabilidadService } from './contabilidad.service';
import {
  CreateCuentaDto,
  CreatePlanCuentaMasivoDto,
} from './dto/create-contabilidad.dto';
import { UpdateCuentadDto } from './dto/update-contabilidad.dto';
import { ACCION, Actions, Auth, IAuth, JwtAuthGuard } from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';

@Controller({ version: '1', path: 'contabilidad' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class ContabilidadController {
  constructor(private readonly contabilidadService: ContabilidadService) {}

  @Post("/cuenta")
  create(@Auth() auth: IAuth, @Body() createContabilidadDto: CreateCuentaDto) {
    return this.contabilidadService.create(auth, createContabilidadDto);
  }

  @Post('plan-cuenta')
  @Actions(ACCION.CREAR_PLAN_CUENTA)
  createPlanCuenta(
    @Body() data: CreatePlanCuentaMasivoDto,
    @Auth() auth: IAuth,
  ) {
    console.log('aqui va');
    return this.contabilidadService.crearPlanCuenta(auth, data);
  }

  @Get('plan-cuenta')
  findAll(@Auth() auth: IAuth) {
    return this.contabilidadService.findAll(auth);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contabilidadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContabilidadDto: UpdateCuentadDto,
  ) {
    return this.contabilidadService.update(+id, updateContabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contabilidadService.remove(+id);
  }
}
