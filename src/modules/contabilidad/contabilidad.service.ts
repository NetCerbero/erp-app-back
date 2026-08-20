import { ConflictException, Injectable, Logger } from '@nestjs/common';
import {
  CreateCuentaDto,
  CreatePlanCuentaMasivoDto,
} from './dto/create-contabilidad.dto';
import { UpdateCuentadDto } from './dto/update-contabilidad.dto';
import { buildContabilidadTree, toBuildContabilidadTree } from './utils';
import { CuentaRepository } from './repositories/cuenta.repository';
import { IAuth } from 'src/core';
import { Cuenta } from './entities/cuenta.entity';

@Injectable()
export class ContabilidadService {
  constructor(private readonly cuentaRep: CuentaRepository) {}

  async create(auth: IAuth, params: CreateCuentaDto) {
    let superior: Cuenta | null = null;
    if (params.cuentaSuperiorId) {
      superior = await this.cuentaRep.findOne({
        where: { empresaId: auth.dominio, id: params.cuentaSuperiorId },
      })!;
    }

    console.log(params);
    //throw new ConflictException("asdsa")
    const { codigoAnalitico, ...rst } = params;
    const codigo = superior
      ? `${superior!.codigo}.${params.codigo}`
      : params.codigo;
    try {
      await this.cuentaRep.save({
        ...rst,
        codigo,
        nivel: superior ? superior!.nivel + 1 : 1,
        empresaId: auth.dominio,
        ...(codigoAnalitico && codigoAnalitico.length > 0
          ? { analiticos: codigoAnalitico.map((c) => ({ codigoAnalitico: c })) }
          : {}),
      });
    } catch (error) {
      Logger.error(error.message, 'CREAR CUENTA');
      throw new ConflictException('No se ha podido crear la cuenta');
    }
  }

  async crearPlanCuenta(auth: IAuth, data: CreatePlanCuentaMasivoDto) {
    const items = toBuildContabilidadTree(auth, data.lista);
    //eliminar el plan de cuentas actual
    await this.cuentaRep.softDelete({ empresaId: auth.dominio });
    return await this.cuentaRep.save(items);
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
    const lista = await this.cuentaRep.find({
      where: { empresaId: auth.dominio },
    });
    console.log(lista);
    return buildContabilidadTree(lista);
  }

  findOne(id: number) {
    return `This action returns a #${id} contabilidad`;
  }

  update(id: number, updateContabilidadDto: UpdateCuentadDto) {
    return `This action updates a #${id} contabilidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} contabilidad`;
  }
}
