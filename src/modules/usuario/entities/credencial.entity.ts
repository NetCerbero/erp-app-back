import { BaseMeta, ESTADO, ESTRATEGIA_SESION } from "../../../core";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Permiso } from "../../permiso/entities/permiso.entity";
import { AccesoDominio } from "./acceso-dominio.entity";
import { Persona } from "./persona.entity";

@Entity("usuario_credencial")
@Unique("credencial", ["usuario", "identificador", "estrategia"])
export class Credencial extends BaseMeta {
    @PrimaryGeneratedColumn({type:"bigint"})
    id: number;

    @Column({ type: "varchar", length: 200, select: false })
    usuario: string;

    @Column({ type: "varchar", length: 255, nullable: true, select: false })
    password: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    identificador: string;

    @Column({ type: "varchar", length: 100, default: ESTRATEGIA_SESION.NORMAL })
    estrategia?: ESTRATEGIA_SESION;

    @Column({ type: "smallint", default: ESTADO.ACTIVO })
    estado?: ESTADO

    // relaciones
    @Column({ name: "persona_id" })
    personaId: number;

    @OneToOne(() => Persona, c => c.credencial)
    @JoinColumn({ name: "persona_id" })
    persona: Persona;

    @OneToMany(() => AccesoDominio, d => d.credencial, { cascade: true })
    dominios: AccesoDominio[]
}
