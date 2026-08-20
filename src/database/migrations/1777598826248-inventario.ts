import { MigrationInterface, QueryRunner } from "typeorm";

export class Inventario1777598826248 implements MigrationInterface {
    name = 'Inventario1777598826248'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventario" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "cantidad" numeric(15,2) NOT NULL, "cantidad_minima" numeric(15,2), "producto_id" bigint NOT NULL, "almacen_id" bigint NOT NULL, "empresa_id" integer NOT NULL, CONSTRAINT "PK_90f2b8f62985685e15fea12e237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_inventario_empresa_active" ON "inventario" ("empresa_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "idx_inventario_almacen_active" ON "inventario" ("almacen_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "idx_inventario_producto_active" ON "inventario" ("producto_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "uq_inventario_producto_almacen_active" ON "inventario" ("producto_id", "almacen_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE TABLE "inventario_movimiento" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "cantidad" numeric(15,2) NOT NULL, "signo" smallint NOT NULL, "tipo" smallint NOT NULL, "fecha" TIMESTAMP NOT NULL, "referencia_tipo" smallint NOT NULL, "referencia_id" bigint NOT NULL, "producto_id" bigint NOT NULL, "almacen_id" bigint NOT NULL, "empresa_id" integer NOT NULL, CONSTRAINT "PK_1aae318d00e6654780ce7860564" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_empresa" ON "inventario_movimiento" ("empresa_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "idx_producto_almacen" ON "inventario_movimiento" ("producto_id", "almacen_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "idx_kardex" ON "inventario_movimiento" ("producto_id", "almacen_id", "fecha" desc) WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "idx_movimiento_referencia" ON "inventario_movimiento" ("referencia_tipo", "referencia_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "producto_sucursal_id_seq" OWNED BY "producto_sucursal"."id"`);
        await queryRunner.query(`ALTER TABLE "producto_sucursal" ALTER COLUMN "id" SET DEFAULT nextval('"producto_sucursal_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "producto_sucursal" DROP CONSTRAINT "FK_a9d3b95d3b11cbfc90c7120c3a6"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "producto_id_seq" OWNED BY "producto"."id"`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "id" SET DEFAULT nextval('"producto_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "producto_sucursal" ADD CONSTRAINT "FK_a9d3b95d3b11cbfc90c7120c3a6" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario" ADD CONSTRAINT "FK_d2819ea354c9dd7a89ac7197a86" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario" ADD CONSTRAINT "FK_57a9daeaffae4ca90b3614f9edf" FOREIGN KEY ("almacen_id") REFERENCES "sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD CONSTRAINT "FK_b4ecc1776634ac6def56d8e1b3d" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD CONSTRAINT "FK_94e3d235eee9ac7b61935e35a71" FOREIGN KEY ("almacen_id") REFERENCES "sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP CONSTRAINT "FK_94e3d235eee9ac7b61935e35a71"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP CONSTRAINT "FK_b4ecc1776634ac6def56d8e1b3d"`);
        await queryRunner.query(`ALTER TABLE "inventario" DROP CONSTRAINT "FK_57a9daeaffae4ca90b3614f9edf"`);
        await queryRunner.query(`ALTER TABLE "inventario" DROP CONSTRAINT "FK_d2819ea354c9dd7a89ac7197a86"`);
        await queryRunner.query(`ALTER TABLE "producto_sucursal" DROP CONSTRAINT "FK_a9d3b95d3b11cbfc90c7120c3a6"`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "producto_id_seq"`);
        await queryRunner.query(`ALTER TABLE "producto_sucursal" ADD CONSTRAINT "FK_a9d3b95d3b11cbfc90c7120c3a6" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto_sucursal" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "producto_sucursal_id_seq"`);
        await queryRunner.query(`DROP INDEX "public"."idx_movimiento_referencia"`);
        await queryRunner.query(`DROP INDEX "public"."idx_kardex"`);
        await queryRunner.query(`DROP INDEX "public"."idx_producto_almacen"`);
        await queryRunner.query(`DROP INDEX "public"."idx_empresa"`);
        await queryRunner.query(`DROP TABLE "inventario_movimiento"`);
        await queryRunner.query(`DROP INDEX "public"."uq_inventario_producto_almacen_active"`);
        await queryRunner.query(`DROP INDEX "public"."idx_inventario_producto_active"`);
        await queryRunner.query(`DROP INDEX "public"."idx_inventario_almacen_active"`);
        await queryRunner.query(`DROP INDEX "public"."idx_inventario_empresa_active"`);
        await queryRunner.query(`DROP TABLE "inventario"`);
    }

}
