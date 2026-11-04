import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUnidad1789733330528 implements MigrationInterface {
    name = 'FixUnidad1789733330528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."inventario" DROP COLUMN "cantidad"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario" DROP COLUMN "cantidad_minima"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" DROP COLUMN "signo"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario" ADD "cantidad_unidad_base" numeric(18,6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario" ADD "costo_unidad_base" numeric(18,6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."producto" ADD "unidad_id" integer`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ADD "costo_total" numeric(18,6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ADD "cantidad_unidad_base" numeric(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ADD "costo_unitario_moneda_base" numeric(18,6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ADD "costo_total_moneda_base" numeric(18,6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ADD "empresa_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento" ADD "almacen_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ALTER COLUMN "costo_unitario" TYPE numeric(18,6)`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ALTER COLUMN "costo_unitario" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."producto" ADD CONSTRAINT "FK_c3ef80e6d1049faa1c6d3130acc" FOREIGN KEY ("unidad_id") REFERENCES "dev"."unidad_medida"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento" ADD CONSTRAINT "FK_94e3d235eee9ac7b61935e35a71" FOREIGN KEY ("almacen_id") REFERENCES "dev"."sucursal_almacen"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento" DROP CONSTRAINT "FK_94e3d235eee9ac7b61935e35a71"`);
        await queryRunner.query(`ALTER TABLE "dev"."producto" DROP CONSTRAINT "FK_c3ef80e6d1049faa1c6d3130acc"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ALTER COLUMN "costo_unitario" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ALTER COLUMN "costo_unitario" TYPE numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento" DROP COLUMN "almacen_id"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" DROP COLUMN "empresa_id"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" DROP COLUMN "costo_total_moneda_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" DROP COLUMN "costo_unitario_moneda_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" DROP COLUMN "cantidad_unidad_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" DROP COLUMN "costo_total"`);
        await queryRunner.query(`ALTER TABLE "dev"."producto" DROP COLUMN "unidad_id"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario" DROP COLUMN "costo_unidad_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario" DROP COLUMN "cantidad_unidad_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario_movimiento_detalle" ADD "signo" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario" ADD "cantidad_minima" numeric(15,2)`);
        await queryRunner.query(`ALTER TABLE "dev"."inventario" ADD "cantidad" numeric(15,2) NOT NULL`);
    }

}
