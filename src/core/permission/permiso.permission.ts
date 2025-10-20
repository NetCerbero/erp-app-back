import { ACCION } from "../enum";
import { PAGE } from "./page.permission";

export const PERMISO_PAGES=[
    {
        nombre: "LISTAR PERMISO",
        icono: "Mail",
        url: PAGE.PERMISSION.LIST,
        visibleEnMenu: true,
        acciones: [
            {
                accion: ACCION.LISTAR_PERMISO,
            },
            {
                accion: ACCION.ELIMINAR_PERMISO,
            }
        ]
    },
    {
        nombre: "CREAR PERMISO",
        url: PAGE.PERMISSION.CREATE,
        acciones: [
            {
                accion: ACCION.CREAR_PERMISO,
            }
        ]
    },
    {
        nombre: "EDITAR PERMISO",
        url: PAGE.PERMISSION.EDIT,
        acciones: [
            { accion: ACCION.EDITAR_PERMISO }
        ]
    }
]