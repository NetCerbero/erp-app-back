import { ConflictException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { genSalt, hash } from 'bcryptjs';
import { CreateUsuarioDto, CredencialDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { PersonaRepository } from '../repositories/persona.repository';
import { ESTADO, ESTRATEGIA_SESION, IAuth, MSG } from 'src/core';
import { UsuarioRspDto } from '../dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { In } from 'typeorm';


@Injectable()
export class UsuarioService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    private readonly personRep: PersonaRepository
  ) { }

  async encryptTxt(data: string) {
    const salt = await genSalt(10);
    return await hash(data.trim(), salt);
  }

  async prepareAuth(data: CredencialDto) {
    const usuario = await this.authService.searchLight({ usuario: data.usuario, estrategia: ESTRATEGIA_SESION.NORMAL });
    if (usuario) throw new ConflictException(MSG.USER_EXIST)
    data.password = await this.encryptTxt(data.password);
    return data;
  }

  async create(
    auth: IAuth,
    createUsuarioDto: CreateUsuarioDto
  ) {
    let {credencial, ...rstPersona} = createUsuarioDto;
    let credencialRst = {}
    if(credencial){
      const {permisoId, ...rst} = await this.prepareAuth(credencial)
      credencialRst = {
        ...rst,
        dominios: [
          {
            permisoId: permisoId,
            empresaId: auth.dominio,
            seleccionado: true,
            esPrincipal: true,
          }
        ]
       }
    }

    try {
      await this.personRep.save({ ...rstPersona, empresaId: auth.dominio, ...( credencial ? {credencial: credencialRst}:{}) });
    } catch (error) {
      Logger.error(error.message, "CREAR USUARIO")
      throw new ConflictException(MSG.SAVE)
    }
  }

  async findAll(auth: IAuth) {
    const lista = await this.personRep.listAllRel([auth.dominio])
    return plainToInstance(UsuarioRspDto, lista, { strategy: "excludeAll" })
  }

  async findOne(auth: IAuth, id: number) {
    return await this.personRep.findOne({
      where: { id, empresaId: In(auth.accesos), credencial: { dominios: { empresa: { estado: ESTADO.ACTIVO } } } },
      relations: [
        "empresa", "credencial", "sucursal", "sucursal.ubicacion",
        "credencial.dominios", "credencial.dominios.empresa"]
    })
  }

  update(auth: IAuth, id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  async remove(auth: IAuth, id: number) {
    await this.personRep.softDelete({id,empresaId:auth.dominio})
  }

  async searchDetailById(id: number) {
    return await this.personRep.findOne({
      where: { id: id },
      relations: ["empresa", "sucursal", "sucursal.ubicacion"]
    })
  }

  async getAllRelById(id: number) {
    return await this.personRep.getAllRelById(id)
  }
}
