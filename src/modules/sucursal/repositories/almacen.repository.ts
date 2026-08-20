import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Almacen } from "../entities/almacen.entity";

@Injectable()
export class AlmacenRepository extends Repository<Almacen> {
    constructor(private readonly source: DataSource) { super(Almacen, source.createEntityManager()) }
}