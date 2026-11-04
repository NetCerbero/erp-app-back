import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { ACCION, Actions, Auth, IAuth, JwtAuthGuard } from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';
import { QueryListDto } from 'src/core/dto/query-list.dto';
import { AlmacenService } from './almacen.service';
import { CreateAlmacenDto, UpdateAlmacenDto } from './dto/almacen.dto';

@Controller({ version: '1', path: 'sucursal' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class SucursalController {
  constructor(
    private readonly sucursalService: SucursalService,
    private readonly almacenService: AlmacenService,
  ) {}

  @Post()
  @Actions(ACCION.CREAR_SUCURSAL)
  create(@Auth() auth: IAuth, @Body() createSucursalDto: CreateSucursalDto) {
    return this.sucursalService.create(auth, createSucursalDto);
  }

  @Get()
  @Actions(ACCION.LISTAR_SUCURSAL)
  findAll(@Auth() auth: IAuth, @Query() filtro: QueryListDto) {
    return this.sucursalService.findAll(auth, filtro);
  }

  @Get("/listar-activos")
  @Actions(ACCION.LISTAR_SUCURSAL, ACCION.LISTAR_ALMACEN, ACCION.CREAR_COMPRA)
  listarSucursalAlmacenActivos(
    @Auth() auth: IAuth,
  ) {
    return this.sucursalService.listarConAlmacenActivos(auth);
  }

  @Get(':id')
  @Actions(ACCION.LISTAR_SUCURSAL)
  findOne(@Auth() auth: IAuth, @Param('id', ParseIntPipe) id: number) {
    return this.sucursalService.findOne(auth, id);
  }

  @Patch(':id')
  @Actions(ACCION.EDITAR_SUCURSAL)
  update(
    @Auth() auth: IAuth,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSucursalDto: UpdateSucursalDto,
  ) {
    return this.sucursalService.update(auth, id, updateSucursalDto);
  }

  @Delete(':id')
  @Actions(ACCION.ELIMINAR_SUCURSAL)
  remove(@Auth() auth: IAuth, @Param('id', ParseIntPipe) id: number) {
    return this.sucursalService.remove(auth, id);
  }

  // ALMACEN
  @Post('/almacen')
  @Actions(ACCION.CREAR_ALMACEN)
  createAlmacen(@Auth() auth: IAuth, @Body() data: CreateAlmacenDto) {
    return this.almacenService.create(auth, data);
  }

  @Patch('/almacen/:id')
  @Actions(ACCION.EDITAR_ALMACEN)
  updateAlmacen(
    @Auth() auth: IAuth,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAlmacenDto,
  ) {
    return this.almacenService.update(auth, id, data);
  }

  @Get('/almacen/:id')
  @Actions(ACCION.LISTAR_ALMACEN)
  getAlcamen(@Auth() auth: IAuth, @Param('id', ParseIntPipe) id: number) {
    return this.almacenService.findOne(auth, id);
  }

  @Get('/:sucursalId/almacen')
  @Actions(ACCION.LISTAR_ALMACEN)
  findAllAlmacen(
    @Auth() auth: IAuth,
    @Param('sucursalId', ParseIntPipe) sucursalId: number,
    @Query() filtro: QueryListDto,
  ) {
    console.log('findAllAlmacen', filtro, auth);
    return this.almacenService.findAll(auth, sucursalId, filtro);
  }

  @Delete('/almacen/:id')
  @Actions(ACCION.ELIMINAR_ALMACEN)
  deleteAlmacen(@Auth() auth: IAuth, @Param('id', ParseIntPipe) id: number) {
    return this.almacenService.delete(auth, id);
  }

  @Get('/almacen/listar/items')
  listarAlmacen(@Auth() auth: IAuth) {
    return this.almacenService.listarAlmacen(auth);
  }
}
