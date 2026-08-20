import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accion } from "./accion.entity";
import { Modulo } from "./modulo.entity";
import { ESTADO } from "../../../core";

@Entity("permiso_pagina")
export class Pagina extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    nombre: string

    @Column({ type: "varchar", length: 100, nullable: true })
    icono?: string

    @Column({ type: "text" })
    url: string

    @Column({ type: "int", default: 1 })
    orden: number

    @Column({ type: "smallint", default: ESTADO.ACTIVO })
    estado: ESTADO

    @Column({ type: "bool", name: "visible_en_menu", default: false })
    visibleEnMenu: boolean // si es visible en el menu

    @OneToMany(() => Accion, a => a.pagina, { cascade: true, onDelete: "CASCADE" })
    acciones: Accion[]

    @Column({ name: "modulo_id" })
    moduloId: number;

    @ManyToOne(() => Modulo, m => m.paginas)
    @JoinColumn({ name: "modulo_id" })
    modulo: Modulo
}