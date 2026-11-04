import { MigrationInterface, QueryRunner } from "typeorm";

export class FixNameTasacambio1791006902881 implements MigrationInterface {
    name = 'FixNameTasacambio1791006902881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."moneda_tasa_cambio" RENAME COLUMN "moneda" TO "moneda_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."moneda_tasa_cambio" RENAME COLUMN "moneda_id" TO "moneda"`);
    }

}
