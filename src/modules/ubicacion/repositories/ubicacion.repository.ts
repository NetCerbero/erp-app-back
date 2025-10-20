import { DataSource, Repository } from "typeorm";
import { Ubicacion } from "../entities/ubicacion.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UbicacionRepository extends Repository<Ubicacion>{
    constructor(private readonly source:DataSource){super(Ubicacion,source.createEntityManager())}
}