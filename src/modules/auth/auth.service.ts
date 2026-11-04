import { ConflictException, ForbiddenException, forwardRef, Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ACCION, ESTADO, ESTRATEGIA_SESION, IAuth, IAuthTokenJwt, IRefreshTokenJwt, MSG } from "src/core";
import { CredencialRepository } from "../usuario/repositories/credencial.repository";
import { compare } from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { ConfigLocalService } from "src/modules/config/config-local.service";
import { ConfigLocalKey } from "src/modules/config/enum/config-local.enum";
import { ConfigLocal } from "src/modules/config/entities/config-local.entity";
import { AccesoSesion } from "../usuario/entities/acceso-sesion.entity";
import { AccesoSessionRepository } from "../usuario/repositories/acceso-sesion.repository";
import { Persona } from "../usuario/entities/persona.entity";
import { UsuarioService } from "../usuario/services/usuario.service";
import { AuthDto } from "./dto/auth.dto";
import { PermisoService } from "../permiso/permiso.service";
import { plainToInstance } from "class-transformer";
import { WhoamiRspDto } from "./dto/whoami.rsp.dto";
import { DominioRspDto } from "../usuario/dto";
import { AccesoDominoRepository } from "../usuario/repositories/acceso-dominio.repository";
import { AccesoDominio } from "../usuario/entities/acceso-dominio.entity";
import { ConfigService } from "@nestjs/config";
import { In } from "typeorm";


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsuarioService))
        private readonly usuarioSrv: UsuarioService,
        private readonly credencialRep: CredencialRepository,
        private readonly accessDomainRep: AccesoDominoRepository,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly sesionRep: AccesoSessionRepository,
        private readonly permisoSrv: PermisoService
    ) { }

    async search(params: { usuario: string, estrategia: ESTRATEGIA_SESION, identificador?: string, selectPassword?: boolean }) {
        return await this.credencialRep.findOneByAuth(params)
    }

    async searchLight(params: { usuario: string, estrategia: ESTRATEGIA_SESION, identificador?: string, selectPassword?: boolean }){
        return await this.credencialRep.userExist(params)
    }

    private getConfigMap() {
        const mapKey = new Map<ConfigLocalKey,string>()
        const keys = [
            ConfigLocalKey.ACCESS_TOKEN_TIME,
            ConfigLocalKey.REFRESH_TOKEN_TIME,
            ConfigLocalKey.SECRET_ACCESS_TOKEN,
            ConfigLocalKey.SECRET_REFRESH_TOKEN
        ]
        keys.forEach( key => {
            const value = this.config.get(key)
            mapKey.set(key,value)
        })
        return mapKey
    }

    async validate(payload: IAuthTokenJwt) {
        const [session, authUser] = await Promise.all([
            this.sesionRep.findOne({ where: { id: payload.sesion } }),
            this.usuarioSrv.getAllRelById(payload.id)
        ])
        if (!session || !authUser) throw new UnauthorizedException(MSG.NOT_ACCESS)
        if (authUser.credencial.estado == ESTADO.INACTIVO) throw new UnauthorizedException(MSG.NOT_ACCESS)
        const listDomain = authUser.credencial.dominios.filter(f => f.empresa.estado == ESTADO.ACTIVO);
        if (listDomain.length == 0) throw new UnauthorizedException(MSG.NOT_ACCESS)
        const canAccessDomain = listDomain.some(e => e.empresa.id == payload.dominio);
        if (!canAccessDomain) throw new UnauthorizedException(MSG.NOT_ACCESS)
        const dominioSeleccionado = listDomain.filter(f => f.seleccionado)?.[0]
        if (!dominioSeleccionado) throw new ConflictException(MSG.SELECT_DOMAIN)
        const perfiles = [] //authUser.perfiles.map(p => p.valor)
        const actions = dominioSeleccionado.permiso.acciones || []
        const mapPermisos = new Map<ACCION,boolean>()
        actions.map(a => mapPermisos.set(a.accion,true))
        const auth: IAuth = {
            ...payload,
            dominio: dominioSeleccionado.empresa.id,
            monedaBase: dominioSeleccionado.empresa.monedaBase,
            perfiles,
            accesos: listDomain.map(e => e.empresa.id),
            permisos: mapPermisos, // actions.map(a => a.accion),// [ACCION.CREAR_PERMISO, ACCION.LISTAR_PERMISO, ACCION.EDITAR_PERMISO, ACCION.ELIMINAR_PERMISO]
            // sucursales a las que tiene acceso
            sucursal: authUser.sucursalId,//la que esta registrada por defecto
            sucursales: [authUser.sucursalId]
        }
        //console.log(auth)
        return auth
    }

    private getAccessToken(user: Persona, configServer: Map<ConfigLocalKey, string>, sesion: number) {
        const expiresInAccess = configServer.get(ConfigLocalKey.ACCESS_TOKEN_TIME) || '15m';
        const secretAccess = configServer.get(ConfigLocalKey.SECRET_ACCESS_TOKEN)
        if (!secretAccess) throw new ConflictException(MSG.NOT_FOUND_SECRET)
        const auth: IAuthTokenJwt = {
            id: user.credencial.id,
            estrategia: user.credencial.estrategia!,
            dominio: user.empresaId,
            usuario: user.credencial.usuario,
            nombreCompleto: user.nombreCompleto,
            sesion
        }
        return this.signToken(auth, expiresInAccess, secretAccess);
    }

    private async getRefreshToken(user: Persona, configServer: Map<ConfigLocalKey, string>, other: Partial<AccesoSesion>) {
        const expiresInRefresh = configServer.get(ConfigLocalKey.REFRESH_TOKEN_TIME) || '7d';
        const secretRefresh = configServer.get(ConfigLocalKey.SECRET_REFRESH_TOKEN)
        if (!secretRefresh) throw new ConflictException(MSG.NOT_FOUND_SECRET)
        const refresh: IRefreshTokenJwt = { usuario: user.credencial.usuario, estrategia: user.credencial.estrategia! }
        const refreshToken = this.signToken(refresh, expiresInRefresh, secretRefresh);
        const sesion = await this.createSession({ refreshToken, userAgent: other.userAgent, ip: other.ip, credencialId: user.credencial.id })
        return { refreshToken, sesion }
    }

    private async getAccessAndRefreshToken(user: Persona, userAgent: string, ip: string) {
        const configServer = this.getConfigMap()
        console.log({configServer})
        const auth = await this.getRefreshToken(user, configServer, { userAgent, ip })
        const accessToken = this.getAccessToken(user, configServer, auth.sesion.id)
        return { accessToken, refreshToken: auth.refreshToken }
    }

    private signToken(payload: any, expiresIn: string, secret: string) {
        return this.jwtService.sign(payload, { expiresIn: expiresIn as any, secret });
    }

    private async createSession(params: Partial<AccesoSesion>) {
        return await this.sesionRep.save(params);
    }

    async login(data: AuthDto, userAgent: string, ipAddress: string) {
        try {
            const auth = await this.search({ usuario: data.usuario, estrategia: ESTRATEGIA_SESION.NORMAL, selectPassword: true });
            if (!auth) throw new UnauthorizedException(MSG.NOT_USER_FOUND)
            if (auth.estado === ESTADO.INACTIVO) throw new ForbiddenException(MSG.NOT_USER_AVAILABLE)
            const accesoDominio = auth.dominios.find( d =>  d.seleccionado)
            if (!accesoDominio || accesoDominio?.permiso?.estado === ESTADO.INACTIVO) throw new ForbiddenException(MSG.NOT_AVAILABLE_PERMISSION)
            const persona = await this.usuarioSrv.searchDetailById(auth.personaId!)
            if(!persona) throw new ConflictException(MSG.INVALID_CREDENTIALS)
            if (persona.empresa.estado === ESTADO.INACTIVO) throw new ForbiddenException(MSG.NOT_USER_AVAILABLE)
            persona.credencial = auth
            const isMatch = await compare(data.password, auth.password);
            if (!isMatch) throw new UnauthorizedException(MSG.INVALID_CREDENTIALS);
            persona.credencial = auth
            const [tokens, usuario] = await Promise.all([
                this.getAccessAndRefreshToken(persona, userAgent, ipAddress),
                this.getAuthAndMenu(persona)
            ])
            return { ...tokens, usuario }
        } catch (error) {
            console.log(error)
            Logger.error(error?.message, "LOGIN")
            throw new ConflictException(MSG.INVALID_CREDENTIALS)
        }

    }

    async refresh(param: IRefreshTokenJwt, token: string) {
        const sesion = await this.sesionRep.findOne({ where: { refreshToken: token } })
        console.log({sesion})
        if (!sesion) throw new UnauthorizedException(MSG.NOT_ACCESS)
        const auth = await this.search({ usuario: param.usuario, estrategia: param.estrategia });
        if (!auth) throw new UnauthorizedException(MSG.NOT_USER_FOUND)
        if (auth.estado === ESTADO.INACTIVO) throw new ForbiddenException(MSG.NOT_USER_AVAILABLE)
        const persona = await this.usuarioSrv.searchDetailById(auth.personaId)
        if(!persona) throw new ForbiddenException(MSG.NOT_USER_AVAILABLE)
        if (persona.empresa.estado === ESTADO.INACTIVO) throw new ForbiddenException(MSG.NOT_USER_AVAILABLE)
        persona.credencial = auth
        const configServer = await this.getConfigMap()
        const accessToken = this.getAccessToken(persona, configServer, sesion.id)
        console.log("awqui")
        return { accessToken }
    }

    async logout(params: IRefreshTokenJwt, token: string) {
        const sesion = await this.sesionRep.findOne({ where: { refreshToken: token } })
        if (!sesion) throw new UnauthorizedException(MSG.NOT_ACCESS)
        await this.sesionRep.softDelete(sesion.id)
    }

    async whoami(auth: IAuth) {
        const person = await this.usuarioSrv.getAllRelById(auth.id)
        return await this.getAuthAndMenu(person!)

    }

    private async getAuthAndMenu(persona: Persona) {
        const accesoDominio = persona.credencial.dominios.find( d => d.seleccionado)
        if (!accesoDominio || accesoDominio.permiso.estado !== ESTADO.ACTIVO) throw new ConflictException(MSG.NOT_AVAILABLE_PERMISSION)
        const menu = await this.permisoSrv.getMenuByActions(accesoDominio.permiso.acciones.map(a => a.accion));
        return plainToInstance(WhoamiRspDto, {
            ...persona,
            dominios: persona.credencial.dominios,
            permiso:accesoDominio.permiso,
            menu
        }, { strategy: "excludeAll" })
    }


    async getListDomain(auth: IAuth) {
        const credential = await this.credencialRep.findOne({
            where: {
                usuario: auth.usuario,
                estado: ESTADO.ACTIVO,
                persona: { id: auth.id, empresaId: auth.dominio },
                dominios: {
                    empresa: {
                        estado: ESTADO.ACTIVO
                    }
                }
            },
            order: { id: "DESC" },
            relations: ["dominios", "dominios.empresa"]
        })
        if (!credential) throw new ConflictException(MSG.NOT_AVAILABLE_ACCESS_DOMAIN)
        return plainToInstance(DominioRspDto, credential.dominios, { strategy: "excludeAll" })
    }

    async selectedDomain(auth: IAuth, domain: number) {
        const listAccess = await this.accessDomainRep.find({
            where: {
                credencial: {
                    usuario: auth.usuario,
                    estado: ESTADO.ACTIVO
                }
            }
        })

        const lastSelected = listAccess.find(a => a.seleccionado)
        const listUpdate:AccesoDominio[] = []
        if (lastSelected && lastSelected.id != domain) {
            lastSelected.seleccionado = false
            listUpdate.push(lastSelected)
        }
        
        let selected = false
        const selectedFind = listAccess.find(a => a.id == domain)
        if (selectedFind) {
            selectedFind.seleccionado = true
            listUpdate.push(selectedFind)
            selected = true
        }

        listUpdate.length > 0 && await this.accessDomainRep.save(listUpdate)

        return {selected}
    }

    async listarPorIds( credencialIds:number[]){
        if(credencialIds.length == 0) return []
        return await this.credencialRep.find({
            select:{
                id: true,
                usuario:true,
                persona:{
                    id: true,
                    nombreCompleto:true,
                    alias: true
                }
            },
            where: {
                id: In(credencialIds)
            },
            relations:["persona"]
        })
    }
}