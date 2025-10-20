import { Injectable } from '@nestjs/common';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';
import { LIST_CONCEPTO } from './seed.concepto';
import { ConceptoRepository } from './repositories/concepto.repository';
import { QueryConcepto } from './dto/query-concepto.dto';
import { In } from 'typeorm';
import { CATEGORIA, getMapFromArray, getMapGroupFromArray, IAuth, PERFIL, Public } from 'src/core';
import { Concepto } from './entities/concepto.entity';

@Injectable()
export class ConceptoService {
  constructor(private readonly conceptoRep: ConceptoRepository) { }
  async create(createConceptoDto: CreateConceptoDto) {
    return await this.createAll();
  }

  async createAll() {
    await this.conceptoRep.truncate()
    return await this.conceptoRep.save(LIST_CONCEPTO())
  }

  private filterbyProfiles(auth: IAuth, list: Concepto[]) {
    const options = list.filter(concept => {
      const isAdmin = auth.perfiles.includes(PERFIL.ADMIN)
      if (isAdmin) return concept


      const blackList = [PERFIL.ADMIN, PERFIL.AGENCIA, PERFIL.EXTERNO, PERFIL.USUARIO, PERFIL.EMPRESA]

      if (concept.enum == CATEGORIA.PERFIL) {
        return !blackList.includes(concept.value as PERFIL)
      }
      return true
    })
    return options
  }


  async findAll(auth: IAuth, filtro: QueryConcepto) {
    if (filtro.enums.length == 0) return {}
    const listConcept = await this.conceptoRep.find({ where: { enum: In(filtro.enums) } })
    const mapConcept = getMapGroupFromArray(this.filterbyProfiles(auth, listConcept), ["enum"])
    return Object.fromEntries(mapConcept)
  }

  findOne(id: number) {
    return `This action returns a #${id} concepto`;
  }

  update(id: number, updateConceptoDto: UpdateConceptoDto) {
    return `This action updates a #${id} concepto`;
  }

  remove(id: number) {
    return `This action removes a #${id} concepto`;
  }
}
