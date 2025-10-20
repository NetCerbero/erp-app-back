import { DataSource, Repository } from "typeorm";
import { Credencial } from "../entities/credencial.entity";
import { Injectable } from "@nestjs/common";
import { ESTRATEGIA_SESION } from "src/core";

@Injectable()
export class CredencialRepository extends Repository<Credencial> {
    constructor(private readonly data: DataSource) {
        super(Credencial, data.createEntityManager())
    }

    async findOneByAuth(params: { usuario: string, estrategia: ESTRATEGIA_SESION, identificador?: string, selectPassword?: boolean }) {
        const query = this.createQueryBuilder('c')
            .select()
            .addSelect("c.usuario")
        if (params.selectPassword) {
            query.addSelect("c.password")
        }
        query.innerJoinAndSelect("c.dominios", "dd")
            .innerJoinAndSelect("dd.empresa","d")
            .leftJoinAndSelect("dd.permiso", "cp")
            .leftJoinAndSelect("cp.acciones", "cpa")


        query.where("c.usuario = :usuario", { usuario: params.usuario })
        query.andWhere("c.estrategia = :estrategia", { estrategia: params.estrategia })
        if (params.identificador) {
            query.andWhere("c.identificador = :identificador", { identificador: params.identificador })
        }

        return await query.getOne();
    }

    async userExist(params:{usuario:string, estrategia:ESTRATEGIA_SESION, identificador?:string}){
        const query = this.createQueryBuilder('c')
            .select()

        query.where("c.usuario = :usuario", { usuario: params.usuario })
        query.andWhere("c.estrategia = :estrategia", { estrategia: params.estrategia })
        if (params.identificador) {
            query.andWhere("c.identificador = :identificador", { identificador: params.identificador })
        }
        return await query.getOne();
    }
}