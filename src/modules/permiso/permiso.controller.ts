import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { ACCION, Actions, Auth, IAuth, JwtAuthGuard, Public } from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';
import { QueryPermissionList } from './dto/query-list.dto';

@UseGuards(JwtAuthGuard, ActionGuard)
@Controller({ version: "1", path: 'permiso' })
export class PermisoController {
  constructor(private readonly permisoService: PermisoService) { }

  @Get("/menu")
  @Public()
  createMenu(){
    return this.permisoService.init()
  }
  
  @Post()
  @Actions(ACCION.CREAR_PERMISO)
  create(
    @Auth() auth: IAuth,
    @Body() createPermisoDto: CreatePermisoDto) {
    return this.permisoService.create(auth, createPermisoDto);
  }

  @Get()
  @Actions(ACCION.LISTAR_PERMISO)
  findAll(@Auth() auth: IAuth, @Query() query:QueryPermissionList) {
    return this.permisoService.findAll(auth,query);
  }

  @Get(':id')
  @Actions(ACCION.LISTAR_PERMISO)
  findOne(@Auth() auth: IAuth, @Param('id', ParseIntPipe) id: number) {
    return this.permisoService.findOne(auth, id);
  }

  @Patch(':id')
  @Actions(ACCION.EDITAR_PERMISO)
  update(@Auth() auth: IAuth, @Param('id') id: string, @Body() updatePermisoDto: UpdatePermisoDto) {
    console.log(updatePermisoDto)
    return this.permisoService.update(auth, +id, updatePermisoDto);
  }

  @Delete(':id')
  @Actions(ACCION.ELIMINAR_PERMISO)
  remove(@Auth() auth: IAuth, @Param('id') id: string) {
    return this.permisoService.remove(auth,+id);
  }

  @Get("/dominio/acceso")
  @Actions(ACCION.CREAR_PERMISO,ACCION.EDITAR_PERMISO)
  getByDomain(
    @Auth() auth: IAuth
  ){
    return this.permisoService.getPermissionByDomain(auth)
  }
}
