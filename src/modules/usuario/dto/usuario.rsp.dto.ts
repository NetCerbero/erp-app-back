import { Exclude, Expose, Transform, Type } from "class-transformer"
import { EmpresaRspDto } from "../../dominio/dto/dominio.rsp.dto"
import { PermisoRspDto } from "../../permiso/dto/permiso.rsp.dto"
import { SucursalRspDto } from "src/modules/sucursal/dto/sucursal.rsp.dto"
import { ESTADO, PERFIL } from "src/core"




export class GrupoRspDto {
    @Expose()
    id: number
    @Expose()
    nombre: string
    @Expose()
    color: any
    @Expose()
    estado:ESTADO
    @Expose()
    porDefecto: boolean
    @Exclude()
    empresaId?: number
    @Expose()
    @Transform(({ obj }) => !obj.empresaId) // Transformación basada en el valor de empresaId
    esGlobal: boolean;
    @Expose()
    @Type(()=> EmpresaRspDto)
    empresa:EmpresaRspDto
}

export class DominioRspDto {
    @Expose()
    id: number
    
    @Expose()
    seleccionado: boolean

    @Expose()
    esPrincipal: boolean
    
    @Expose()
    @Type(() => EmpresaRspDto)
    empresa: EmpresaRspDto

    @Expose()
    @Type(() => PermisoRspDto)
    permiso: PermisoRspDto
}

export class ConceptoRpsDto {
    @Expose()
    id: number
    @Expose()
    enum: number
    @Expose()
    value: number
    @Expose()
    concepto: string
    @Expose()
    activo: boolean
}

export class PerfilPersonaRspDto {
    @Expose()
    id: number
    @Expose()
    valor: PERFIL
    @Expose()
    @Type(() => ConceptoRpsDto)
    concepto: ConceptoRpsDto
}

export class AccesoGrupoRspDto {
    @Expose()
    id: number
    @Expose()
    @Type(() => GrupoRspDto)
    grupo: GrupoRspDto
}

export class CredencialRspDto {
    @Expose()
    id: string
    @Expose()
    estrategia: string
    @Expose()
    usuario: string;
    @Expose()
    estado: string
    //@Expose()
    // @Type(() => AccesoGrupoRspDto)
    // grupos: AccesoGrupoRspDto[]
    @Expose()
    @Type(() => DominioRspDto)
    dominios: DominioRspDto[]
}

export class UsuarioRspDto {
    @Expose()
    createdAt: string
    @Expose()
    id: string
    @Expose()
    alias: string
    @Expose()
    nombreCompleto: string
    @Expose()
    identificador: any
    @Expose()
    codigoPais: any
    @Expose()
    celular: any
    @Expose()
    fechaNacimiento: any
    @Expose()
    esGlobal: boolean
    @Expose()
    @Type(() => EmpresaRspDto)
    empresa: EmpresaRspDto
    @Expose()
    @Type(() => CredencialRspDto)
    credencial: CredencialRspDto
    @Expose()
    @Type(() => PerfilPersonaRspDto)
    perfiles: PerfilPersonaRspDto[]
    @Expose()
    sucursalId: number
    @Expose()
    @Type(() => SucursalRspDto)
    sucursal: SucursalRspDto

}
