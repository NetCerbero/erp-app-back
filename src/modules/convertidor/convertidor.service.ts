import { ConflictException, Injectable } from '@nestjs/common';
import { UnidadMedida } from '../unidad-medida/entities/unidad-medida.entity';
import { IConvertidorUnidad } from './convertidor.interface';

@Injectable()
export class ConvertidorService {
  unidadMedida(
    cantidad: number,
    unidadOrigen: IConvertidorUnidad,
    unidadDestino: IConvertidorUnidad,
  ) {
    if (unidadOrigen.categoriaId !== unidadDestino.categoriaId) {
      throw new ConflictException(
        'No se pueden convertir unidades de diferentes categorías',
      );
    }

    const cantidadBase = cantidad * unidadOrigen.factor;

    return cantidadBase / unidadDestino.factor;
  }
}
