import { Column, Entity, PrimaryColumn } from "typeorm";
import { ConfigLocalKey } from "../enum/config-local.enum";

@Entity("config")
export class ConfigLocal {
    @PrimaryColumn({ type: "varchar", length: 50 })
    identificador: ConfigLocalKey;

    @Column({ type: "varchar", length: 50 })
    valor: string

    @Column({ type: "timestamp", nullable: true })
    vencimiento: Date
}