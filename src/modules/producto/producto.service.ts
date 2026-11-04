import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import {
  ACCION,
  ESTADO,
  getMapFromArray,
  IAuth,
  MSG,
  QueryListDto,
  TIPO_PRODUCTO,
} from 'src/core';
import { ProductoRepository } from './repositories/producto.repository';
import { SucursalService } from '../sucursal/sucursal.service';
import { In } from 'typeorm';
import { ProductoSucursalRepository } from './repositories/producto-sucursal.repository';
import { ProductoListaPrecioDetalleRepository } from './repositories/producto-lista-precio-detalle.repository';
import { magicSelect } from 'src/core/common';
import { ProductoListaPrecioDetalle } from './entities/producto-lista-precio-detalle.entity';
import { bulkUpdate } from 'src/core/orm/update-builk.orm';

@Injectable()
export class ProductoService {
  constructor(
    private readonly productoRep: ProductoRepository,
    private readonly productoSucRep: ProductoSucursalRepository,
    private readonly sucursalSrv: SucursalService,
    private readonly listaPrecioDetRep: ProductoListaPrecioDetalleRepository,
  ) {}

  private async availableBranches(auth: IAuth, ids: number[]) {
    const branches =
      (ids.length > 0 && (await this.sucursalSrv.findByIds(auth, ids))) || [];
    if (branches.length === 0 || branches.length !== ids.length)
      throw new ConflictException(MSG.NOT_FOUND_RELATIONSHIP);
    return branches;
  }

  // private async availableGroups(auth: IAuth, ids: number[]) {
  //   const branches =
  //     (ids.length > 0 && (await this.groupSrv.findByIds(auth, ids))) || [];
  //   if (branches.length === 0 || branches.length !== ids.length)
  //     throw new ConflictException(MSG.NOT_FOUND_RELATIONSHIP);
  //   return branches;
  // }

  async create(auth: IAuth, payload: CreateProductoDto) {
    console.log(payload);

    const { disponiblesEn, listaPrecios, ...rst } = payload;

    const detallePrecios = listaPrecios.map((lp) =>
      this.listaPrecioDetRep.create({
        listaPrecioId: lp.listaPrecioId,
        precio: lp.precio,
        unidadId: lp.unidadId,
        empresaId: auth.dominio,
        productoId: payload.id,
        id: lp.id,
      }),
    );

    const branchProducts = disponiblesEn.map((s) =>
      this.productoSucRep.create({ sucursalId: s, productoId: payload.id }),
    );

    console.log('createProductoDto', payload);

    if (!payload.id) {
      return await this.productoRep.save({
        ...rst,
        disponiblesEn: branchProducts,
        empresaId: auth.dominio,
        detallePrecios: detallePrecios,
      });
    } else {
      const producto = await this.findOne(auth, payload.id);
      if (!producto) return;

      const { disponiblesEn } = producto;

      const { listaPrecioNueva, listaPrecioActualizar } = detallePrecios.reduce(
        (prev, act) => {
          if (act.id) {
            prev.listaPrecioActualizar.push(act);
          } else {
            prev.listaPrecioNueva.push(act);
          }
          return prev;
        },
        {
          listaPrecioNueva: [] as ProductoListaPrecioDetalle[],
          listaPrecioActualizar: [] as ProductoListaPrecioDetalle[],
        },
      );

      const mapExisteSucursal = getMapFromArray(branchProducts, ['sucursalId']);

      const eliminarRegistroSuc = disponiblesEn.filter(
        (e) => !mapExisteSucursal.get(e.sucursalId + ''),
      );

      const mapExisteRel = getMapFromArray(disponiblesEn, ['sucursalId']);

      const nuevosRelacionarSuc = branchProducts.filter((e) => {
        return !mapExisteRel.get(e.sucursalId + '');
      });

      eliminarRegistroSuc.length > 0 &&
        (await this.productoSucRep.softDelete(
          eliminarRegistroSuc.map((e) => e.id),
        ));
      nuevosRelacionarSuc.length > 0 &&
        (await this.productoSucRep.save(nuevosRelacionarSuc));

      listaPrecioNueva.length > 0 &&
        (await this.listaPrecioDetRep.save(listaPrecioNueva));
      listaPrecioActualizar.length > 0 &&
        (await bulkUpdate(
          this.productoRep.manager,
          ProductoListaPrecioDetalle,
          listaPrecioActualizar,
          {
            key: 'id',
            fields: ['id', 'precio', 'listaPrecioId', 'unidadId', 'empresaId'],
          },
        ));

      await this.productoRep.update(payload.id, {
        ...rst,
      });
    }
  }

  async findAll(auth: IAuth, filtro: QueryListDto) {
    const listar = await this.productoRep.find({
      select: {
        id: true,
        nombre: true,
        identificador: true,
        estado: true,
        descripcion: true,
        createdAt: true,
        tipo: true,
        disponiblesEn: {
          id: true,
          sucursal: {
            id: true,
            identificador: true,
            ubicacion: {
              id: true,
              abreviatura: true,
            },
          },
        },
      },
      where: {
        empresaId: auth.dominio,
        ...(filtro.estado ? { estado: filtro.estado } : {}),
      },
      order: { id: 'desc' },
      relations: [
        'disponiblesEn',
        'disponiblesEn.sucursal',
        'disponiblesEn.sucursal.ubicacion',
      ],
    });
    return listar.map((item) => {
      return {
        id: item.id,
        nombre: item.nombre,
        identificador: item.identificador,
        estado: item.estado,
        descripcion: item.descripcion,
        createdAt: item.createdAt,
        tipo: item.tipo,
        disponiblesEn: item.disponiblesEn.map((dis) => {
          const suc = dis.sucursal.identificador;
          const abr = dis.sucursal.ubicacion.abreviatura;
          return {
            id: dis.id,
            sucursalId: dis.sucursal.id,
            label: `${suc} - ${abr}`,
          };
        }),
      };
    });
  }

  async findOne(auth: IAuth, id: number) {
    return await this.productoRep.findOne({
      where: { id, empresaId: auth.dominio },
      relations: ['disponiblesEn', 'detallePrecios'],
    });
  }

  async update(auth: IAuth, id: number, updateProductoDto: UpdateProductoDto) {
    if (Object.keys(updateProductoDto).length == 0) return;
    const productFind = await this.findOne(auth, id);
    if (!productFind) throw new NotFoundException(MSG.NOT_FOUND);
    const { disponiblesEn, ...rst } = updateProductoDto;
    const branches = await this.availableBranches(auth, disponiblesEn!);
    //const groups = await this.availableGroups(auth, grupos);
    const productNew = this.productoRep.create({
      ...productFind,
      ...rst,
      disponiblesEn: branches,
      //grupos: groups,
    });
    try {
      await productNew.save();
      //await this.productoRep.update(id, { ...rst, disponiblesEn: branches })
    } catch (error) {
      console.log(error);
      throw new ConflictException(MSG.UPDATE);
    }
  }

  async remove(auth: IAuth, id: number) {
    const branch = await this.findOne(auth, id);
    if (!branch) throw new NotFoundException(MSG.NOT_FOUND);
    await this.productoRep.softDelete(branch.id);
  }

  async listarProductoCompra(auth: IAuth) {
    const listarCompleto =
      auth.permisos.get(ACCION.REGISTRAR_EN_OTRA_SUCURSAL_COMPRA) || false;
    const tieneSucursal = !!auth.sucursal;
    if (!tieneSucursal) throw new ConflictException(MSG.SIN_SUCURSAL);

    console.log({ listarCompleto });

    const lista = await this.productoRep.find({
      select: {
        id: true,
        identificador: true,
        nombre: true,
        descripcion: true,
        estado: true,
        controlStock: true,
        disponiblesEn: {
          id: true,
          sucursalId: true,
          productoId: true,
        },
      },
      where: {
        estado: ESTADO.ACTIVO,
        empresaId: auth.dominio,
        tipo: TIPO_PRODUCTO.INVENTARIABLE,
        controlStock: true,
        ...(listarCompleto
          ? {}
          : {
              disponiblesEn: {
                sucursalId: auth.sucursal,
              },
            }),
      },
      relations: ['disponiblesEn'],
    });
    return lista;
  }

  async listarProductoOperacion(auth: IAuth) {
    const listarCompleto =
      auth.permisos.get(
        ACCION.REGISTRAR_OPERACION_EN_OTRO_ALMACEN_INVENTARIO,
      ) || false;
    const tieneSucursal = !!auth.sucursal;
    if (!tieneSucursal) throw new ConflictException(MSG.SIN_SUCURSAL);

    const lista = await this.productoRep.find({
      select: {
        id: true,
        identificador: true,
        nombre: true,
        descripcion: true,
        estado: true,
        controlStock: true,
        disponiblesEn: {
          id: true,
          sucursalId: true,
          productoId: true,
          sucursal: {
            id: true,
            almacenes: {
              id: true,
              nombre: true,
            },
          },
        },
        stocks: {
          id: true,
          almacenId: true,
          cantidadUnidadBase: true,
        },
      },
      where: {
        estado: ESTADO.ACTIVO,
        empresaId: auth.dominio,
        tipo: TIPO_PRODUCTO.INVENTARIABLE,
        controlStock: true,
        ...(listarCompleto
          ? {}
          : {
              disponiblesEn: {
                sucursalId: auth.sucursal,
              },
            }),
      },
      relations: [
        'stocks',
        'disponiblesEn',
        'disponiblesEn.sucursal',
        'disponiblesEn.sucursal.almacenes',
      ],
    });

    console.log({ listarCompleto, sucursal: auth.sucursal });

    const listaMap = lista.map(({ disponiblesEn, ...item }) => {
      const disponibles = disponiblesEn.map((disponible) => {
        return disponible.sucursal.almacenes.map((almacen) => {
          return {
            sucursalId: disponible.sucursalId,
            almacenId: almacen.id,
          };
        });
      });
      return {
        ...item,
        almacenes: disponibles.flat(),
      };
    });
    return listaMap;
  }

  async listarProductoPuntoVenta(
    auth: IAuth,
    sucursalId: number,
    almacenId: number,
  ) {
    const query = this.productoRep
      .createQueryBuilder('p')
      .select(
        magicSelect({
          p: [
            'id',
            'nombre',
            'tipo',
            'descripcion',
            'estado',
            'tpv',
            'controlStock',
          ],
          dp: ['id', 'listaPrecioId', 'unidadId', 'precio'],
          sp: ['id', 'cantidadUnidadBase', 'almacenId'],
        }),
      )
      .leftJoin('p.detallePrecios', 'dp')
      .leftJoin('p.stocks', 'sp', 'sp.almacenId = :almacenId', { almacenId })
      .innerJoin('p.disponiblesEn', 'dsuc', 'dsuc.sucursalId = :sucursalId', {
        sucursalId: sucursalId,
      })
      .where('p.empresaId = :empresaId', { empresaId: auth.dominio })
      .andWhere('p.estado = :estado', { estado: ESTADO.ACTIVO })
      .andWhere('p.tpv = :tpv', { tpv: true });

    return await query.getMany();
  }
}
