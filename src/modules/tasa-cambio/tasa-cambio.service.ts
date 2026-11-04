import { ConflictException, Injectable } from '@nestjs/common';
import { TasaCambioRepository } from './repositories/tasa-cambio.repository';
import { IAuth, MONEDA } from 'src/core';
import Decimal from 'decimal.js';

@Injectable()
export class TasaCambioService {
  constructor(private readonly tasaCambioRep: TasaCambioRepository) {}

  async ultimaCotizacion(auth: IAuth) {
    console.log('ultimaCotizacion', auth);
    return await this.tasaCambioRep
      .createQueryBuilder('ts')
      .select()
      .distinctOn(['ts.monedaId'])
      .where('ts.empresaId = :empresaId', { empresaId: auth.dominio })
      .andWhere('ts.monedaId = ANY(:monedas)', {
        monedas: [MONEDA.BOB, MONEDA.USD],
      })
      .orderBy('ts.monedaId')
      .addOrderBy('ts.fecha', 'DESC')
      .getMany();
  }

  convertir(
    montoOrigen: number,
    monedaOrigen: MONEDA,
    tipoCambioDestino: number,
    monedaDestino: MONEDA,
  ): { monto: number; moneda: MONEDA } {
    if (monedaOrigen == MONEDA.BOB && monedaDestino == MONEDA.USD) {
      const monto = +new Decimal(montoOrigen).div(tipoCambioDestino); //montoOrigen / tipoCambioDestino;
      return { monto, moneda: monedaDestino };
    } else if (monedaOrigen == MONEDA.USD && monedaDestino == MONEDA.BOB) {
      const monto = +new Decimal(montoOrigen).mul(tipoCambioDestino); //montoOrigen * tipoCambioDestino;
      return { monto, moneda: monedaDestino };
    }
    throw new ConflictException('Ups!, conversion de moneda no soportada');
  }
}
