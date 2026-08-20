import { MigrationInterface, QueryRunner } from "typeorm";

export class FixInventario1782358527877 implements MigrationInterface {
    name = 'FixInventario1782358527877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`DROP INDEX public.uq_inventario_producto_almacen_active`);
        await queryRunner.query(`CREATE UNIQUE INDEX "uq_inventario_producto_almacen_active" ON "inventario" ("producto_id", "almacen_id", "empresa_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."uq_inventario_producto_almacen_active"`);
        await queryRunner.query(`ALTER TABLE "inventario" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`CREATE UNIQUE INDEX "uq_inventario_producto_almacen_active" ON "inventario" ("producto_id", "almacen_id") WHERE (deleted_at IS NULL)`);
    }

}
