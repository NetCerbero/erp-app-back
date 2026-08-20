import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMovimiento1782444790120 implements MigrationInterface {
    name = 'FixMovimiento1782444790120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP CONSTRAINT "FK_3f2b1dea4169905234e3985309f"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "inventario_id"`);
        await queryRunner.query(`CREATE INDEX "idx_inventario_empresa_active" ON "inventario" ("empresa_id") `);
        await queryRunner.query(`CREATE INDEX "idx_inventario_almacen_active" ON "inventario" ("almacen_id") `);
        await queryRunner.query(`CREATE INDEX "idx_inventario_producto_active" ON "inventario" ("producto_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_inventario_producto_active"`);
        await queryRunner.query(`DROP INDEX "public"."idx_inventario_almacen_active"`);
        await queryRunner.query(`DROP INDEX "public"."idx_inventario_empresa_active"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "inventario_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD CONSTRAINT "FK_3f2b1dea4169905234e3985309f" FOREIGN KEY ("inventario_id") REFERENCES "inventario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
