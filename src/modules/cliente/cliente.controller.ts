import { Controller, UseGuards } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { JwtAuthGuard } from "src/core";
import { ActionGuard } from "src/core/guard/action.guard";

@Controller({version:"1", path:"cliente"})
@UseGuards(JwtAuthGuard,ActionGuard)
export class ClienteController{
    constructor(
        private readonly clienteSrv: ClienteService
    ){}
}