import { DataSource, Repository } from "typeorm";
import { Persona } from "../entities/persona.entity";
import { Injectable } from "@nestjs/common";
import { CATEGORIA } from "src/core";

@Injectable()
export class PersonaRepository extends Repository<Persona> {
    constructor(private readonly data: DataSource) {
        super(Persona, data.createEntityManager())
    }

    async listAllRel(dominioIds: number[]) {
        if (dominioIds.length === 0) return []
        return await this.createQueryBuilder("p")
            .select()
            .addSelect("c.usuario")
            .leftJoinAndSelect("p.credencial", "c")
            .leftJoinAndSelect("c.dominios", "d","d.empresaId in (:...empresaIds)",{empresaIds:dominioIds})
            .leftJoinAndSelect("d.permiso", "cp")
            .leftJoinAndSelect("p.sucursal", "s")
            .leftJoinAndSelect("s.ubicacion", "su")
            .where("p.empresaId in (:...dominioIds)", { dominioIds: dominioIds })
            .orderBy("p.createdAt", "DESC")
            .getMany()
    }

    async getAllRelById(id: number) {
        const query = this.createQueryBuilder("p")
            .select()
            .addSelect("c.usuario")
            .leftJoinAndSelect("p.credencial", "c")
            .leftJoinAndSelect("p.empresa", "pe")
            .leftJoinAndSelect("c.dominios", "d")
            .leftJoinAndSelect("d.empresa", "e")
            //.leftJoinAndSelect("p.perfiles", "pp")
            .leftJoinAndSelect("d.permiso", "cp")
            .leftJoinAndSelect("cp.acciones", "cpa")
            .where("c.id = :id", { id })

        return await query.getOne()
    }
}