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
    EDIT: '/product-edit/:id',
  },
  SALE: {
    CREATE: '/point-of-sale',
  },
  CASH: {
    CREATE: '/cash-opening-create',
    LIST: '/cash-opening-list',
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
  COMPRA:{
    LIST: "/listar-compra",
    CREATE: "/crear-compra"
  },
  INVENTARIO:{
    LISTAR_OPERACION: "/listar-operacion",
    CREAR_OPERACION: "/crear-operacion"
  }
};
