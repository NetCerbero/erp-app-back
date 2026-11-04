import { EntityManager, EntityTarget } from 'typeorm';

interface BulkUpdateConfig<TEntity, K extends keyof TEntity> {
  key: K;
  fields: K[];
  updateTimestamp?: boolean;
}

export async function bulkUpdate<
  TEntity extends Record<string, any>,
  K extends keyof TEntity,
>(
  manager: EntityManager,
  entity: EntityTarget<TEntity>,
  items: Pick<TEntity, K>[],
  config: BulkUpdateConfig<TEntity, K>,
): Promise<void> {
  if (!items.length) {
    return;
  }

  const metadata = manager.connection.getMetadata(entity);
  const driver = manager.connection.driver;

  const { key, fields, updateTimestamp = true } = config;

  /*
   * Obtenemos la metadata de cada propiedad de la entidad.
   *
   * Ejemplo:
   *
   * cantidad       -> numeric
   * cantidadAnterior -> numeric
   * productoId     -> bigint
   * empresaId      -> integer
   */
  const columns = fields.map((property) => {
    const column = metadata.findColumnWithPropertyName(String(property));

    if (!column) {
      throw new Error(
        `No existe la propiedad "${String(property)}" ` +
          `en la entidad "${metadata.name}"`,
      );
    }

    const databaseType = driver.normalizeType(column);

    return {
      property,
      databaseName: column.databaseName,
      type: databaseType,
      column,
    };
  });

  /*
   * Verificamos que la columna utilizada como WHERE
   * esté incluida en fields.
   */
  const keyColumn = columns.find((column) => column.property === key);

  if (!keyColumn) {
    throw new Error(
      `La propiedad "${String(key)}" debe estar incluida en fields`,
    );
  }

  /*
   * Construimos los parámetros:
   *
   * $1::bigint
   * $2::numeric
   * $3::numeric
   * ...
   */
  const values: unknown[] = [];

  const rows = items.map((item) => {
    const placeholders = columns.map((column) => {
      values.push(item[column.property]);

      const parameter = `$${values.length}`;

      return column.type ? `${parameter}::${column.type}` : parameter;
    });

    return `(${placeholders.join(', ')})`;
  });

  /*
   * Columnas que tendrá la tabla virtual "source".
   *
   * id,
   * cantidad,
   * cantidad_anterior,
   * producto_id,
   * empresa_id
   */
  const sourceColumns = columns
    .map((column) => `"${column.databaseName}"`)
    .join(', ');

  /*
   * Construimos:
   *
   * target.cantidad = source.cantidad
   * target.producto_id = source.producto_id
   *
   * No actualizamos la PK.
   */
  const setColumns = columns
    .filter((column) => column.property !== key)
    .map(
      (column) =>
        `"${column.databaseName}" = ` + `source."${column.databaseName}"`,
    );

  /*
   * Actualizar updated_at automáticamente.
   */
  const updateDateColumn = metadata.updateDateColumn;
  if (updateTimestamp && updateDateColumn) {
    setColumns.push(`"${updateDateColumn.databaseName}" = CURRENT_TIMESTAMP`);
  }

  if (!setColumns.length) {
    throw new Error('No existen campos para actualizar.');
  }

  /*
   * Nombre de tabla incluyendo schema.
   */
  const tableName = metadata.schema
    ? `"${metadata.schema}"."${metadata.tableName}"`
    : `"${metadata.tableName}"`;

  /*
   * SQL final.
   */
  const sql = `
    UPDATE ${tableName} AS target
    SET
      ${setColumns.join(',\n      ')}
    FROM (
      VALUES
        ${rows.join(',\n        ')}
    ) AS source (${sourceColumns})
    WHERE target."${keyColumn.databaseName}" = source."${keyColumn.databaseName}"
  `;

  await manager.query(sql, values);
}
