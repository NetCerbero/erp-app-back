import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1760151676236 implements MigrationInterface {
    name = 'Init1760151676236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "concepto" ("id" SERIAL NOT NULL, "enum" integer NOT NULL, "value" integer NOT NULL, "concepto" character varying(150) NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "concept_pk" UNIQUE ("enum", "value"), CONSTRAINT "PK_58128f6ae7c9aba37e8b54777e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permiso_usuario_accion" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "accion" integer NOT NULL, "permiso_id" integer NOT NULL, CONSTRAINT "PK_dd1411e4928f7efc1a63df38c5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permiso_usuario" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "es_editable" boolean NOT NULL DEFAULT true, "empresa_id" integer, CONSTRAINT "PK_2dbc10cd1eaf27589977d522c34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_dominio" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "alias" character varying(200), "razon_social" character varying(200) NOT NULL, "identificador" character varying(20) NOT NULL, "codigo_pais" integer, "celular" integer, "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "logo" text, "es_publico" boolean NOT NULL DEFAULT false, "permiso_id" integer, CONSTRAINT "PK_1e2cac5f2722e25e395c830cc3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_acceso_dominio" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "seleccionado" boolean NOT NULL DEFAULT false, "es_principal" boolean NOT NULL DEFAULT false, "permiso_id" integer NOT NULL, "credencial_id" uuid NOT NULL, "empresa_id" integer NOT NULL, CONSTRAINT "PK_63b10cfa943eadca3c60324b57a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_credencial" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario" character varying(200) NOT NULL, "password" character varying(255), "identificador" character varying(100), "estrategia" character varying(100) NOT NULL DEFAULT 'NORMAL', "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "persona_id" uuid NOT NULL, CONSTRAINT "credencial" UNIQUE ("usuario", "identificador", "estrategia"), CONSTRAINT "REL_9a3d2a3b15117fe26021ec6a3b" UNIQUE ("persona_id"), CONSTRAINT "PK_b5d2e045734db593f7b8792442e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ubicacion" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "abreviatura" character varying(20) NOT NULL, "es_publico" boolean NOT NULL DEFAULT true, "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "padre_id" bigint, CONSTRAINT "PK_6ed79468fe4f565d8be642742a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sucursal" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" BIGSERIAL NOT NULL, "identificador" character varying(255) NOT NULL, "direccion" character varying(255), "contacto" character varying(50), "codigo" character varying(10), "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "empresa_id" integer NOT NULL, "ubicacion_id" bigint NOT NULL, CONSTRAINT "PK_a3817e81fd6972dd2172d9c4e60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_persona" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alias" character varying(100), "nombre_completo" character varying(200) NOT NULL, "identificador" character varying(20), "codigo_pais" character varying(5), "celular" integer, "es_visible" boolean NOT NULL DEFAULT true, "sucursal_id" bigint, "empresa_id" integer NOT NULL, CONSTRAINT "PK_c9d223fa9cc0ea30abcd9d5ca7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_perfil_persona" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "valor" integer NOT NULL, "persona_id" uuid NOT NULL, CONSTRAINT "PK_3cda7204797a2976d2771ef09df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_acceso_sesion" ("created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refresh_token" text, "user_agent" text, "ip" character varying(40), "credencial_id" uuid NOT NULL, CONSTRAINT "PK_3f14bb67447249eaebfe0c8a7d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permiso_accion" ("id" SERIAL NOT NULL, "accion" integer NOT NULL, "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "pagina_id" integer NOT NULL, CONSTRAINT "PK_da51b1302253e1c93caf85bfc69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permiso_modulo" ("id" SERIAL NOT NULL, "nombre" character varying(200) NOT NULL, "orden" integer NOT NULL DEFAULT '1', "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "mostrar_en_menu" boolean NOT NULL DEFAULT true, "icono" character varying(100), CONSTRAINT "PK_480943d7836479804f8ba3ff3cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permiso_pagina" ("id" SERIAL NOT NULL, "nombre" character varying(200) NOT NULL, "icono" character varying(100), "url" text NOT NULL, "orden" integer NOT NULL DEFAULT '1', "estado" character varying(10) NOT NULL DEFAULT 'ACTIVO', "visible_en_menu" boolean NOT NULL DEFAULT false, "modulo_id" integer NOT NULL, CONSTRAINT "PK_268cd04056725329bbb05439d13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "config" ("identificador" character varying(50) NOT NULL, "valor" character varying(50) NOT NULL, "vencimiento" TIMESTAMP, CONSTRAINT "PK_c5180060205dfd4d055c6f7fefe" PRIMARY KEY ("identificador"))`);
        await queryRunner.query(`ALTER TABLE "permiso_usuario_accion" ADD CONSTRAINT "FK_ebdeb8a48837074d99964a8a026" FOREIGN KEY ("permiso_id") REFERENCES "permiso_usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_dominio" ADD CONSTRAINT "FK_56c2ac33bee23902e6cfe4d9f38" FOREIGN KEY ("permiso_id") REFERENCES "permiso_usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_acceso_dominio" ADD CONSTRAINT "FK_471bb0aadc7a2355f67cd33f07b" FOREIGN KEY ("permiso_id") REFERENCES "permiso_usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_acceso_dominio" ADD CONSTRAINT "FK_769aa7251b8c2f30100367b66d0" FOREIGN KEY ("credencial_id") REFERENCES "usuario_credencial"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_acceso_dominio" ADD CONSTRAINT "FK_6286c9a04b10321969bee4b1bf7" FOREIGN KEY ("empresa_id") REFERENCES "usuario_dominio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_credencial" ADD CONSTRAINT "FK_9a3d2a3b15117fe26021ec6a3ba" FOREIGN KEY ("persona_id") REFERENCES "usuario_persona"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ubicacion" ADD CONSTRAINT "FK_5e1c37570ade0b170cf7546b1cd" FOREIGN KEY ("padre_id") REFERENCES "ubicacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sucursal" ADD CONSTRAINT "FK_1483786c2062072f05d878ad6cd" FOREIGN KEY ("ubicacion_id") REFERENCES "ubicacion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_persona" ADD CONSTRAINT "FK_308e348932d50cb3343f98c9c09" FOREIGN KEY ("sucursal_id") REFERENCES "sucursal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_persona" ADD CONSTRAINT "FK_07f17236d08d4a691475e350edb" FOREIGN KEY ("empresa_id") REFERENCES "usuario_dominio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_perfil_persona" ADD CONSTRAINT "FK_a390eeee28abbff37054b22d0b1" FOREIGN KEY ("persona_id") REFERENCES "usuario_persona"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permiso_accion" ADD CONSTRAINT "FK_3159fe1973e3beedba95434a965" FOREIGN KEY ("pagina_id") REFERENCES "permiso_pagina"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permiso_pagina" ADD CONSTRAINT "FK_4047dfb5ed32a8eaa25467a3cbd" FOREIGN KEY ("modulo_id") REFERENCES "permiso_modulo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permiso_pagina" DROP CONSTRAINT "FK_4047dfb5ed32a8eaa25467a3cbd"`);
        await queryRunner.query(`ALTER TABLE "permiso_accion" DROP CONSTRAINT "FK_3159fe1973e3beedba95434a965"`);
        await queryRunner.query(`ALTER TABLE "usuario_perfil_persona" DROP CONSTRAINT "FK_a390eeee28abbff37054b22d0b1"`);
        await queryRunner.query(`ALTER TABLE "usuario_persona" DROP CONSTRAINT "FK_07f17236d08d4a691475e350edb"`);
        await queryRunner.query(`ALTER TABLE "usuario_persona" DROP CONSTRAINT "FK_308e348932d50cb3343f98c9c09"`);
        await queryRunner.query(`ALTER TABLE "sucursal" DROP CONSTRAINT "FK_1483786c2062072f05d878ad6cd"`);
        await queryRunner.query(`ALTER TABLE "ubicacion" DROP CONSTRAINT "FK_5e1c37570ade0b170cf7546b1cd"`);
        await queryRunner.query(`ALTER TABLE "usuario_credencial" DROP CONSTRAINT "FK_9a3d2a3b15117fe26021ec6a3ba"`);
        await queryRunner.query(`ALTER TABLE "usuario_acceso_dominio" DROP CONSTRAINT "FK_6286c9a04b10321969bee4b1bf7"`);
        await queryRunner.query(`ALTER TABLE "usuario_acceso_dominio" DROP CONSTRAINT "FK_769aa7251b8c2f30100367b66d0"`);
        await queryRunner.query(`ALTER TABLE "usuario_acceso_dominio" DROP CONSTRAINT "FK_471bb0aadc7a2355f67cd33f07b"`);
        await queryRunner.query(`ALTER TABLE "usuario_dominio" DROP CONSTRAINT "FK_56c2ac33bee23902e6cfe4d9f38"`);
        await queryRunner.query(`ALTER TABLE "permiso_usuario_accion" DROP CONSTRAINT "FK_ebdeb8a48837074d99964a8a026"`);
        await queryRunner.query(`DROP TABLE "config"`);
        await queryRunner.query(`DROP TABLE "permiso_pagina"`);
        await queryRunner.query(`DROP TABLE "permiso_modulo"`);
        await queryRunner.query(`DROP TABLE "permiso_accion"`);
        await queryRunner.query(`DROP TABLE "usuario_acceso_sesion"`);
        await queryRunner.query(`DROP TABLE "usuario_perfil_persona"`);
        await queryRunner.query(`DROP TABLE "usuario_persona"`);
        await queryRunner.query(`DROP TABLE "sucursal"`);
        await queryRunner.query(`DROP TABLE "ubicacion"`);
        await queryRunner.query(`DROP TABLE "usuario_credencial"`);
        await queryRunner.query(`DROP TABLE "usuario_acceso_dominio"`);
        await queryRunner.query(`DROP TABLE "usuario_dominio"`);
        await queryRunner.query(`DROP TABLE "permiso_usuario"`);
        await queryRunner.query(`DROP TABLE "permiso_usuario_accion"`);
        await queryRunner.query(`DROP TABLE "concepto"`);
    }

}
