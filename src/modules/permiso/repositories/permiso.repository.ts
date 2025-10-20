import { DataSource, Repository } from "typeorm";
import { Permiso } from "../entities/permiso.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermisoRepository extends Repository<Permiso>{
    constructor(private readonly source:DataSource){super(Permiso,source.createEntityManager())}
}