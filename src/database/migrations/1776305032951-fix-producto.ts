import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProducto1776305032951 implements MigrationInterface {
    name = 'FixProducto1776305032951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta_producto_sucursal" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "venta_producto_sucursal" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "venta_producto" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "venta_producto" DROP COLUMN "es_compuesto"`);
        await queryRunner.query(`ALTER TABLE "venta_producto" ADD "costo" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venta_producto" ADD "precio_base" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venta_producto" ADD "tpv" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "venta_producto" ADD "control_stock" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta_producto" DROP COLUMN "control_stock"`);
        await queryRunner.query(`ALTER TABLE "venta_producto" DROP COLUMN "tpv"`);
        await queryRunner.query(`ALTER TABLE "venta_producto" DROP COLUMN "precio_base"`);
        await queryRunner.query(`ALTER TABLE "venta_producto" DROP COLUMN "costo"`);
        await queryRunner.query(`ALTER TABLE "venta_producto" ADD "es_compuesto" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "venta_producto" ADD "precio" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venta_producto_sucursal" ADD "estado" smallint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "venta_producto_sucursal" ADD "stock" integer NOT NULL DEFAULT '0'`);
    }

}
