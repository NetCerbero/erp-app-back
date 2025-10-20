import { DataSource, Repository } from "typeorm";
import { Pagina } from "../entities/pagina.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PaginaRepository extends Repository<Pagina>{
    constructor(private readonly source:DataSource){super(Pagina,source.createEntityManager())}
}