import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";

export class PerfilPersonaDto {
    @IsDefined()
    @IsNumber()
    valor: number;
}

export class AccesoDominioDto {
    @IsOptional()
    @IsBoolean()
    seleccionado?: boolean

    @IsOptional()
    @IsBoolean()
    esPrincipal?:boolean

    @IsDefined()
    @IsNumber()
    empresaId: number

    @IsDefined()
    @IsNumber()
    permisoId: number
}

export class AccesoGrupoDto {
    @IsDefined()
    @IsNumber()
    grupoId: number;
}

export class CredencialDto {
    @IsDefined()
    @MaxLength(200)
    @IsString()
    usuario: string;

    @IsDefined()
    @MaxLength(255)
    @IsString()
    password: string;

    // @Type(() => AccesoGrupoDto)
    // @IsArray()
    // @ArrayMinSize(1)
    // @ValidateNested({each:true})
    // grupos: AccesoGrupoDto[]

    // @Type(() => AccesoDominioDto)
    // @ValidateNested({each:true})
    // @IsArray()
    // @ArrayMinSize(1)
    // dominios: AccesoDominioDto[]
    @IsDefined()
    @IsNumber()
    permisoId: number
}

export class CreateUsuarioDto {
    @IsOptional()
    @MaxLength(100)
    @IsString()
    alias: string

    @IsDefined()
    @MaxLength(200)
    @IsString()
    nombreCompleto: string

    @IsOptional()
    @IsNumber()
    tipoIdentificador?: number

    @IsOptional()
    @MaxLength(20)
    @IsString()
    identificador?: string

    @IsOptional()
    @IsString()
    @MaxLength(5)
    codigoPais?: string

    @IsOptional()
    @IsNumber()
    celular?: number

    @IsOptional()
    @IsDateString()
    fechaNacimiento?: Date

    @IsOptional()
    @IsBoolean()
    esGlobal?: boolean

    @IsDefined()
    @IsNumber()
    sucursalId: number

    @IsOptional()
    @Type(() => CredencialDto)
    @ValidateNested()
    credencial?: CredencialDto

    // @Type(() => PerfilPersonaDto)
    // @IsArray()
    // @ArrayMinSize(1)
    // @ValidateNested({each:true})
    // perfiles: PerfilPersonaDto[]
}
