import { BaseMeta, ESTADO } from "../../../core";
import { Ubicacion } from "../../ubicacion/entities/ubicacion.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("sucursal")
export class Sucursal extends BaseMeta {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number

    @Column({ type: "varchar", length: 255 })
    identificador: string

    @Column({ type: "varchar", length: 255, nullable: true })
    direccion: string

    @Column({ type: "varchar", length: 50, nullable: true })
    contacto: string

    @Column({ type: "varchar", length: 10, nullable: true })
    codigo: string

    @Column({type:"varchar",length:10,default:ESTADO.ACTIVO})
    estado:ESTADO

    // @Column({ type: "boolean", default: true })
    // esPublico: boolean

    @Column({ type: "int", name: "empresa_id" })
    empresaId: number

    // Relacion

    @Column({ name: "ubicacion_id" })
    ubicacionId: number

    @ManyToOne(() => Ubicacion)
    @JoinColumn({ name: "ubicacion_id" })
    ubicacion: Ubicacion
}
