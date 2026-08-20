import { IAuth, TIPO_CUENTA } from 'src/core';
import { ItemPlanCuentaMasivoDto } from './dto/create-contabilidad.dto';
import { Cuenta } from './entities/cuenta.entity';
import { CuentaAnalitico } from './entities/cuenta-analitico.entity';

type PlanCuentaPartial = Partial<Omit<Cuenta, 'listaCuenta' | 'analiticos'>> & {
  listaCuenta?: PlanCuentaPartial[];
  analiticos?: Partial<CuentaAnalitico>[];
};

export function toBuildContabilidadTree(
  auth: IAuth,
  data: ItemPlanCuentaMasivoDto[],
): any[] {
  // Ordenamos los códigos para asegurar que los padres van antes que los hijos
  const sorted = [...data].sort((a, b) =>
    a.CODIGO.localeCompare(b.CODIGO, undefined, { numeric: true }),
  );
  const map = new Map<string, PlanCuentaPartial>();

  const root: PlanCuentaPartial[] = [];

  for (const item of sorted) {
    const node: PlanCuentaPartial = {
      codigo: item.CODIGO,
      cuenta: item.CUENTA,
      analiticos: (item?.['CODIGO ANALITICO']?.split(',') || []).map((v) => ({
        codigoAnalitico: +v,empresaId: auth.dominio
      })),
      esImputable: item.IMPUTABLE == 'SI',
      nivel: undefined,
      empresaId: auth.dominio,
      tipo: TIPO_CUENTA[item.TIPO],
      listaCuenta: [],
    };

    map.set(item.CODIGO, node);
    const parentCodigo = item.CODIGO.split('.').slice(0, -1).join('.');
    if (parentCodigo && map.has(parentCodigo)) {
      node.nivel = parentCodigo.split('.').length + 1;
      map.get(parentCodigo)!.listaCuenta!.push(node);
    } else {
      node.nivel = 1;
      root.push(node);
    }
  }
  // Limpieza: eliminamos children vacíos
  const clean = (nodes: PlanCuentaPartial[]): any[] => {
    return nodes.map((n) => ({
      ...n,
      listaCuenta:
        n?.listaCuenta && n?.listaCuenta?.length
          ? clean(n.listaCuenta)
          : undefined,
    }));
  };

  return clean(root);
}

export function buildContabilidadTree(data: Cuenta[]): any[] {
  // Ordenamos los códigos para asegurar que los padres van antes que los hijos
  const sorted = [...data].sort((a, b) =>
    a.codigo.localeCompare(b.codigo, undefined, { numeric: true }),
  );
  const map = new Map<string, Cuenta>();

  const root: Cuenta[] = [];

  for (const item of sorted) {
    const node: Cuenta = Cuenta.create({
      ...item,
      listaCuenta: [],
    });

    map.set(item.codigo, node);
    const parentCodigo = item.codigo.split('.').slice(0, -1).join('.');
    if (parentCodigo && map.has(parentCodigo)) {
      node.nivel = parentCodigo.split('.').length + 1;
      map.get(parentCodigo)!.listaCuenta!.push(node);
    } else {
      node.nivel = 1;
      root.push(node);
    }
  }
  // Limpieza: eliminamos children vacíos
  const clean = (nodes: Cuenta[]): any[] => {
    return nodes.map((n) => ({
      ...n,
      listaCuenta:
        n?.listaCuenta && n?.listaCuenta?.length
          ? clean(n.listaCuenta)
          : undefined,
    }));
  };

  return clean(root);
}
