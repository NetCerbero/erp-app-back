import { MigrationInterface, QueryRunner } from "typeorm";

export class Plancuenta1760304187872 implements MigrationInterface {
    name = 'Plancuenta1760304187872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contabilidad_plan_cuenta" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "codigo" character varying(20) NOT NULL, "cuenta" character varying(255) NOT NULL, "nivel" integer NOT NULL, "es_imputable" boolean NOT NULL DEFAULT false, "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "codigo_analitico" integer, "empresa_id" integer, "cuenta_superior_id" integer, CONSTRAINT "PK_dbd67d4f3b31c3547f7c52d3afa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuario_persona" ADD "tipoIdentificador" integer`);
        await queryRunner.query(`ALTER TABLE "contabilidad_plan_cuenta" ADD CONSTRAINT "FK_628a03760e6857a9ee124030578" FOREIGN KEY ("cuenta_superior_id") REFERENCES "contabilidad_plan_cuenta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contabilidad_plan_cuenta" DROP CONSTRAINT "FK_628a03760e6857a9ee124030578"`);
        await queryRunner.query(`ALTER TABLE "usuario_persona" DROP COLUMN "tipoIdentificador"`);
        await queryRunner.query(`DROP TABLE "contabilidad_plan_cuenta"`);
    }

}
