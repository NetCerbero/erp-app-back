import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMoneda1789321761181 implements MigrationInterface {
    name = 'FixMoneda1789321761181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."producto_lista_precio" ALTER COLUMN moneda TYPE integer`);
        await queryRunner.query(`ALTER TABLE "dev"."producto_lista_precio" RENAME COLUMN "moneda" TO "moneda_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."producto_lista_precio" RENAME COLUMN "moneda_id" TO "moneda"`);
        await queryRunner.query(`ALTER TABLE "dev"."producto_lista_precio" ALTER COLUMN moneda TYPE smallint`);
    }

}
