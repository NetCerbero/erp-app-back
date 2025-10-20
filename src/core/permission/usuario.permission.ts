import { ACCION } from "../enum";
import { PAGE } from "./page.permission";

export const USUARIO_PAGES = [
    {
        nombre: "LISTAR USUARIO",
        icono: "Mail",
        url: PAGE.USER.LIST,
        visibleEnMenu: true,
        acciones: [
            {
                accion: ACCION.LISTAR_USUARIO,
            },
            {
                accion: ACCION.ELIMINAR_USUARIO,
            }
        ]
    },
    {
        nombre: "CREAR USUARIO",
        url: PAGE.USER.CREATE,
        acciones: [
            {
                accion: ACCION.CREAR_USUARIO,
            }
        ]
    },
    {
        nombre: "EDITAR USUARIO",
        url: PAGE.USER.EDIT,
        acciones: [
            { accion: ACCION.EDITAR_USUARIO }
        ]
    }
]