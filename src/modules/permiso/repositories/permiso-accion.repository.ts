import { DataSource, Repository } from "typeorm";
import { PermisoAccion } from "../entities/permiso-accion.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermisoAccionRepository extends Repository<PermisoAccion>{
    constructor(private readonly source:DataSource){super(PermisoAccion,source.createEntityManager())}
}