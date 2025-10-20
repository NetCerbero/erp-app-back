import { ACCION } from '../enum';
import { PAGE } from './page.permission';

export const ADMINISTRACION_PAGES = [
  {
    nombre: 'LISTAR PLAN',
    icono: 'Mail',
    url: PAGE.PLAN.LISTAR,
    visibleEnMenu: true,
    acciones: [
      {
        accion: ACCION.LISTAR_PLAN_CUENTA,
      },
      {
        accion: ACCION.ELIMINAR_PLAN_CUENTA,
      },
    ],
  },
  {
    nombre: 'CREAR PLAN',
    url: PAGE.PLAN.CREAR,
    acciones: [
      {
        accion: ACCION.CREAR_PLAN_CUENTA,
      },
    ],
  },
  {
    nombre: 'EDITAR PLAN',
    url: PAGE.PLAN.EDITAR,
    acciones: [
      {
        accion: ACCION.EDITAR_PLAN_CUENTA,
      },
    ],
  },
];
