import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { getMapFromArray, IAuth } from 'src/core';
import { InventarioDocumentoRepository } from './repositories/inventario-documento.repository';
import { InventarioRepository } from './repositories/inventario.repository';
import { IInventario } from './interfaces/inventario.interface';
import { EntityManager, In } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import Decimal from 'decimal.js';

@Injectable()
export class InventarioService {
  constructor(private readonly inventarioRep: InventarioRepository) {}

  async registrar(
    lista: IInventario[],
    afectaCosto: boolean = false,
    manager?: EntityManager,
  ) {
    const agrupado = new Map<string, IInventario>();
    for (const item of lista) {
      const key = `${item.empresaId}-${item.almacenId}-${item.productoId}`;
      const actual = agrupado.get(key);
      if (actual) {
        console.log({item,actual})
        const cantidad = new Decimal(item.cantidadUnidadBase).plus(
          actual.cantidadUnidadBase,
        );
        const costo1 = new Decimal(item.cantidadUnidadBase).mul(
          item.costoUnidadBase,
        );
        const costo2 = new Decimal(actual.cantidadUnidadBase).mul(
          actual.costoUnidadBase,
        );
        const costo = new Decimal(costo1).plus(costo2);
        const costoPromedioPonderado = +new Decimal(costo).div(cantidad);
        console.log({
          cantidad,
          costo1,
          costo2,
          costo,
          costoPromedioPonderado,
        });
        actual.cantidadUnidadBase += item.cantidadUnidadBase;
        actual.costoUnidadBase = costoPromedioPonderado;
      } else {
        agrupado.set(key, { ...item });
      }
    }
    const listaPreparada = Array.from(agrupado.values());
    Logger.debug('Registrando inventario', 'Inventario');
    //throw new ConflictException("ADAs!")
    await this.inventarioRep.insertarMasivo(
      listaPreparada,
      afectaCosto,
      manager,
    );
  }

  async listarStocks(
    almacenId: number,
    productoIds: number[],
    manager?: EntityManager,
  ): Promise<Map<string, Inventario>> {
    if (productoIds.length == 0) return new Map();

    const inventarios = await (manager ?? this.inventarioRep.manager)
      .getRepository(Inventario)
      .createQueryBuilder('i')
      .setLock('pessimistic_write')
      .where('i.almacenId = :almacenId', {
        almacenId: almacenId,
      })
      .andWhere('i.productoId IN (:...productos)', {
        productos: productoIds,
      })
      .getMany();
    const map = getMapFromArray(inventarios, ['productoId']);
    return map;
  }
}
