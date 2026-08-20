import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProducto1776308370295 implements MigrationInterface {
    name = 'FixProducto1776308370295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta_producto" ALTER COLUMN "costo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venta_producto" ALTER COLUMN "costo" SET NOT NULL`);
    }

}
