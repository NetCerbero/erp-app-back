import { ESTADO } from "../constant";
import { ADMINISTRACION_PAGES } from "./administracion.permission";
import { COMPRA_PAGES } from "./compra.permission";
import { ACCOUNT_PAGES } from "./contabilidad.permission";
import { INVENTARIO_PAGES } from "./inventario.permission";
import { PERMISO_PAGES } from "./permiso.permission";
import { PRODUCTO_PAGES } from "./producto.permission";
import { SUCURSAL_PAGES } from "./sucursal.permission";
import { USUARIO_PAGES } from "./usuario.permission";
import { VENTA_PAGES } from "./venta.permission";

export const MODULOS = [
    {
        nombre: "ADMINISTRACION",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: ADMINISTRACION_PAGES
    },
    // NO TOCAR 
    {
        nombre: "Usuario",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: USUARIO_PAGES
    },
    {
        nombre: "CONTABILIDAD",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: ACCOUNT_PAGES
    },
    {
        nombre: "Sucursal",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: SUCURSAL_PAGES
    },
    {
        nombre: "Permiso",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: PERMISO_PAGES
    },
    {
        nombre: "Producto",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: PRODUCTO_PAGES
    },
    {
        nombre: "Venta",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: VENTA_PAGES
    },
    {
        nombre: "Compra",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: COMPRA_PAGES
    },
    {
        nombre:"Inventario",
        orden: 1,
        estado: ESTADO.ACTIVO,
        mostrarEnMenu: true,
        icono: "Inbox",
        paginas: INVENTARIO_PAGES
    }
]

// {
//     id:2,
//     nombre:"VENTA",
//     orden:1,
//     estado:"ACTIVO",
//     mostrarMenu:false,
//     icono:"StarBorder",
//     paginas:[
//         {
//             id:10,
//             nombre:"Venta",
//             icono:"StarBorder",
//             url:"sale-list",
//             acciones:[
//                 {
//                     id:10,
//                     identificador:"crear_venta",
//                     url:"create-user",
//                     redireccion:true
//                 },
//                 {
//                     id:20,
//                     identificador:"eliminar_venta",
//                     url:null,
//                     redireccion:false
//                 }
//             ]
//         },
//         {
//             id:2,
//             nombre:"Reserva",
//             icono:"StarBorder",
//             url:"profile-list",
//             acciones:[
//                 {
//                     id:100,
//                     identificador:"crear_reserva",
//                     url:"create-profile",
//                     redireccion:true
//                 },
//                 {
//                     id:101,
//                     identificador:"eliminar_reserva",
//                     url:null,
//                     redireccion:false
//                 }
//             ]
//         }
//     ]
// },
// {
//     id:3,
//     nombre:"COMERCIAL",
//     orden:1,
//     estado:"ACTIVO",
//     mostrarMenu:true,
//     icono:"StarBorder",
//     paginas:[
//         {
//             id:1,
//             nombre:"Usuario",
//             icono:"StarBorder",
//             url:"user-list",
//             acciones:[
//                 {
//                     id:1,
//                     identificador:"crear_usuario",
//                     url:"create-user",
//                     redireccion:true
//                 },
//                 {
//                     id:1,
//                     identificador:"eliminar_usuario",
//                     url:null,
//                     redireccion:false
//                 }
//             ]
//         },
//         {
//             id:2,
//             nombre:"Perfil",
//             icono:"StarBorder",
//             url:"profile-list",
//             acciones:[
//                 {
//                     id:1,
//                     identificador:"crear_perfil",
//                     url:"create-profile",
//                     redireccion:true
//                 },
//                 {
//                     id:1,
//                     identificador:"eliminar_profile",
//                     url:null,
//                     redireccion:false
//                 }
//             ]
//         }
//     ]
// },
// {
//     id:4,
//     nombre:"REPORTES",
//     orden:1,
//     estado:"ACTIVO",
//     mostrarMenu:false,
//     icono:"AbcSharp",
//     paginas:[
//         {
//             id:10,
//             nombre:"Venta",
//             icono:"PowerOff",
//             url:"sale-list",
//             acciones:[
//                 {
//                     id:10,
//                     identificador:"crear_venta",
//                     url:"create-user",
//                     redireccion:true
//                 },
//                 {
//                     id:20,
//                     identificador:"eliminar_venta",
//                     url:null,
//                     redireccion:false
//                 }
//             ]
//         },
//         {
//             id:2,
//             nombre:"Reserva",
//             icono:"ArrowBackIosSharp",
//             url:"profile-list",
//             acciones:[
//                 {
//                     id:100,
//                     identificador:"crear_reserva",
//                     url:"create-profile",
//                     redireccion:true
//                 },
//                 {
//                     id:101,
//                     identificador:"eliminar_reserva",
//                     url:null,
//                     redireccion:false
//                 }
//             ]
//         }
//     ]
// }