import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDetalleCompra1781667355051 implements MigrationInterface {
    name = 'FixDetalleCompra1781667355051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra" ADD "identificador" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "compra" ADD CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c" FOREIGN KEY ("sucursal_id") REFERENCES "sucursal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compra" DROP CONSTRAINT "FK_c1b51292a992ca85cc9d6525f5c"`);
        await queryRunner.query(`ALTER TABLE "compra" DROP COLUMN "identificador"`);
    }

}
