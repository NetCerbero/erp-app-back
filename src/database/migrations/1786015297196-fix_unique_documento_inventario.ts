import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUniqueDocumentoInventario1786015297196 implements MigrationInterface {
    name = 'FixUniqueDocumentoInventario1786015297196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_inventario_documento_inicial" ON "inventario_documento" ("empresa_id", "almacen_origen_id", "tipo", "estado") WHERE deleted_at IS NULL and tipo = 5 and estado = 2`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_inventario_documento_inicial"`);
    }

}
