import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDetalleCompra1781661954551 implements MigrationInterface {
    name = 'FixDetalleCompra1781661954551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra_detalle" ADD "total" numeric(18,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra_estado" ALTER COLUMN "compra_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra_estado" ALTER COLUMN "compra_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra_detalle" DROP COLUMN "total"`);
    }

}
