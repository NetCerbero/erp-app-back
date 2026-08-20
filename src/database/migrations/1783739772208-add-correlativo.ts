import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCorrelativo1783739772208 implements MigrationInterface {
    name = 'AddCorrelativo1783739772208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "codigo_correlativo" ("id" BIGSERIAL NOT NULL, "tipo" integer NOT NULL, "sucursal_id" integer, "prefijo" character varying NOT NULL, "anio" integer NOT NULL, "ultimo" integer NOT NULL, "empresa_id" integer NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_61c0e5f4e60034c76eb1e266083" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "codigo_correlativo" ADD CONSTRAINT "FK_a2816b4307a5e12e42f382afe97" FOREIGN KEY ("empresa_id") REFERENCES "usuario_dominio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "codigo_correlativo" DROP CONSTRAINT "FK_a2816b4307a5e12e42f382afe97"`);
        await queryRunner.query(`DROP TABLE "codigo_correlativo"`);
    }

}
