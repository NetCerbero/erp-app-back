export function getOptionsFromEnum<T extends object>(param: T) {
  return Object.entries(param)
    .filter(([k]) => isNaN(Number(k))) // evita los índices reversos de los enums numéricos
    .map(([key, value]) => ({
      label: key,
      value: value as T[keyof T],
    }));
}
