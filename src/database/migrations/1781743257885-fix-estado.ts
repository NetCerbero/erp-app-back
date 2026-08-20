import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEstado1781743257885 implements MigrationInterface {
    name = 'FixEstado1781743257885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_6159884f050abb485942a69d15b"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "REL_6159884f050abb485942a69d15"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP COLUMN "estado_actual_id"`);
        await queryRunner.query(`ALTER TABLE "compra" ADD "estado_actual_id" bigint`);
        await queryRunner.query(`ALTER TABLE "compra_estado" DROP COLUMN "compra_id"`);
        await queryRunner.query(`ALTER TABLE "compra_estado" ADD "compra_id" bigint`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c" FOREIGN KEY ("sucursal_id") REFERENCES "sucursal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_estado" ADD CONSTRAINT "FK_bebe69b43fc8642d7eec71e11ce" FOREIGN KEY ("compra_id") REFERENCES "compra"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra_estado" ADD CONSTRAINT "FK_777324523125827cbf95211b17d" FOREIGN KEY ("usuario_id") REFERENCES "usuario_credencial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra_estado" DROP CONSTRAINT "FK_777324523125827cbf95211b17d"`);
        await queryRunner.query(`ALTER TABLE "compra_estado" DROP CONSTRAINT "FK_bebe69b43fc8642d7eec71e11ce"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c"`);
        await queryRunner.query(`ALTER TABLE "compra_estado" DROP COLUMN "compra_id"`);
        await queryRunner.query(`ALTER TABLE "compra_estado" ADD "compra_id" integer`);
        await queryRunner.query(`ALTER TABLE "compra" DROP COLUMN "estado_actual_id"`);
        await queryRunner.query(`ALTER TABLE "compra" ADD "estado_actual_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "REL_6159884f050abb485942a69d15" UNIQUE ("estado_actual_id")`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c" FOREIGN KEY ("sucursal_id") REFERENCES "sucursal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_6159884f050abb485942a69d15b" FOREIGN KEY ("estado_actual_id") REFERENCES "compra_estado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
