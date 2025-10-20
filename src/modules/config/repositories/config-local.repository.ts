import { DataSource, Repository } from "typeorm";
import { ConfigLocal } from "../entities/config-local.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigLocalRepository extends Repository<ConfigLocal> {
    constructor(
        private readonly source: DataSource
    ) { super(ConfigLocal, source.createEntityManager()) }
}