import { Controller, Get, Post, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Auth, Authorization, IAuth, IAuthTokenJwt, IpAddress, IRefreshTokenJwt, JwtAuthGuard, JwtRefreshGuard, Public, UserAgent } from 'src/core';

@Controller({ version: "1", path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() data: AuthDto, @UserAgent() userAgent, @IpAddress() ip) {
    return this.authService.login(data, userAgent, ip)
  }

  @Post("/list")
  @UseGuards(JwtAuthGuard)
  listaTest(@Auth() data: IAuthTokenJwt) {
    return data
  }

  @UseGuards(JwtRefreshGuard)
  @Post("/refresh")
  refresh(@Auth() data: IRefreshTokenJwt, @Authorization() token: string) {
    return this.authService.refresh(data, token)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/whoami")
  whoami(
    @Auth() auth: IAuth
  ) {
    return this.authService.whoami(auth)
  }

  @Post("/logout")
  @UseGuards(JwtRefreshGuard)
  logout(@Auth() data: IAuthTokenJwt, @Authorization() token: string) {
    return this.authService.logout(data, token)
  }


  // EMPRESA
  @UseGuards(JwtAuthGuard)
  @Get("dominio")
  listDomain(@Auth() auth: IAuth) {
    return this.authService.getListDomain(auth)
  }

  @UseGuards(JwtAuthGuard)
  @Post("/dominio/seleccion/:domain")
  selectedDomain(@Auth() auth: IAuth, @Param("domain", ParseIntPipe) domain: number) {
    return this.authService.selectedDomain(auth, domain)
  }
}
