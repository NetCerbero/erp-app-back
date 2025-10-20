import { BaseMeta } from "../../../core";
import { Dominio } from "../../dominio/entities/dominio.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Credencial } from "./credencial.entity";
import { Permiso } from "../../permiso/entities/permiso.entity";

@Entity("usuario_acceso_dominio")
export class AccesoDominio extends BaseMeta {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "bool", default: false })
    seleccionado: boolean // cual dominio esta viendo

    @Column({ name:"es_principal", type: "bool", default: false })
    esPrincipal: boolean // si el dominio es el principal

    // relacion
    @Column({ name: "permiso_id", select: false })
    permisoId: number;

    @ManyToOne(() => Permiso)
    @JoinColumn({ name: "permiso_id" })
    permiso: Permiso;


    @Column({ name: "credencial_id", select: false })
    credencialId: number;

    @ManyToOne(() => Credencial)
    @JoinColumn({ name: "credencial_id" })
    credencial: Credencial;

    @Column({ name: "empresa_id", select: false })
    empresaId: number;

    @ManyToOne(() => Dominio)
    @JoinColumn({ name: "empresa_id" })
    empresa: Dominio
}