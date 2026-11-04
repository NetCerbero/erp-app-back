import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix1789224991296 implements MigrationInterface {
    name = 'Fix1789224991296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."producto_lista_precio" ADD "empresa_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dev"."producto_lista_precio" ADD "estado" smallint NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."producto_lista_precio" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "dev"."producto_lista_precio" DROP COLUMN "empresa_id"`);
    }

}
