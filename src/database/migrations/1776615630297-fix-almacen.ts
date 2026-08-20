import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAlmacen1776615630297 implements MigrationInterface {
    name = 'FixAlmacen1776615630297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sucursal_almacen" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "tipo" smallint NOT NULL, "estado" smallint NOT NULL DEFAULT '1', "es_principal" boolean NOT NULL DEFAULT false, "permite_venta" boolean NOT NULL DEFAULT false, "premite_transferencia" boolean NOT NULL DEFAULT true, "sucursal_id" bigint NOT NULL, CONSTRAINT "PK_1d9a2fcbe5c6013b9d0d81ebf83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE sucursal ALTER COLUMN estado DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE sucursal ALTER COLUMN estado TYPE smallint USING estado::smallint`);
        await queryRunner.query(`ALTER TABLE sucursal ALTER COLUMN estado SET DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE sucursal ALTER COLUMN estado SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sucursal_almacen" ADD CONSTRAINT "FK_f552cab49fe4ee725353d0dc5a2" FOREIGN KEY ("sucursal_id") REFERENCES "sucursal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sucursal_almacen" DROP CONSTRAINT "FK_f552cab49fe4ee725353d0dc5a2"`);
        await queryRunner.query(`ALTER TABLE "sucursal"  alter COLUMN "estado" type character varying(10) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`DROP TABLE "sucursal_almacen"`);
    }

}
