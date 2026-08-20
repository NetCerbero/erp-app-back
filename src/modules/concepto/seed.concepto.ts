import {
  ACCION,
  ANALITICO_CUENTA,
  CATEGORIA,
  ESTADO_DOCUMENTO,
  PERFIL,
  TIPO_COMPROBANTE,
  TIPO_CUENTA,
} from '../../core';
import { Concepto } from './entities/concepto.entity';

export const LIST_CONCEPTO = () => {
  const list: Partial<Concepto>[] = [];

  Object.getOwnPropertyNames(ACCION)
    .filter((prop) => isNaN(parseInt(prop)))
    .forEach((key) => {
      list.push({
        enum: CATEGORIA.ACCION,
        value: ACCION[key],
        concepto: key,
      });
    });

  Object.getOwnPropertyNames(PERFIL)
    .filter((prop) => isNaN(parseInt(prop)))
    .forEach((key) => {
      list.push({
        enum: CATEGORIA.PERFIL,
        value: PERFIL[key],
        concepto: key,
      });
    });

  Object.getOwnPropertyNames(ANALITICO_CUENTA)
    .filter((prop) => isNaN(parseInt(prop)))
    .forEach((key) => {
      list.push({
        enum: CATEGORIA.ANALITICO,
        value: ANALITICO_CUENTA[key],
        concepto: key,
      });
    });

  Object.getOwnPropertyNames(TIPO_COMPROBANTE)
    .filter((prop) => isNaN(parseInt(prop)))
    .forEach((key) => {
      list.push({
        enum: CATEGORIA.COMPROBANTE,
        value: TIPO_COMPROBANTE[key],
        concepto: key,
      });
    });

  Object.getOwnPropertyNames(ESTADO_DOCUMENTO)
    .filter((prop) => isNaN(parseInt(prop)))
    .forEach((key) => {
      list.push({
        enum: CATEGORIA.ESTADO_DOCUMENTO,
        value: ESTADO_DOCUMENTO[key],
        concepto: key,
      });
    });

  Object.getOwnPropertyNames(TIPO_CUENTA)
    .filter((prop) => isNaN(parseInt(prop)))
    .forEach((key) => {
      list.push({
        enum: CATEGORIA.CUENTA,
        value: TIPO_CUENTA[key],
        concepto: key,
      });
    });
  return list;
};
