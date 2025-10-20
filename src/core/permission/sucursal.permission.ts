import { ACCION } from "../enum";
import { PAGE } from "./page.permission";

export const SUCURSAL_PAGES=[
    {
        nombre: "LISTAR SUCURSAL",
        icono: "Mail",
        url: PAGE.BRANCH.LIST,
        visibleEnMenu: true,
        acciones: [
            {
                accion: ACCION.LISTAR_SUCURSAL,
            },
            {
                accion: ACCION.ELIMINAR_SUCURSAL,
            }
        ]
    },
    {
        nombre: "CREAR SUCURSAL",
        url: PAGE.BRANCH.CREATE,
        acciones: [
            {
                accion: ACCION.CREAR_SUCURSAL,
            }
        ]
    },
    {
        nombre: "EDITAR SUCURSAL",
        url: PAGE.BRANCH.EDIT,
        acciones: [
            { accion: ACCION.EDITAR_SUCURSAL }
        ]
    }
]