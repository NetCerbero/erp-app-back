import { DataSource, Repository } from "typeorm";
import { Concepto } from "../entities/concepto.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConceptoRepository extends Repository<Concepto> {
    constructor(private readonly data: DataSource) {
        super(Concepto, data.createEntityManager())
    }

    async truncate() {
        const metaDato = this.manager.connection.getMetadata(Concepto)
        await this.manager.query(`TRUNCATE ${metaDato.tableName} RESTART IDENTITY`)
    }
}