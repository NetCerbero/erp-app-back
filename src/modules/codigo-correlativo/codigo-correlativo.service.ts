import { Injectable } from '@nestjs/common';
import { IGenerarCodigo } from './interfaces/codigo-correlativo.interface';
import { EntityManager } from 'typeorm';
import { CodigoCorrelativo } from './entities/codigo-correlativo.entity';
import { DOCUMENTO_ORIGEN } from '../../core';

@Injectable()
export class CodigoCorrelativoService {
  async generarCodigo(manager: EntityManager, params: IGenerarCodigo) {
    const anio = this.getYear();

    const query = manager
      .getRepository(CodigoCorrelativo)
      .createQueryBuilder('c')
      .setLock('pessimistic_write')
      .where('c.tipo = :tipo', { tipo: params.tipo })
      .andWhere('c.empresaId = :empresaId', { empresaId: params.empresaId })
      .andWhere('c.anio = :anio', { anio });

    if (params.sucursalId) {
      query.andWhere('c.sucursalId = :sucursalId', {
        sucursalId: params.sucursalId,
      });
    }
    let codigo = await query.getOne();
    if (!codigo) {
      codigo = await manager.save(CodigoCorrelativo, {
        tipo: params.tipo,
        anio: anio,
        empresaId: params.empresaId,
        sucursalId: params.sucursalId,
        ultimo: 1,
        prefijo: this.prefijoPorDefecto(params.tipo),
      });
      return this.getCorrelativo(codigo);
    }
    codigo!.ultimo++;
    codigo &&
      (await manager.update(CodigoCorrelativo, codigo.id, {
        ultimo: codigo.ultimo,
      }));
    return this.getCorrelativo(codigo);
  }

  getYear() {
    const anio = Number(
      new Intl.DateTimeFormat('en', {
        timeZone: 'America/La_Paz',
        year: 'numeric',
      }).format(new Date()),
    );
    return anio;
  }

  prefijoPorDefecto(tipo: DOCUMENTO_ORIGEN) {
    switch (tipo) {
      case DOCUMENTO_ORIGEN.AJUSTE:
        return 'AJU';
      case DOCUMENTO_ORIGEN.INICIAL:
        return 'INI';
      case DOCUMENTO_ORIGEN.TRASPASO:
        return 'TRA';
      case DOCUMENTO_ORIGEN.VENTA:
        return 'VEN';
      case DOCUMENTO_ORIGEN.COMPRA:
        return 'COM';
      default:
        return 'OTR';
    }
  }

  getCorrelativo(codigo: CodigoCorrelativo) {
    const txtAnio = codigo.anio.toString().slice(2);
    return `${codigo.prefijo}${txtAnio}-${codigo.ultimo}`;
  }
}
