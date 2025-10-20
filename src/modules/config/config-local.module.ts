import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigLocal } from "./entities/config-local.entity";
import { ConfigLocalRepository } from "./repositories/config-local.repository";
import { ConfigLocalService } from "./config-local.service";

@Module({
    imports: [TypeOrmModule.forFeature([ConfigLocal])],
    providers: [ConfigLocalRepository, ConfigLocalService],
    exports: [ConfigLocalService]
})
export class ConfigLocalModule { }