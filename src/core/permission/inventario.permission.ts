import { ACCION } from '../enum';
import { PAGE } from './page.permission';

export const INVENTARIO_PAGES = [
  {
    nombre: 'Operaciones',
    icono: 'Mail',
    url: PAGE.INVENTARIO.LISTAR_OPERACION,
    visibleEnMenu: true,
    acciones: [
      {
        accion: ACCION.LISTAR_OPERACION_INVENTARIO,
      },
      {
        accion: ACCION.ANULAR_OPERACION_INVENTARIO,
      },
    ],
  },
  {
    nombre: 'Crear operación',
    url: PAGE.INVENTARIO.CREAR_OPERACION,
    acciones: [
      {
        accion: ACCION.CREAR_OPERACION_INVENTARIO,
      },
      {
        accion: ACCION.CONFIRMAR_OPERACION_INVENTARIO,
      },
    ],
  },
];
