import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { SucursalRepository } from './repositories/sucursal.repository';
import { IAuth, MSG, QueryListDto } from 'src/core';
import { In } from 'typeorm';

@Injectable()
export class SucursalService {
  constructor(private readonly sucursalRep: SucursalRepository) { }

  async create(auth: IAuth, createSucursalDto: CreateSucursalDto) {
    return await this.sucursalRep.save({ ...createSucursalDto, empresaId: auth.dominio })
  }

  async findAll(auth: IAuth, filtro: QueryListDto) {
    return await this.sucursalRep.find({ where: { empresaId: In(auth.accesos), ...(filtro.estado ? { estado: filtro.estado } : {}) }, relations: ["ubicacion"], order: { id: "DESC" } })
  }

  async findOne(auth: IAuth, id: number) {
    return await this.sucursalRep.findOne({ where: { empresaId: In(auth.accesos), id }, relations: ["ubicacion"], order: { id: "DESC" } })

  }

  async update(auth: IAuth, id: number, updateSucursalDto: UpdateSucursalDto) {
    if (Object.keys(updateSucursalDto).length == 0) return
    const ubicacion = await this.findOne(auth, id)
    if (!ubicacion) throw new NotFoundException(MSG.NOT_FOUND)
    await this.sucursalRep.update(id, updateSucursalDto)
  }

  async remove(auth: IAuth, id: number) {
    const ubicacion = await this.findOne(auth, id)
    if (!ubicacion) throw new NotFoundException(MSG.NOT_FOUND)
    await this.sucursalRep.softDelete(id)
  }

  async findByIds(auth: IAuth, ids: number[], where:any={}, relations: string[]=[]) {
    return await this.sucursalRep.find({ where: { empresaId: In(auth.accesos), id: In(ids),...where } ,relations})
  }
}
