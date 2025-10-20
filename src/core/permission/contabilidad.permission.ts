import { ACCION } from '../enum';
import { PAGE } from './page.permission';

export const ACCOUNT_PAGES = [
  {
    nombre: 'LISTAR CUENTA',
    icono: 'Mail',
    url: PAGE.ACCOUNT.LIST,
    visibleEnMenu: true,
    acciones: [
      {
        accion: ACCION.LISTAR_CUENTA,
      },
      {
        accion: ACCION.ELIMINAR_CUENTA,
      },
    ],
  },
  {
    nombre: 'PLAN DE CUENTA',
    icono: 'Mail',
    url: PAGE.ACCOUNT.CREATE,
    visibleEnMenu: true,
    acciones: [
      {
        accion: ACCION.CREAR_CUENTA,
      },
      { accion: ACCION.EDITAR_CUENTA },
      {
        accion: ACCION.ELIMINAR_CUENTA,
      },
    ],
  },
];
