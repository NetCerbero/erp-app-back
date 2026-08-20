import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { ACCION, Actions, Auth, IAuth, JwtAuthGuard } from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';

@Controller({ version: "1", path: 'usuario' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) { }

  @Post()
  @Actions(ACCION.CREAR_USUARIO)
  create(
    @Auth() auth: IAuth,
    @Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(auth, createUsuarioDto);
  }

  @Get()
  @Actions(ACCION.LISTAR_USUARIO)
  findAll(@Auth() auth: IAuth) {
    return this.usuarioService.findAll(auth);
  }

  @Get(':id')
  @Actions(ACCION.LISTAR_USUARIO)
  findOne(@Auth() auth: IAuth, @Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.findOne(auth, +id);
  }

  @Patch(':id')
  @Actions(ACCION.EDITAR_USUARIO)
  update(@Auth() auth: IAuth, @Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(auth, +id, updateUsuarioDto);
  }

  @Delete(':id')
  @Actions(ACCION.ELIMINAR_USUARIO)
  remove(@Auth() auth: IAuth, @Param('id') id: string) {
    return this.usuarioService.remove(auth, +id);
  }

}
