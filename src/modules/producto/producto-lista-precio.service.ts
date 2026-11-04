import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductoListaPrecioRepository } from './repositories/producto-lista-precio.repository';
import { CATEGORIA, ESTADO, IAuth, MSG } from 'src/core';
import {
  ActuarlizarListaPrecioDto,
  CrearListaPrecioDto,
} from './dto/lista-precio.dto';

@Injectable()
export class ProductoListaPrecioService {
  constructor(private readonly listaPrecioRep: ProductoListaPrecioRepository) {}

  async listar(auth: IAuth) {
    return await this.listaPrecioRep.find({
      where: {
        empresaId: auth.dominio,
        moneda: {
          enum: CATEGORIA.MONEDA,
        },
      },
      order: {
        id: 'DESC',
      },
      relations: ['moneda'],
    });
  }

  async obtener(auth: IAuth, id: number) {
    const item = await this.listaPrecioRep.findOne({
      where: { id, empresaId: auth.id },
    });
    if(!item) throw new NotFoundException(MSG.NOT_FOUND)

    return item
  }

  async crear(auth: IAuth, payload: CrearListaPrecioDto) {
    await this.listaPrecioRep.save({
      ...payload,
      empresaId: auth.dominio,
    });
  }

  async actualizar(
    auth: IAuth,
    id: number,
    payload: ActuarlizarListaPrecioDto,
  ) {
    const esVacio = Object.keys(payload).length == 0;
    if (esVacio) throw new ConflictException(MSG.ES_VACIO);

    await this.listaPrecioRep.update(
      {
        id: id,
        empresaId: auth.dominio,
      },
      {
        ...payload,
      },
    );
  }

  async eliminar(auth: IAuth, id: number) {
    //TODO: revisar si existe ya una venta con esta lista de precio, si existe no se puede anular, solo cambiar a desactivado
    await this.listaPrecioRep.softDelete({ id: id, empresaId: auth.dominio });
  }

  async listarActivos(auth: IAuth) {
    return await this.listaPrecioRep.find({
      where: {
        empresaId: auth.dominio,
        estado: ESTADO.ACTIVO,
        moneda: {
          enum: CATEGORIA.MONEDA,
        },
      },
      order: { id: 'DESC' },
      relations: ['moneda'],
    });
  }
}
