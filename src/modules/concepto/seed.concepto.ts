import {
  ACCION,
  ANALITICO_CUENTA,
  CATEGORIA,
  CATEGORIA_UNIDAD_MEDIDA,
  ESTADO_DOCUMENTO,
  MONEDA,
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
  
  Object.getOwnPropertyNames(CATEGORIA_UNIDAD_MEDIDA)
    .filter((prop) => isNaN(parseInt(prop)))
    .forEach((key) => {
      list.push({
        enum: CATEGORIA.UNIDAD_MEDIDA,
        value: CATEGORIA_UNIDAD_MEDIDA[key],
        concepto: key,
      });
    });
  
  Object.getOwnPropertyNames(MONEDA)
    .filter((prop) => isNaN(parseInt(prop)))
    .forEach((key) => {
      list.push({
        enum: CATEGORIA.MONEDA,
        value: MONEDA[key],
        concepto: key,
      });
    });
    
  return list;
};
