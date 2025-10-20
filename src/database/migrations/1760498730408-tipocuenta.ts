import { MigrationInterface, QueryRunner } from "typeorm";

export class Tipocuenta1760498730408 implements MigrationInterface {
    name = 'Tipocuenta1760498730408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contabilidad_plan_cuenta" ADD "tipo" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contabilidad_plan_cuenta" DROP COLUMN "tipo"`);
    }

}
