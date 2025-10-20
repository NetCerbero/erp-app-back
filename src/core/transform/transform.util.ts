export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number | null {
    return data == null ? null : Number(data);
  }
}