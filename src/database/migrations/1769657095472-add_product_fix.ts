import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductFix1769657095472 implements MigrationInterface {
    name = 'AddProductFix1769657095472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "venta_producto_compuesto" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "cantidad" integer NOT NULL, "producto_id" bigint NOT NULL, CONSTRAINT "PK_98b20fdb21f9c88093e9a22a08a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venta_producto_sucursal" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "stock" integer NOT NULL DEFAULT '0', "estado" smallint NOT NULL DEFAULT '1', "producto_id" bigint NOT NULL, "sucursal_id" bigint NOT NULL, CONSTRAINT "PK_24b5d3511f820754676c1d2325a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venta_producto" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "identificador" character varying(255), "nombre" character varying(255) NOT NULL, "precio" numeric(15,2) NOT NULL, "descripcion" text, "tipo" integer NOT NULL DEFAULT '1', "estado" smallint NOT NULL DEFAULT '1', "es_compuesto" boolean NOT NULL DEFAULT false, "empresa_id" integer NOT NULL, CONSTRAINT "PK_b5660bd27e68e2a814ba14f7a44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contabilidad_cuenta" DROP COLUMN "codigo_analitico"`);
        await queryRunner.query(`ALTER TABLE "permiso_usuario" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "permiso_usuario" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "usuario_dominio" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "usuario_dominio" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "usuario_credencial" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "usuario_credencial" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "ubicacion" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "ubicacion" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "sucursal" ALTER COLUMN "estado" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "permiso_accion" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "permiso_accion" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "permiso_modulo" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "permiso_modulo" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "permiso_pagina" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "permiso_pagina" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "contabilidad_cuenta" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "contabilidad_cuenta" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "venta_producto_compuesto" ADD CONSTRAINT "FK_cb488f8bf44060bec38370ead96" FOREIGN KEY ("producto_id") REFERENCES "venta_producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venta_producto_sucursal" ADD CONSTRAINT "FK_222306cbd522516edac29fe416b" FOREIGN KEY ("producto_id") REFERENCES "venta_producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "venta_producto_sucursal" ADD CONSTRAINT "FK_ee0545c814d533022a8bcd9a87f" FOREIGN KEY ("sucursal_id") REFERENCES "sucursal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta_producto_sucursal" DROP CONSTRAINT "FK_ee0545c814d533022a8bcd9a87f"`);
        await queryRunner.query(`ALTER TABLE "venta_producto_sucursal" DROP CONSTRAINT "FK_222306cbd522516edac29fe416b"`);
        await queryRunner.query(`ALTER TABLE "venta_producto_compuesto" DROP CONSTRAINT "FK_cb488f8bf44060bec38370ead96"`);
        await queryRunner.query(`ALTER TABLE "contabilidad_cuenta" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "contabilidad_cuenta" ADD "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "permiso_pagina" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "permiso_pagina" ADD "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "permiso_modulo" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "permiso_modulo" ADD "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "permiso_accion" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "permiso_accion" ADD "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "sucursal" ALTER COLUMN "estado" SET DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "ubicacion" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "ubicacion" ADD "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "usuario_credencial" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "usuario_credencial" ADD "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "usuario_dominio" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "usuario_dominio" ADD "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "permiso_usuario" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "permiso_usuario" ADD "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE "contabilidad_cuenta" ADD "codigo_analitico" integer`);
        await queryRunner.query(`DROP TABLE "venta_producto"`);
        await queryRunner.query(`DROP TABLE "venta_producto_sucursal"`);
        await queryRunner.query(`DROP TABLE "venta_producto_compuesto"`);
    }

}
