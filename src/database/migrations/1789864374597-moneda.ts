import { MigrationInterface, QueryRunner } from "typeorm";

export class Moneda1789864374597 implements MigrationInterface {
    name = 'Moneda1789864374597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."producto" DROP CONSTRAINT "FK_c3ef80e6d1049faa1c6d3130acc"`);
        await queryRunner.query(`ALTER TABLE "dev"."producto" DROP COLUMN "unidad_id"`);
        await queryRunner.query(`ALTER TABLE "dev"."usuario_dominio" ADD "moneda_base" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dev"."usuario_dominio" DROP COLUMN "moneda_base"`);
        await queryRunner.query(`ALTER TABLE "dev"."producto" ADD "unidad_id" integer`);
        await queryRunner.query(`ALTER TABLE "dev"."producto" ADD CONSTRAINT "FK_c3ef80e6d1049faa1c6d3130acc" FOREIGN KEY ("unidad_id") REFERENCES "dev"."unidad_medida"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
