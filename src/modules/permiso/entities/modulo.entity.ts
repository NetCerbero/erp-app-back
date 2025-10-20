import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pagina } from "./pagina.entity"
import { ESTADO } from "../../../core";

@Entity("permiso_modulo")
export class Modulo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 200 })
    nombre: string

    @Column({ type: "int", default: 1 })
    orden: number

    @Column({ type: "varchar", length: 10, default: ESTADO.ACTIVO })
    estado: ESTADO

    @Column({ type: "bool", name: "mostrar_en_menu", default: true })
    mostrarEnMenu: boolean

    @Column({ type: "varchar", length: 100, nullable: true })
    icono?: string

    @OneToMany(() => Pagina, p => p.modulo, { cascade: true, onDelete: "CASCADE" })
    paginas: Pagina[]
}