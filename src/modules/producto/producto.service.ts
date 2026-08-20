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
  IAuth,
  MSG,
  QueryListDto,
  TIPO_PRODUCTO,
} from 'src/core';
import { ProductoRepository } from './repositories/producto.repository';
import { SucursalService } from '../sucursal/sucursal.service';
import { In } from 'typeorm';
import { ProductoSucursalRepository } from './repositories/producto-sucursal.repository';

@Injectable()
export class ProductoService {
  constructor(
    private readonly productoRep: ProductoRepository,
    private readonly productoSucRep: ProductoSucursalRepository,
    private readonly sucursalSrv: SucursalService,
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

  async create(auth: IAuth, createProductoDto: CreateProductoDto) {
    const { disponiblesEn, ...rst } = createProductoDto;
    const branchProducts = disponiblesEn.map((s) =>
      this.productoSucRep.create({ sucursalId: s }),
    );
    return await this.productoRep.save({
      ...rst,
      disponiblesEn: branchProducts,
      empresaId: auth.dominio,
    });
  }

  async findAll(auth: IAuth, filtro: QueryListDto) {
    return await this.productoRep.find({
      order: { id: 'desc' },
      where: {
        empresaId: auth.dominio,
        ...(filtro.estado ? { estado: filtro.estado } : {}),
      },
      relations: [
        'disponiblesEn',
        'disponiblesEn.sucursal',
        'disponiblesEn.sucursal.ubicacion',
        //'grupos',
      ],
    });
  }

  async findAllToPos(auth: IAuth) {
    const [sucursales, productos] = await Promise.all([
      this.sucursalSrv.findByIds(
        auth,
        auth.sucursales,
        { estado: ESTADO.ACTIVO },
        ['ubicacion'],
      ),
      this.productoRep.find({
        order: { id: 'desc' },
        where: {
          empresaId: auth.dominio,
          estado: ESTADO.ACTIVO,
          disponiblesEn: {
            sucursal: { estado: ESTADO.ACTIVO, id: In(auth.sucursales) },
          },
          //grupos: { id: In(auth.grupos) },
        },
        relations: [
          'disponiblesEn',
          //'grupos',
          'listaProducto',
          'listaProducto.producto',
        ],
      }),
    ]);

    return { sucursales, productos };
  }

  async findOne(auth: IAuth, id: number) {
    return await this.productoRep.findOne({
      where: { id, empresaId: auth.dominio },
      relations: ['disponiblesEn'],
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
    const listarCompleto = auth.permisos.get(
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
          cantidad: true,
          cantidadMinima: true,
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
}
