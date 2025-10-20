import { ACCION, BaseMeta, ESTADO } from "../../../core";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permiso } from "./permiso.entity";
import { Concepto } from "../../concepto/entities/concepto.entity";

@Entity("permiso_usuario_accion")
export class PermisoAccion extends BaseMeta {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "int" })
    accion: ACCION;

    @Column({name:"permiso_id"})
    permisoId:number;
    
    @ManyToOne(()=>Permiso)
    @JoinColumn({name:"permiso_id"})
    permiso:Permiso

    @ManyToOne(() => Concepto, { createForeignKeyConstraints: false })
    @JoinColumn({ name: "accion", referencedColumnName: "value" })
    concepto: Concepto;

}