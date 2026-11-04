export const magicSelect = (select: IMagicSelect) => {
  const selected: string[] = [];
  Object.keys(select).forEach((key) => {
    if (select[key])
      selected.push(
        ...select[key].map((attribute: string) => `${key}.${attribute}`),
      );
    else selected.push(key);
  });
  return selected;
};

interface IMagicSelect {
  [key: string]: string[];
}
