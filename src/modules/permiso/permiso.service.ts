import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { MODULOS } from 'src/core/permission';
import { ModuloRepository } from './repositories/modulo.repository';
import { Modulo } from './entities/modulo.entity';
import { PaginaRepository } from './repositories/pagina.repository';
import { AccionRepository } from './repositories/accion.repository';
import { PermisoRepository } from './repositories/permiso.repository';
import {
  ACCION,
  CATEGORIA,
  ESTADO,
  getMapFromArray,
  IAuth,
  MSG,
} from 'src/core';
import { In } from 'typeorm';
import { PermisoAccion } from './entities/permiso-accion.entity';
import { PermisoAccionRepository } from './repositories/permiso-accion.repository';
import { QueryPermissionList } from './dto/query-list.dto';

@Injectable()
export class PermisoService {
  constructor(
    private readonly moduloRep: ModuloRepository,
    private readonly paginaRep: PaginaRepository,
    private readonly accionRep: AccionRepository,
    private readonly permisoRep: PermisoRepository,
    private readonly permisoAccionRep: PermisoAccionRepository,
  ) {}

  async create(auth: IAuth, createPermisoDto: CreatePermisoDto) {
    await this.permisoRep.save({
      ...createPermisoDto,
      empresaId: auth?.dominio,
    });
  }

  async init() {
    const listModulos = MODULOS;
    const modulos = listModulos.map(({ paginas, ...m }) => {
      // const listPages = paginas.map(({ acciones, ...p }) => {
      //   const actions = acciones.map(a => this.accionRep.create(a))
      //   const page = this.paginaRep.create({
      //     ...p,
      //     acciones: actions
      //   })
      //   return page
      // })
      const modulo = this.moduloRep.create({
        ...m,
        paginas: paginas,
      });
      return modulo;
    });
    await this.moduloRep.truncatePg();
    return await this.moduloRep.save(modulos);
  }

  async findAll(auth: IAuth, query: QueryPermissionList) {
    const { loadActions = true } = query;
    const where = query.estado
      ? {
          estado: query.estado,
          acciones: { concepto: { enum: CATEGORIA.ACCION, activo: true } },
        }
      : {};
    const relations = loadActions
      ? { relations: ['acciones', 'acciones.concepto'] }
      : {};
    return await this.permisoRep.find({
      where: {
      empresaId: auth.dominio,
        ...where,
      },
      ...relations,
      order: { id: 'DESC' },
    });
  }

  async findOne(auth: IAuth, id: number) {
    return await this.permisoRep.findOne({
      where: {
        id,
        //,empresaId: In(auth.accesos)
      },
      relations: ['acciones'],
    });
  }

  async update(auth: IAuth, id: number, updatePermisoDto: UpdatePermisoDto) {
    if (Object.keys(updatePermisoDto).length == 0) return;
    const permisoFind = await this.findOne(auth, id);
    if (!permisoFind) throw new NotFoundException(MSG.NOT_FOUND);
    const { acciones, ...permiso } = updatePermisoDto;
    const permisoMerge = this.permisoRep.create({ ...permisoFind, ...permiso });
    if (acciones!?.length > 0) {
      const mapAction = getMapFromArray(permisoFind.acciones, ['accion']);
      permisoMerge.acciones = acciones!.map((a) => {
        const find = mapAction.get(a.accion + '');
        find && mapAction.delete(a.accion + '');
        return find
          ? find
          : this.permisoAccionRep.create({
              accion: a.accion,
              permisoId: permisoFind.id,
            });
      });
      const array = Array.from(mapAction.values());
      if (array.length > 0)
        await this.permisoAccionRep.softDelete(array.map((a) => a.id));
    }
    try {
      await permisoMerge.save();
    } catch (error) {
      console.log(error);
      throw new ConflictException(MSG.UPDATE);
    }
  }

  async remove(auth: IAuth, id: number) {
    const permisoFind = await this.findOne(auth, id);
    if (!permisoFind) throw new NotFoundException(MSG.NOT_FOUND);
    await this.permisoRep.softRemove(permisoFind);
  }

  async getMenuByActions(actions: ACCION[], loadConcept: boolean = false) {
    if (actions.length === 0) return [];
    console.log({ actions });
    return await this.moduloRep.find({
      where: {
        estado: ESTADO.ACTIVO,
        paginas: {
          estado: ESTADO.ACTIVO,
          acciones: {
            estado: ESTADO.ACTIVO,
            accion: In(actions),
            ...(loadConcept ? { concepto: { enum: CATEGORIA.ACCION } } : {}),
          },
        },
      },
      order: { orden: 'ASC', paginas: { orden: 'ASC' } },
      relations: [
        'paginas',
        'paginas.acciones',
        ...(loadConcept ? ['paginas.acciones.concepto'] : []),
      ],
    });
  }

  async getPermissionByDomain(auth: IAuth) {
    console.log({ auth });
    const permiso = await this.permisoRep.findOne({
      where: { dominios: { id: auth.dominio } },
      relations: ['acciones'],
    });
    console.log({ permiso });
    if (!permiso) return [];
    const menu = await this.getMenuByActions(
      permiso.acciones.map((a) => a.accion),
      true,
    );
    return menu;
  }
}
