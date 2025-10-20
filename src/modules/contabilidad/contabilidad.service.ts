import { ConflictException, Injectable } from '@nestjs/common';
import { CreateContabilidadDto } from './dto/create-contabilidad.dto';
import { UpdateContabilidadDto } from './dto/update-contabilidad.dto';
import { buildContabilidadTree, toBuildContabilidadTree } from './utils';
import { PlanCuentaRepository } from './repositories/plancuenta.repository';
import { IAuth } from 'src/core';

@Injectable()
export class ContabilidadService {
  constructor(private readonly planCuentaRep: PlanCuentaRepository) {}

  create(createContabilidadDto: CreateContabilidadDto) {
    return 'creado';
  }

  async crearPlanCuenta(auth: IAuth, data: CreateContabilidadDto) {
    const items = toBuildContabilidadTree(auth, data.lista);
    //eliminar el plan de cuentas actual
    await this.planCuentaRep.softDelete({empresaId: auth.dominio})
    return await this.planCuentaRep.save(items);
  }

  fakeServerRequest<T>(data: T, delay = 1500): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% éxito
        if (success) {
          resolve(data);
        } else {
          reject(new ConflictException('❌ Error simulado del servidor'));
        }
      }, delay);
    });
  }

  async findAll(auth: IAuth) {
    const lista = await this.planCuentaRep.find({where:{empresaId: auth.dominio}})
    console.log(lista)
    return buildContabilidadTree(lista)
  }

  findOne(id: number) {
    return `This action returns a #${id} contabilidad`;
  }

  update(id: number, updateContabilidadDto: UpdateContabilidadDto) {
    return `This action updates a #${id} contabilidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} contabilidad`;
  }
}
