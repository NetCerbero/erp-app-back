import { Expose } from "class-transformer"

export class EmpresaRspDto {
    @Expose()
    id: number
    @Expose()
    alias: string
    @Expose()
    razonSocial: string
    @Expose()
    estado: string
    @Expose()
    logo: string
}