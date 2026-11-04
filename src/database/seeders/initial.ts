import { DataSource, IsNull } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { Concepto } from '../../modules/concepto/entities/concepto.entity';
import { LIST_CONCEPTO } from '../../modules/concepto/seed.concepto';
import { Dominio } from '../../modules/dominio/entities/dominio.entity';
import { Permiso } from '../../modules/permiso/entities/permiso.entity';
import { PermisoAccion } from '../../modules/permiso/entities/permiso-accion.entity';
import { CATEGORIA, ESTRATEGIA_SESION } from '../../core';
import { Persona } from '../../modules/usuario/entities/persona.entity';
import { Credencial } from '../../modules/usuario/entities/credencial.entity';
import { Ubicacion } from '../../modules/ubicacion/entities/ubicacion.entity';
import { Sucursal } from '../../modules/sucursal/entities/sucursal.entity';
import { Modulo } from '../../modules/permiso/entities/modulo.entity';
import { MODULOS } from '../../core/permission';

export const createInitialData = async (dataSource: DataSource) => {
  const ENV = process.env.ENV
  console.log('INGRESANDO A EJECUTAR EL SEEDERS!!...');
  // CREANDO TODO LOS CONCEPTOS
  const conceptoRepo = dataSource.getRepository(Concepto);
  const listaConcepto = LIST_CONCEPTO();
  const metaConcepto = dataSource.getMetadata(Concepto);
  await conceptoRepo.manager.query(
    `truncate ${metaConcepto.schema}.${metaConcepto.tableName} restart identity`,
  );
  const listaConceptoSave = await conceptoRepo.save(listaConcepto);

  // CREANDO MENU / MODULO
  const moduloRepo = dataSource.getRepository(Modulo);
  const listaModulo = MODULOS;
  const metaModulo = dataSource.getMetadata(Modulo);
  await moduloRepo.manager.query(
    `truncate ${metaModulo.schema}.${metaModulo.tableName} restart identity cascade`,
  );
  await moduloRepo.save(listaModulo);

  // REGISTRAR PERMISO
  const permisoRepo = dataSource.getRepository(Permiso);
  const permisoAccionRepo = dataSource.getRepository(PermisoAccion);

  const permiso = permisoRepo.create({
    nombre: 'EMPRESA',
    //acciones: permisoAccion,
  });

  let existePermiso = await permisoRepo.findOne({
    where: { nombre: permiso.nombre, empresaId: IsNull() },
    relations: ['acciones'],
  });

  const permisoAccion = listaConcepto
    .filter((item) => item.enum == CATEGORIA.ACCION)
    .map((e) =>
      permisoAccionRepo.create({
        accion: e.value,
        permisoId: existePermiso?.id,
      }),
    );

  if (!existePermiso) {
    permiso.acciones = permisoAccion;
    existePermiso = await permiso.save();
  } else {
    await permisoAccionRepo.remove(existePermiso?.acciones);
    const acciones = await permisoAccionRepo.save(
      permisoAccion.map((e) => ({ ...e, permisoId: existePermiso?.id })),
    );
  }

  // REGISTRAR EMPRESA
  const dominioRepo = dataSource.getRepository(Dominio);
  const empresa = dominioRepo.create({
    alias: 'EMPRESA DEV',
    razonSocial: 'BLACKSTONE',
    identificador: '8865788',
  });

  let existeEmpresa = await dominioRepo.findOne({
    where: { razonSocial: empresa.razonSocial },
  });
  if (!existeEmpresa) {
    empresa.permisoId = existePermiso.id;
    existeEmpresa = await dominioRepo.save(empresa);
  }

  const ubicacionRepo = dataSource.getRepository(Ubicacion);
  let existeUbicacion = await ubicacionRepo.findOneBy({ nombre: 'SANTA CRUZ' });
  if (!existeUbicacion) {
    existeUbicacion = await ubicacionRepo.save({
      nombre: 'SANTA CRUZ',
      abreviatura: 'SCZ',
      esPublico: true,
    });
  }

  const sucursalRepo = dataSource.getRepository(Sucursal);
  let existeSucursal = await sucursalRepo.findOneBy({
    identificador: 'SUCURSAL 1 SCZ',
    empresaId: existeEmpresa.id,
  });
  if (!existeSucursal) {
    existeSucursal = await sucursalRepo.save({
      identificador: 'SUCURSAL 1 SCZ',
      direccion: 'N/A',
      empresaId: existeEmpresa.id,
      ubicacionId: existeUbicacion.id,
    });
  }

  // REGISTRAR PERSONA Y CREDENCIAL
  const personaRepo = dataSource.getRepository(Persona);
  const credendialRepo = dataSource.getRepository(Credencial);
  const passwordText = process.env.CRE_PASSWORD_ADM!;
  const salt = await genSalt(10);
  const passwordHash = await hash(passwordText?.toString()?.trim(), salt);

  const usuernameText = process.env.CRE_USERNAME_ADM!;
  const credencial = await credendialRepo.create({
    usuario: usuernameText,
    password: passwordHash,
    estrategia: ESTRATEGIA_SESION.NORMAL,
  });

  const existeCredencial = await credendialRepo.findOneBy({
    usuario: credencial.usuario,
    estrategia: ESTRATEGIA_SESION.NORMAL,
  });
  if (!existeCredencial) {
    const persona = await personaRepo.save({
      nombreCompleto: 'Lui',
      alias: 'BLACK',
      empresaId: existeEmpresa.id,
    });
    credencial.personaId = persona.id;
    const credencialCreado = await credendialRepo.save({
      ...credencial,
      dominios: [
        {
          empresaId: existeEmpresa.id,
          esPrincipal: true,
          permisoId: existePermiso.id,
          seleccionado: true,
        },
      ],
    });

    console.log(credencialCreado, persona, empresa, permiso);
  } else {
    console.log('USUARIO YA EXISTE');
  }

  console.log('🌱 Datos iniciales insertados correctamente');
};
