import { Injectable } from "@nestjs/common";
import { InventarioDocumento } from "../entities/inventario-documento.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class InventarioDocumentoRepository extends Repository<InventarioDocumento> {
  constructor(private readonly source: DataSource) {
    super(InventarioDocumento, source.createEntityManager());
  }
}
