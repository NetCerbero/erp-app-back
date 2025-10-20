import { BaseMeta, PERFIL } from "../../../core";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "./persona.entity";
import { Concepto } from "../../concepto/entities/concepto.entity";

@Entity("usuario_perfil_persona")
export class PerfilPersona extends BaseMeta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", select: true })
    valor: PERFIL;

    // relacion
    @ManyToOne(() => Concepto, { createForeignKeyConstraints: false })
    @JoinColumn({ name: "valor", referencedColumnName: "value" })
    concepto: Concepto;

    @Column({ name: "persona_id", select: false })
    personaId: number;

    @ManyToOne(() => Persona)
    @JoinColumn({ name: "persona_id" })
    persona: Persona;
}