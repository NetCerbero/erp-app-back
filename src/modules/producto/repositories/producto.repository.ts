import { DataSource, Repository } from "typeorm";
import { Producto } from "../entities/producto.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductoRepository extends Repository<Producto> {
    constructor(private readonly source: DataSource) { super(Producto, source.createEntityManager()) }
}