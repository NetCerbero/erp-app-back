import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDominioDto } from './dto/create-dominio.dto';
import { UpdateDominioDto } from './dto/update-dominio.dto';
import { DominioRepository } from './repositories/dominio.repository';
import { DominioFilterDto } from './dto/filter-dominio.dto';
import { MSG } from 'src/core';

@Injectable()
export class DominioService {
  constructor(
    private readonly dominioRep: DominioRepository
  ) { }

  async create(createDominioDto: CreateDominioDto) {
    return await this.dominioRep.save(createDominioDto);
  }

  async findAll(filtro: DominioFilterDto) {
    return await this.dominioRep.findAllByStatusAndVisibility(filtro);
  }

  async findOne(id: number) {
    return await this.dominioRep.findOneBy({ id });
  }

  async update(id: number, updateDominioDto: UpdateDominioDto) {
    if (Object.keys(updateDominioDto).length == 0) throw new ConflictException(MSG.UPDATE)
    await this.dominioRep.update(id, updateDominioDto)
  }

  remove(id: number) {
    return `This action removes a #${id} dominio`;
  }
}
