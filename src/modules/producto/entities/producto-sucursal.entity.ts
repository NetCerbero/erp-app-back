import { BaseMeta, ESTADO } from "../../../core";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Sucursal } from "../../sucursal/entities/sucursal.entity";

@Entity("producto_sucursal")
export class ProductoSucursal extends BaseMeta {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number
   
    @Column({ name: "producto_id" })
    productoId: number

    @ManyToOne(() => Producto, p => p.disponiblesEn)
    @JoinColumn(({ name: "producto_id" }))
    producto: Producto


    @Column({ name: "sucursal_id" })
    sucursalId: number

    @ManyToOne(() => Sucursal)
    @JoinColumn(({ name: "sucursal_id" }))
    sucursal: Sucursal
}