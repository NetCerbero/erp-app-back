import { ACCION } from '../enum';
import { PAGE } from './page.permission';

export const COMPRA_PAGES = [
  {
    nombre: 'LISTA DE COMPRA',
    icono: 'Mail',
    url: PAGE.COMPRA.LIST,
    visibleEnMenu: true,
    acciones: [
      {
        accion: ACCION.LISTAR_COMPRA,
      },
      {
        accion: ACCION.ANULAR_COMPRA,
      },
    ],
  },
  {
    nombre: 'CREAR COMPRA',
    url: PAGE.COMPRA.CREATE,
    acciones: [
      {
        accion: ACCION.CREAR_COMPRA,
      },
      {
        accion: ACCION.CONFIRMAR_COMPRA,
      },
    ],
  },
];
