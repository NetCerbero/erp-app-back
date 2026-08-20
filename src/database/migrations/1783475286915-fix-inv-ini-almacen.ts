import { MigrationInterface, QueryRunner } from "typeorm";

export class FixInvIniAlmacen1783475286915 implements MigrationInterface {
    name = 'FixInvIniAlmacen1783475286915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sucursal_almacen" ADD "inventario_inicial" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sucursal_almacen" DROP COLUMN "inventario_inicial"`);
    }

}
