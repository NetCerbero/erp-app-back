import { BaseMeta, ESTADO } from "../../../core";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("ubicacion")
export class Ubicacion extends BaseMeta {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column({ type: "varchar", length: 255 })
    nombre: string

    @Column({ type: "varchar", length: 20 })
    abreviatura: string

    @Column({ type: "bool", name: "es_publico", default: true })
    esPublico: boolean

    @Column({ type: "smallint", default: ESTADO.ACTIVO })
    estado: ESTADO

    // Relacion

    @OneToMany(() => Ubicacion, u => u.padre)
    hijos: Ubicacion[]

    @Column({ name: "padre_id", nullable: true })
    padreId: number

    @ManyToOne(() => Ubicacion, { nullable: true })
    @JoinColumn({ name: "padre_id" })
    padre: Ubicacion
}
