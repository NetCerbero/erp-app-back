import { ACCION, CATEGORIA, PERFIL } from "src/core";
import { Concepto } from "./entities/concepto.entity";


export const LIST_CONCEPTO = () => {
    const list: Partial<Concepto>[] = [];

    Object.getOwnPropertyNames(PERFIL).filter(prop => isNaN(parseInt(prop))).forEach(key => {
        list.push({
            enum: CATEGORIA.PERFIL,
            value: PERFIL[key],
            concepto: key
        })
    });

    Object.getOwnPropertyNames(ACCION).filter(prop => isNaN(parseInt(prop))).forEach(key => {
        list.push({
            enum: CATEGORIA.ACCION,
            value: ACCION[key],
            concepto: key
        })
    });
    return list;
}