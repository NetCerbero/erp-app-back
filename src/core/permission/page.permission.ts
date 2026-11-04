export const PAGE = {
  HOME: {
    WELLCOME: '/wellcome',
  },
  AUTH: {
    LOGIN: '/login',
  },

  PLAN: {
    LISTAR: '/plan',
    CREAR: '/plan/crear',
    EDITAR: '/plan/editar/:id',
  },

  // NO TOCAR
  USER: {
    LIST: '/user-list',
    CREATE: '/user-create',
    EDIT: '/user-edit/:id',
  },
  PERMISSION: {
    LIST: '/permission-list',
    CREATE: '/permission-create',
    EDIT: '/permission-edit/:id',
  },
  BRANCH: {
    LIST: '/branch-list',
    CREATE: '/branch-create',
    EDIT: '/branch-edit/:id',
  },
  PRODUCT: {
    LIST: '/product-list',
    CREATE: '/product-create',
    EDIT: '/product-edit',
  },
  SALE: {
    CREATE: '/point-of-sale',
  },
  ACCOUNT: {
    CREATE: '/account-create',
    LIST: '/account-list',
    EDIT: '/account-edit/:id',
    NOTE: '/account-note',
  },
  ALMACEN: {
    LIST: '/listar-almacen/:sucursalId',
    CREATE: '/crear-almacen',
    EDIT: '/editar-almacen/:id',
  },
  COMPRA: {
    LIST: '/listar-compra',
    CREATE: '/crear-compra',
  },
  INVENTARIO: {
    LISTAR_OPERACION: '/listar-operacion',
    CREAR_OPERACION: '/crear-operacion',
  },
  CAJA: {
    CREATE: '/cash-opening-create',
    LIST: '/cash-opening-list',
  },
  LISTA_PRECIO: {
    CREAR: '/crear-lista-precio',
    LISTAR: '/lista-precio',
    EDITAR: "/editar-lista-precio"
  },
  UNIDAD_MEDIDA:{
    CREAR: "/crear-unidad-medida",
    EDITAR: "/editar-unidad-medida",
    LISTAR: "/lista-unidad-medida"
  }
};
