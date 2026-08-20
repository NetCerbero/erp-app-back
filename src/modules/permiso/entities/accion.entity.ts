import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pagina } from "./pagina.entity";
import { ACCION, ESTADO } from "../../../core";
import { Concepto } from "../../concepto/entities/concepto.entity";

@Entity("permiso_accion")
export class Accion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    accion: ACCION;

    @Column({ type: "smallint", default: ESTADO.ACTIVO })
    estado: ESTADO

    @Column({ name: "pagina_id" })
    paginaId: number;

    @ManyToOne(() => Pagina, p => p.acciones)
    @JoinColumn({ name: "pagina_id" })
    pagina: Pagina

    @ManyToOne(() => Concepto, { createForeignKeyConstraints: false })
    @JoinColumn({ name: "accion", referencedColumnName: "value" })
    concepto: Concepto;
}