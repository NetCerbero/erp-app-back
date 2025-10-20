import { DataSource, Repository } from "typeorm";
import { Dominio } from "../entities/dominio.entity";
import { Injectable } from "@nestjs/common";
import { DominioFilterDto } from "../dto/filter-dominio.dto";

@Injectable()
export class DominioRepository extends Repository<Dominio> {
    constructor(private dataSource: DataSource) {
        super(Dominio, dataSource.createEntityManager())
    }

    async findAllByStatusAndVisibility(params: DominioFilterDto) {
        const { estado, esPublico } = params;
        const query = this.createQueryBuilder("e").select()
        estado !== undefined && query.andWhere("e.estado = :estado", { estado })
        esPublico !== undefined && query.andWhere("e.esPublico = :esPublico", { esPublico })
        return await query.orderBy("e.id", params.orden || "DESC").getMany()

    }
}