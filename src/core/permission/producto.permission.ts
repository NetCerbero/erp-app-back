import { ACCION } from "../enum";
import { PAGE } from "./page.permission";

export const PRODUCTO_PAGES=[
    {
        nombre: "LISTAR PRODUCTO",
        icono: "Mail",
        url: PAGE.PRODUCT.LIST,
        visibleEnMenu: true,
        acciones: [
            {
                accion: ACCION.LISTAR_PRODUCTO,
            },
            {
                accion: ACCION.ELIMINAR_PRODUCTO,
            }
        ]
    },
    {
        nombre: "CREAR PRODUCTO",
        url: PAGE.PRODUCT.CREATE,
        acciones: [
            {
                accion: ACCION.CREAR_PRODUCTO,
            }
        ]
    },
    {
        nombre: "EDITAR PRODUCTO",
        url: PAGE.PRODUCT.EDIT,
        acciones: [
            { accion: ACCION.EDITAR_PRODUCTO }
        ]
    }
]