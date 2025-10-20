import { Expose, Type } from "class-transformer"
import { EmpresaRspDto } from "src/modules/dominio/dto/dominio.rsp.dto"
import { AccionRspDto, MenuRspDto, PermisoRspDto } from "src/modules/permiso/dto/permiso.rsp.dto"
import { SucursalRspDto } from "src/modules/sucursal/dto/sucursal.rsp.dto"
import { AccesoGrupoRspDto, DominioRspDto, PerfilPersonaRspDto } from "src/modules/usuario/dto"





export class PermisoAccionRspDto extends PermisoRspDto {
    @Expose()
    @Type(() => AccionRspDto)
    acciones: AccionRspDto[]
}

export class WhoamiRspDto {
    @Expose()
    id: string
    @Expose()
    alias: string
    @Expose()
    nombreCompleto: string

    @Expose()
    @Type(() => PerfilPersonaRspDto)
    perfiles: PerfilPersonaRspDto[]

    @Expose()
    @Type(() => EmpresaRspDto)
    empresa: EmpresaRspDto

    @Expose()
    @Type(() => DominioRspDto)
    dominios: DominioRspDto[]

    @Expose()
    @Type(() => SucursalRspDto)
    sucursal: SucursalRspDto

    @Expose()
    @Type(() => PermisoAccionRspDto)
    permiso: PermisoAccionRspDto

    @Expose()
    @Type(() => MenuRspDto)
    menu: MenuRspDto[]
    
}


