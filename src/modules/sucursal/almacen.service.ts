import { ESTADO, IAuth, MSG, QueryListDto } from 'src/core';
import { CreateAlmacenDto, UpdateAlmacenDto } from './dto/almacen.dto';
import { AlmacenRepository } from './repositories/almacen.repository';
import { EntityManager, In } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Almacen } from './entities/almacen.entity';

@Injectable()
export class AlmacenService {
  constructor(private readonly almacenRep: AlmacenRepository) {}

  async create(auth: IAuth, data: CreateAlmacenDto) {
    const existePrincipal = await this.almacenRep.findOne({
      where: {
        sucursalId: data.sucursalId,
        empresaId: auth.dominio,
        esPrincipal: true,
      },
    });

    if (existePrincipal) {
      throw new ConflictException(MSG.ALMACEN_PRINCIPAL_EXISTE);
    }

    return await this.almacenRep.save({
      ...data,
      empresaId: auth.dominio,
    });
  }

  async findAll(auth: IAuth, sucursalId: number, filtro: QueryListDto) {
    return await this.almacenRep.find({
      where: {
        empresaId: auth.dominio,
        sucursalId,
        ...(filtro.hasOwnProperty('estado') ? { estado: filtro.estado } : {}),
      },
      order: { id: 'DESC' },
    });
  }

  async findOne(auth: IAuth, id: number) {
    const item = await this.almacenRep.findOne({
      where: { id, empresaId: auth.dominio },
    });
    if (!item) throw new ConflictException(MSG.NOT_FOUND);
    return item;
  }

  async delete(auth: IAuth, id: number) {
    const item = await this.findOne(auth, id);
    await this.almacenRep.softDelete(item.id);
  }

  async update(auth: IAuth, id: number, data: UpdateAlmacenDto) {
    if (Object.keys(data).length == 0) return;
    const find = await this.findOne(auth, id);
    await this.almacenRep.update({ id: id, empresaId: auth.dominio }, data);
  }

  async listarAlmacen(auth: IAuth) {
    const lista = await this.almacenRep.find({
      select: {
        id: true,
        nombre: true,
        estado: true,
        esPrincipal: true,
        sucursalId: true,
        tipo: true,
        sucursal: {
          id: true,
          identificador: true,
          ubicacion: {
            id: true,
            nombre: true,
            abreviatura: true,
          },
        },
      },
      where: { empresaId: auth.dominio, estado: ESTADO.ACTIVO },
      relations: ['sucursal', 'sucursal.ubicacion'],
    });
    return lista.map(({ sucursal, ...item }) => {
      return {
        ...item,
        ubicacion: sucursal.ubicacion.nombre,
        sucursal: sucursal.identificador,
        ubicacionId: sucursal.ubicacion.id,
      };
    });
  }

  async bloquearAlmacen(
    auth: IAuth,
    almacenId: number,
    manager?: EntityManager,
  ) {
    return await (manager ?? this.almacenRep.manager)
      .createQueryBuilder(Almacen, 'a')
      .setLock('pessimistic_write')
      .where('a.id = :id', { id: almacenId })
      .andWhere('a.empresaId = :empresaId', { empresaId: auth.dominio })
      .getOne();
  }

  async bloquearAlmacenes(
    auth: IAuth,
    almacenes: number[],
    manager?: EntityManager,
  ) {
    const ids = [...new Set(almacenes)].sort((a, b) => a - b);
    const lista: Almacen[] = [];
    for (const id of ids) {
      const almacen = await this.bloquearAlmacen(auth, id, manager);
      if (!almacen) throw new NotFoundException(MSG.ALMACEN_NOT_EXISTS);
      almacen && lista.push(almacen);
    }
    return lista;
  }
}
