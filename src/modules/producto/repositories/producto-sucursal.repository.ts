import { DataSource, Repository } from "typeorm";
import { ProductoSucursal } from "../entities/producto-sucursal.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductoSucursalRepository extends Repository<ProductoSucursal>{
    constructor(private readonly source: DataSource) { super(ProductoSucursal, source.createEntityManager()) }
}