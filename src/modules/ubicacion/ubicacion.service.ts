import { Injectable } from '@nestjs/common';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import { UbicacionRepository } from './repositories/ubicacion.repository';
import { ESTADO } from 'src/core';

@Injectable()
export class UbicacionService {
  constructor(private readonly ubicacionRep: UbicacionRepository) {}

  async create(createUbicacionDto: CreateUbicacionDto) {
    await this.ubicacionRep.save(createUbicacionDto);
  }

  async findAll() {
    return await this.ubicacionRep.find({
      where: { estado: ESTADO.ACTIVO },
      order: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.ubicacionRep.findOne({ where: { id } });
  }

  async update(id: number, updateUbicacionDto: UpdateUbicacionDto) {
    if (Object.keys(updateUbicacionDto).length == 0) return;
    await this.ubicacionRep.update(id, updateUbicacionDto);
  }

  async remove(id: number) {
    await this.ubicacionRep.softDelete(id);
  }
}
