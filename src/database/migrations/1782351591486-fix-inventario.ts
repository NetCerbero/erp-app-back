import { MigrationInterface, QueryRunner } from "typeorm";

export class FixInventario1782351591486 implements MigrationInterface {
    name = 'FixInventario1782351591486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP CONSTRAINT "FK_94e3d235eee9ac7b61935e35a71"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP CONSTRAINT "FK_b4ecc1776634ac6def56d8e1b3d"`);
        await queryRunner.query(`DROP INDEX "public"."idx_producto_almacen"`);
        await queryRunner.query(`DROP INDEX "public"."idx_kardex"`);
        await queryRunner.query(`DROP INDEX "public"."idx_movimiento_referencia"`);
        await queryRunner.query(`CREATE TABLE "inventario_movimiento_detalle" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cantidad" numeric(15,2) NOT NULL, "costo_unitario" numeric(15,2), "signo" smallint NOT NULL, "producto_id" bigint NOT NULL, "almacen_id" bigint NOT NULL, "movimiento_id" bigint NOT NULL, CONSTRAINT "PK_721adff35af491f6de973f6d7df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventario_documento_detalle" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "cantidad" numeric(15,2) NOT NULL, "cantidad_anterior" numeric(15,2), "observacion" character varying(255), "producto_id" bigint NOT NULL, "empresa_id" integer NOT NULL, "documento_id" bigint NOT NULL, CONSTRAINT "PK_00b1ef1f4e0e8df12e3e8bf15ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventario_documento" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "codigo" character varying(40) NOT NULL, "tipo" integer NOT NULL, "fecha_documento" TIMESTAMP NOT NULL, "estado" smallint NOT NULL, "observacion" text, "empresa_id" integer NOT NULL, "usuario_id" bigint NOT NULL, "almacen_origen_id" bigint NOT NULL, "almacen_destino_id" bigint, CONSTRAINT "PK_650e926c842b040113ec5fe5ac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "cantidad"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "signo"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "referencia_tipo"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "referencia_id"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "producto_id"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "almacen_id"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "fecha_documento" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "documento_origen" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "documento_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "observacion" text`);
        await queryRunner.query(`ALTER TABLE "compra_estado" DROP CONSTRAINT "FK_777324523125827cbf95211b17d"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c"`);
        await queryRunner.query(`CREATE INDEX "idx_movimiento_referencia" ON "inventario_movimiento" ("documento_origen", "documento_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento_detalle" ADD CONSTRAINT "FK_e1c8b5b8c79c1b77586400e4230" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento_detalle" ADD CONSTRAINT "FK_4d495830bf60c617559c78e09f3" FOREIGN KEY ("almacen_id") REFERENCES "sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento_detalle" ADD CONSTRAINT "FK_fe0e15c2f72cfd359814ed65035" FOREIGN KEY ("movimiento_id") REFERENCES "inventario_movimiento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_documento_detalle" ADD CONSTRAINT "FK_194f94d3fb412a6703dfbab434b" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_documento_detalle" ADD CONSTRAINT "FK_1a8aa311d7ffc7e2fff6078591a" FOREIGN KEY ("documento_id") REFERENCES "inventario_documento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_documento" ADD CONSTRAINT "FK_ff36732769dd56a5eb5bd34e699" FOREIGN KEY ("usuario_id") REFERENCES "usuario_credencial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_documento" ADD CONSTRAINT "FK_83a93e90f5953c17ff5cd16dee3" FOREIGN KEY ("almacen_origen_id") REFERENCES "sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_documento" ADD CONSTRAINT "FK_f0cf8aae80a3dafc8871c84d3ab" FOREIGN KEY ("almacen_destino_id") REFERENCES "sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_estado" ADD CONSTRAINT "FK_777324523125827cbf95211b17d" FOREIGN KEY ("usuario_id") REFERENCES "usuario_credencial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c" FOREIGN KEY ("sucursal_id") REFERENCES "sucursal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c"`);
        await queryRunner.query(`ALTER TABLE "compra_estado" DROP CONSTRAINT "FK_777324523125827cbf95211b17d"`);
        await queryRunner.query(`ALTER TABLE "inventario_documento" DROP CONSTRAINT "FK_f0cf8aae80a3dafc8871c84d3ab"`);
        await queryRunner.query(`ALTER TABLE "inventario_documento" DROP CONSTRAINT "FK_83a93e90f5953c17ff5cd16dee3"`);
        await queryRunner.query(`ALTER TABLE "inventario_documento" DROP CONSTRAINT "FK_ff36732769dd56a5eb5bd34e699"`);
        await queryRunner.query(`ALTER TABLE "inventario_documento_detalle" DROP CONSTRAINT "FK_1a8aa311d7ffc7e2fff6078591a"`);
        await queryRunner.query(`ALTER TABLE "inventario_documento_detalle" DROP CONSTRAINT "FK_194f94d3fb412a6703dfbab434b"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento_detalle" DROP CONSTRAINT "FK_fe0e15c2f72cfd359814ed65035"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento_detalle" DROP CONSTRAINT "FK_4d495830bf60c617559c78e09f3"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento_detalle" DROP CONSTRAINT "FK_e1c8b5b8c79c1b77586400e4230"`);
        await queryRunner.query(`DROP INDEX "public"."idx_movimiento_referencia"`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c" FOREIGN KEY ("sucursal_id") REFERENCES "sucursal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_estado" ADD CONSTRAINT "FK_777324523125827cbf95211b17d" FOREIGN KEY ("usuario_id") REFERENCES "usuario_credencial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "observacion"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "documento_id"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "documento_origen"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" DROP COLUMN "fecha_documento"`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "almacen_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "producto_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "referencia_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "referencia_tipo" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "fecha" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "signo" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD "cantidad" numeric(15,2) NOT NULL`);
        await queryRunner.query(`DROP TABLE "inventario_documento"`);
        await queryRunner.query(`DROP TABLE "inventario_documento_detalle"`);
        await queryRunner.query(`DROP TABLE "inventario_movimiento_detalle"`);
        await queryRunner.query(`CREATE INDEX "idx_movimiento_referencia" ON "inventario_movimiento" ("referencia_tipo", "referencia_id") WHERE (deleted_at IS NULL)`);
        await queryRunner.query(`CREATE INDEX "idx_kardex" ON "inventario_movimiento" ("fecha", "producto_id", "almacen_id") WHERE (deleted_at IS NULL)`);
        await queryRunner.query(`CREATE INDEX "idx_producto_almacen" ON "inventario_movimiento" ("producto_id", "almacen_id") WHERE (deleted_at IS NULL)`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD CONSTRAINT "FK_b4ecc1776634ac6def56d8e1b3d" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventario_movimiento" ADD CONSTRAINT "FK_94e3d235eee9ac7b61935e35a71" FOREIGN KEY ("almacen_id") REFERENCES "sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
