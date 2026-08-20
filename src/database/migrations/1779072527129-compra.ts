import { MigrationInterface, QueryRunner } from "typeorm";

export class Compra1779072527129 implements MigrationInterface {
    name = 'Compra1779072527129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "compra_detalle" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "cantidad" numeric(15,2) NOT NULL, "costo_unitario" numeric(15,2) NOT NULL, "almacen_id" bigint NOT NULL, "producto_id" bigint NOT NULL, "compra_id" bigint NOT NULL, "empresa_id" integer NOT NULL, CONSTRAINT "PK_a3006369b9f933009f01ef85bce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "compra_estado" ("id" BIGSERIAL NOT NULL, "estado" smallint NOT NULL, "usuario_id" integer NOT NULL, "observacion" text, "created_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "compra_id" integer NOT NULL, CONSTRAINT "PK_dc7c4e3d7a2119a22ba7bc7e5bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "compra" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "fecha" TIMESTAMP NOT NULL, "proveedor_id" integer NOT NULL, "sucursal_id" integer NOT NULL, "estado" smallint NOT NULL, "tipo_comprobante" smallint NOT NULL, "total" numeric(15,2) NOT NULL, "estado_actual_id" bigint NOT NULL, "empresa_id" integer NOT NULL, CONSTRAINT "REL_6159884f050abb485942a69d15" UNIQUE ("estado_actual_id"), CONSTRAINT "PK_1282735aa02eaee06c0e1b5da41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "inventario_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "usuario_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD CONSTRAINT "FK_3f2b1dea4169905234e3985309f" FOREIGN KEY ("inventario_id") REFERENCES "inventario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_detalle" ADD CONSTRAINT "FK_cb7fce8560e7e41d86ee26fb104" FOREIGN KEY ("almacen_id") REFERENCES "sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_detalle" ADD CONSTRAINT "FK_aceb0e29a1f15ada8d8f69997ef" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_detalle" ADD CONSTRAINT "FK_aa0e2ab3802f3dda00afd0089ea" FOREIGN KEY ("compra_id") REFERENCES "compra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_6159884f050abb485942a69d15b" FOREIGN KEY ("estado_actual_id") REFERENCES "compra_estado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_6159884f050abb485942a69d15b"`);
        await queryRunner.query(`ALTER TABLE "compra_detalle" DROP CONSTRAINT "FK_aa0e2ab3802f3dda00afd0089ea"`);
        await queryRunner.query(`ALTER TABLE "compra_detalle" DROP CONSTRAINT "FK_aceb0e29a1f15ada8d8f69997ef"`);
        await queryRunner.query(`ALTER TABLE "compra_detalle" DROP CONSTRAINT "FK_cb7fce8560e7e41d86ee26fb104"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP CONSTRAINT "FK_3f2b1dea4169905234e3985309f"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "usuario_id"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "inventario_id"`);
        await queryRunner.query(`DROP TABLE "compra"`);
        await queryRunner.query(`DROP TABLE "compra_estado"`);
        await queryRunner.query(`DROP TABLE "compra_detalle"`);
    }

}
