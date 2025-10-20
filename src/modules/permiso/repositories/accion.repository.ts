import { DataSource, Repository } from "typeorm";
import { Accion } from "../entities/accion.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccionRepository extends Repository<Accion>{
    constructor(private readonly source:DataSource){super(Accion,source.createEntityManager())}
}