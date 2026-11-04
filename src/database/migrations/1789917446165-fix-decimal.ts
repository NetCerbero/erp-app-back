import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDecimal1789917446165 implements MigrationInterface {
    name = 'FixDecimal1789917446165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento" ADD "moneda_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ALTER COLUMN "cantidad" TYPE numeric(18,6)`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ALTER COLUMN "cantidad_unidad_base" TYPE numeric(18,6)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "cantidad" TYPE numeric(18,6)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "cantidad_base" TYPE numeric(18,6)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "costo_unitario" TYPE numeric(18,6)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "costo_unitario_moneda_base" TYPE numeric(18,6)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "total" TYPE numeric(18,6)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "total_moneda_base" TYPE numeric(18,6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "total_moneda_base" TYPE numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "total" TYPE numeric(18,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "costo_unitario_moneda_base" TYPE numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "costo_unitario" TYPE numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "cantidad_base" TYPE numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."compra_detalle" ALTER COLUMN "cantidad" TYPE numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ALTER COLUMN "cantidad_unidad_base" TYPE numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ALTER COLUMN "cantidad" TYPE numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento" DROP COLUMN "moneda_id"`);
    }

}
