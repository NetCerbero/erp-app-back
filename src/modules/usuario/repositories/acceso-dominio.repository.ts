import { DataSource, Repository } from "typeorm";
import { AccesoDominio } from "../entities/acceso-dominio.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccesoDominoRepository extends Repository<AccesoDominio>{
    constructor(private readonly source:DataSource){super(AccesoDominio,source.createEntityManager())}
}