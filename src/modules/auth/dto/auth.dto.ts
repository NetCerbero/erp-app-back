import { IsDefined, IsString, MaxLength } from "class-validator";

export class AuthDto {
    @IsDefined()
    @IsString()
    @MaxLength(200)
    usuario: string;

    @IsDefined()
    @IsString()
    @MaxLength(255)
    password: string;
}