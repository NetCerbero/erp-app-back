export const TODO_MODULO = [{
    id: 1,
    nombre: "USUARIO",
    orden: 1,
    estado: "ACTIVO",
    mostrarMenu: true,
    icono: "Inbox",
    paginas: [
        {
            id: 1,
            nombre: "Usuario",
            icono: "Mail",
            url: "user-list",
            acciones: [
                {
                    id: 1,
                    identificador: "crear_usuario",
                    url: "create-user",
                    redireccion: true
                },
                {
                    id: 1,
                    identificador: "eliminar_usuario",
                    url: null,
                    redireccion: false
                }
            ]
        },
        {
            id: 2,
            nombre: "Perfil",
            icono: "StarBorder",
            url: "profile-list",
            acciones: [
                {
                    id: 1,
                    identificador: "crear_perfil",
                    url: "create-profile",
                    redireccion: true
                },
                {
                    id: 1,
                    identificador: "eliminar_profile",
                    url: null,
                    redireccion: false
                }
            ]
        }
    ]
},
{
    id: 2,
    nombre: "VENTA",
    orden: 1,
    estado: "ACTIVO",
    mostrarMenu: false,
    icono: "StarBorder",
    paginas: [
        {
            id: 10,
            nombre: "Venta",
            icono: "StarBorder",
            url: "sale-list",
            acciones: [
                {
                    id: 10,
                    identificador: "crear_venta",
                    url: "create-user",
                    redireccion: true
                },
                {
                    id: 20,
                    identificador: "eliminar_venta",
                    url: null,
                    redireccion: false
                }
            ]
        },
        {
            id: 2,
            nombre: "Reserva",
            icono: "StarBorder",
            url: "profile-list",
            acciones: [
                {
                    id: 100,
                    identificador: "crear_reserva",
                    url: "create-profile",
                    redireccion: true
                },
                {
                    id: 101,
                    identificador: "eliminar_reserva",
                    url: null,
                    redireccion: false
                }
            ]
        }
    ]
},
{
    id: 3,
    nombre: "COMERCIAL",
    orden: 1,
    estado: "ACTIVO",
    mostrarMenu: true,
    icono: "StarBorder",
    paginas: [
        {
            id: 1,
            nombre: "Usuario",
            icono: "StarBorder",
            url: "user-list",
            acciones: [
                {
                    id: 1,
                    identificador: "crear_usuario",
                    url: "create-user",
                    redireccion: true
                },
                {
                    id: 1,
                    identificador: "eliminar_usuario",
                    url: null,
                    redireccion: false
                }
            ]
        },
        {
            id: 2,
            nombre: "Perfil",
            icono: "StarBorder",
            url: "profile-list",
            acciones: [
                {
                    id: 1,
                    identificador: "crear_perfil",
                    url: "create-profile",
                    redireccion: true
                },
                {
                    id: 1,
                    identificador: "eliminar_profile",
                    url: null,
                    redireccion: false
                }
            ]
        }
    ]
},
{
    id: 4,
    nombre: "REPORTES",
    orden: 1,
    estado: "ACTIVO",
    mostrarMenu: false,
    icono: "AbcSharp",
    paginas: [
        {
            id: 10,
            nombre: "Venta",
            icono: "PowerOff",
            url: "sale-list",
            acciones: [
                {
                    id: 10,
                    identificador: "crear_venta",
                    url: "create-user",
                    redireccion: true
                },
                {
                    id: 20,
                    identificador: "eliminar_venta",
                    url: null,
                    redireccion: false
                }
            ]
        },
        {
            id: 2,
            nombre: "Reserva",
            icono: "ArrowBackIosSharp",
            url: "profile-list",
            acciones: [
                {
                    id: 100,
                    identificador: "crear_reserva",
                    url: "create-profile",
                    redireccion: true
                },
                {
                    id: 101,
                    identificador: "eliminar_reserva",
                    url: null,
                    redireccion: false
                }
            ]
        }
    ]
}]