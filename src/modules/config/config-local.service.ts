import { Injectable } from "@nestjs/common";
import { ConfigLocalRepository } from "./repositories/config-local.repository";
import { ConfigLocalKey } from "./enum/config-local.enum";
import { In } from "typeorm";
import { ConfigLocal } from "./entities/config-local.entity";

@Injectable()
export class ConfigLocalService {
    constructor(
        private readonly configRep: ConfigLocalRepository
    ) { }

    async getByKey(key: ConfigLocalKey) {
        return await this.configRep.findOne({ where: { identificador: key } })
    }

    async getByKeys(keys: ConfigLocalKey[]) {
        return await this.configRep.find({ where: { identificador: In(keys) } })
    }

    async getMapByKeys(...keys: ConfigLocalKey[]): Promise<Map<ConfigLocalKey,ConfigLocal>>{
        const map = new Map<ConfigLocalKey,ConfigLocal>();
        const lista= await this.configRep.find({ where: { identificador: In(keys) } })
        lista.forEach(cf => map.set(cf.identificador,cf))
        return map;
    }

    async getList() {
        return await this.configRep.find()
    }
}