import { DOCUMENTO_ORIGEN, TIPO_MOVIMIENTO } from 'src/core';

export interface IMovimientoDetalle {
  cantidad: number;
  costoUnitario?: number;
  signo: number;
  productoId: number;
  almacenId: number;
}

export interface IMovimiento {
  tipo: TIPO_MOVIMIENTO;
  fechaDocumento: Date;
  documentoOrigen: DOCUMENTO_ORIGEN;
  documentoId: number;
  observacion: string;
  empresaId: number;
  usuarioId: number;
  detalles: IMovimientoDetalle[];
}
