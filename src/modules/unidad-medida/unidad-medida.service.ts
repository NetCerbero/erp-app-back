import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UnidadMedidaRepository } from './repositories/unidad-medida.repository';
import { CATEGORIA_UNIDAD_MEDIDA, ESTADO, IAuth, MSG } from 'src/core';
import {
  ActualizarUnidadMedidaDto,
  CrearUnidadMedidaDto,
} from './dtos/unidad-medida.dto';
import { In, QueryFailedError } from 'typeorm';
import { IConvertidorUnidad } from '../convertidor/convertidor.interface';
import Decimal from 'decimal.js';

@Injectable()
export class UnidadMedidaService {
  constructor(private readonly unidadMedidaRep: UnidadMedidaRepository) {}

  async crear(auth: IAuth, payload: CrearUnidadMedidaDto) {
    try {
      return await this.unidadMedidaRep.save({
        ...payload,
        empresaId: auth.dominio,
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError;

        if (driverError.code === '23505') {
          switch (driverError.constraint) {
            case 'idx_unidad_medida_base':
              throw new ConflictException(
                `Verifique que no exista el código "${payload.codigo}" o que ya tenga registrada una unidad base en esta categoria`,
              );
          }
        }
      }
      throw error;
    }
  }

  async listar(auth: IAuth) {
    return await this.unidadMedidaRep.find({
      where: { empresaId: auth.dominio },
    });
  }

  async listarActivos(auth: IAuth) {
    return await this.unidadMedidaRep.find({
      where: { empresaId: auth.dominio, estado: ESTADO.ACTIVO },
    });
  }

  async eliminar(auth: IAuth, id: number) {
    await this.existe(auth, id);
    await this.unidadMedidaRep.softDelete(id);
  }

  async existe(auth: IAuth, id: number) {
    const existe = await this.unidadMedidaRep.exists({
      where: { id, empresaId: auth.dominio },
    });

    if (!existe) throw new NotFoundException(MSG.NOT_FOUND);
    return existe;
  }

  async actualizar(
    auth: IAuth,
    id: number,
    payload: ActualizarUnidadMedidaDto,
  ) {
    await this.existe(auth, id);

    if (Object.keys(payload).length > 0) {
      await this.unidadMedidaRep.update(id, payload);
    }
  }

  async obtener(auth: IAuth, id: number) {
    return await this.unidadMedidaRep.findOne({
      where: { id, empresaId: auth.dominio },
    });
  }

  async obtenerMapConUnidadBase(auth: IAuth, unidadIds: number[]) {
    const ids = new Set<Number>(unidadIds);
    const lista = await this.unidadMedidaRep.find({
      where: {
        estado: ESTADO.ACTIVO,
        id: In(Array.from(ids)),
        empresaId: auth.dominio,
      },
    });

    const categoria = new Set<number>(lista.map((e) => e.categoriaId));
    const base = await this.unidadMedidaRep.find({
      where: {
        estado: ESTADO.ACTIVO,
        categoriaId: In(Array.from(categoria)),
        empresaId: auth.dominio,
        esBase: true,
      },
    });

    const mapa = new Map<
      number,
      {
        factor: number;
        categoria: CATEGORIA_UNIDAD_MEDIDA;
        factorBase: number;
      }
    >();

    lista.forEach((item) => {
      const itemBase = base.find((e) => e.categoriaId == item.categoriaId);
      if (!itemBase)
        throw new ConflictException(
          'Ups!, algunas unidades de medida no tienen definido la unidad base requerida para conversiones.',
        );

      mapa.set(item.id, {
        factor: item.factor,
        factorBase: itemBase.factor,
        categoria: item.categoriaId,
      });
    });

    return mapa;
  }

  convertir(
    cantidadOrigen: number,
    unidadOrigen: IConvertidorUnidad,
    unidadDestino: IConvertidorUnidad,
  ) {
    if (unidadOrigen.categoriaId !== unidadDestino.categoriaId) {
      throw new ConflictException(
        'No se pueden convertir unidades de diferentes categorías',
      );
    }

    const cantidadBase = +new Decimal(cantidadOrigen).mul(unidadOrigen.factor); // cantidadOrigen * unidadOrigen.factor;

    return +new Decimal(cantidadBase).div(unidadDestino.factor); //cantidadBase / unidadDestino.factor;
  }
}
