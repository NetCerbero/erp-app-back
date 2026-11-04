import { ACCION } from '../enum';
import { PAGE } from './page.permission';

export const PRODUCTO_PAGES = [
  {
    nombre: 'LISTAR PRODUCTO',
    icono: 'Mail',
    url: PAGE.PRODUCT.LIST,
    visibleEnMenu: true,
    acciones: [
      {
        accion: ACCION.LISTAR_PRODUCTO,
      },
      {
        accion: ACCION.ELIMINAR_PRODUCTO,
      },
    ],
  },
  {
    nombre: 'CREAR PRODUCTO',
    url: PAGE.PRODUCT.CREATE,
    acciones: [
      {
        accion: ACCION.CREAR_PRODUCTO,
      },
    ],
  },
  {
    nombre: 'EDITAR PRODUCTO',
    url: PAGE.PRODUCT.EDIT,
    acciones: [{ accion: ACCION.EDITAR_PRODUCTO }],
  },
  // LISTA PRECIO
  {
    nombre: 'LISTA DE PRECIOS',
    icono: 'Mail',
    url: PAGE.LISTA_PRECIO.LISTAR,
    visibleEnMenu: true,
    acciones: [
      {
        accion: ACCION.LISTAR_LISTA_PRECIO,
      },
      {
        accion: ACCION.ELIMINAR_LISTA_PRECIO,
      },
    ],
  },
  {
    nombre: 'CREAR LISTA PRECIO',
    url: PAGE.LISTA_PRECIO.CREAR,
    acciones: [
      {
        accion: ACCION.CREAR_LISTA_PRECIO,
      },
    ],
  },
  {
    nombre: 'EDITAR LISTA PRECIO',
    url: PAGE.LISTA_PRECIO.EDITAR,
    acciones: [{ accion: ACCION.EDITAR_LISTA_PRECIO }],
  },

  // UNIDAD MEDIDA
  {
    nombre: 'LISTA UNIDAD MEDIDA',
    icono: 'Mail',
    url: PAGE.UNIDAD_MEDIDA.LISTAR,
    visibleEnMenu: true,
    acciones: [
      {
        accion: ACCION.LISTAR_UNIDAD_MEDIDA,
      },
      {
        accion: ACCION.ELIMINAR_UNIDAD_MEDIDA,
      },
    ],
  },
  {
    nombre: 'CREAR UNIDAD MEDIDA',
    url: PAGE.UNIDAD_MEDIDA.CREAR,
    acciones: [{ accion: ACCION.CREAR_UNIDAD_MEDIDA }],
  },
  {
    nombre: 'EDITAR UNIDAD MEDIDA',
    url: PAGE.UNIDAD_MEDIDA.EDITAR,
    acciones: [{ accion: ACCION.EDITAR_UNIDAD_MEDIDA }],
  },
];
