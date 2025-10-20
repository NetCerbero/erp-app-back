import { DataSource, Repository } from "typeorm";
import { AccesoSesion } from "../entities/acceso-sesion.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccesoSessionRepository extends Repository<AccesoSesion>{
    constructor(private readonly source:DataSource){
        super(AccesoSesion,source.createEntityManager())
    }
}