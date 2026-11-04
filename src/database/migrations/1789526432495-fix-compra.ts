import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCompra1789526432495 implements MigrationInterface {
    name = 'FixCompra1789526432495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" DROP CONSTRAINT "FK_cb7fce8560e7e41d86ee26fb104"`);
        await queryRunner.query(`CREATE TABLE "dev"."proveedor" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "nombre" character varying(200) NOT NULL, "observacion" character varying(255), "estado" smallint NOT NULL DEFAULT '1', "empresa_id" integer NOT NULL, CONSTRAINT "PK_405f60886417ece76cb5681550a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dev"."unidad_medida" DROP COLUMN "simbolo"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" DROP COLUMN "almacen_id"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ADD "cantidad_base" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ADD "costo_unitario_moneda_base" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ADD "total_moneda_base" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ADD "unidad_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" ADD "total_moneda_base" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" ADD "tipo_cambio" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" ADD "moneda_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" ADD "almacen_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ADD CONSTRAINT "FK_50e95ae899273f4d75334ba7a1a" FOREIGN KEY ("unidad_id") REFERENCES "dev"."unidad_medida"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" ADD CONSTRAINT "FK_7200a1aa365d9b243ff342ae376" FOREIGN KEY ("almacen_id") REFERENCES "dev"."sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" ADD CONSTRAINT "FK_8171d7051b32f75fcc5c909eb50" FOREIGN KEY ("proveedor_id") REFERENCES "dev"."proveedor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."compra" DROP CONSTRAINT "FK_8171d7051b32f75fcc5c909eb50"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" DROP CONSTRAINT "FK_7200a1aa365d9b243ff342ae376"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" DROP CONSTRAINT "FK_50e95ae899273f4d75334ba7a1a"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" DROP COLUMN "almacen_id"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" DROP COLUMN "moneda_id"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" DROP COLUMN "tipo_cambio"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra" DROP COLUMN "total_moneda_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" DROP COLUMN "unidad_id"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" DROP COLUMN "total_moneda_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" DROP COLUMN "costo_unitario_moneda_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" DROP COLUMN "cantidad_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ADD "almacen_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."unidad_medida" ADD "simbolo" character varying(20)`);
        await queryRunner.query(`DROP TABLE "dev"."proveedor"`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ADD CONSTRAINT "FK_cb7fce8560e7e41d86ee26fb104" FOREIGN KEY ("almacen_id") REFERENCES "dev"."sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
