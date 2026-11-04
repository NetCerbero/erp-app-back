import { ACCION } from "../enum";
import { PAGE } from "./page.permission";

export const VENTA_PAGES = [
    {
        nombre: "PUNTO DE VENTA",
        icono: "Mail",
        url: PAGE.SALE.CREATE,
        visibleEnMenu: true,
        acciones: [
            {
                accion: ACCION.REGISTRAR_VENTA,
            },
            {
                accion: ACCION.ANULAR_VENTA,
            },
            {
                accion: ACCION.MODIFICAR_PRECIO
            },
            {
                accion: ACCION.LISTAR_VENTA
            }
        ]
    },
    {
        nombre: "CAJA",
        url: PAGE.CAJA.LIST,
        icono: "Mail",
        visibleEnMenu: true,
        acciones: [
            {
                accion: ACCION.LISTAR_CAJA,
            },
            {
                accion: ACCION.APERTURAR_CAJA,
            }
        ]
    }
]