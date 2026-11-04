import { DOCUMENTO_ORIGEN, MONEDA, TIPO_MOVIMIENTO } from 'src/core';

export interface IMovimientoDetalle {
  cantidad: number;
  costoUnitario: number;
  costoTotal: number;
  cantidadUnidadBase: number;
  costoUnitarioMonedaBase: number;
  costoTotalMonedaBase: number;
  productoId: number;
  almacenId: number;
  empresaId: number;
}

export interface IMovimiento {
  tipo: TIPO_MOVIMIENTO;
  fechaDocumento: Date;
  documentoOrigen: DOCUMENTO_ORIGEN;
  documentoId: number;
  observacion: string;
  empresaId: number;
  usuarioId: number;
  monedaId: MONEDA;
  almacenId: number,
  detalles: IMovimientoDetalle[];
}
