import { ESTADO, IAuth } from 'src/core';
import { ProveedorRepository } from './repositories/proveedor.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProveedorService {
  constructor(private readonly proveedorRep: ProveedorRepository) {}

  async listarActivos(auth: IAuth) {
    return await this.proveedorRep.find({
      where: { empresaId: auth.dominio, estado: ESTADO.ACTIVO },
    });
  }
}
