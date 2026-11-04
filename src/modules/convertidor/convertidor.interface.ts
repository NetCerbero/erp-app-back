import { CATEGORIA_UNIDAD_MEDIDA } from "src/core/enum/unidad-medida.enum";

export interface IConvertidorUnidad{
    categoriaId: CATEGORIA_UNIDAD_MEDIDA,
    factor: number
}