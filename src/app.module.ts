import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from './core';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { DominioModule } from './modules/dominio/dominio.module';
import { SucursalModule } from './modules/sucursal/sucursal.module';
import { ConceptoModule } from './modules/concepto/concepto.module';
import { ContabilidadModule } from './modules/contabilidad/contabilidad.module';
import { UbicacionModule } from './modules/ubicacion/ubicacion.module';
import { ProductoModule } from './modules/producto/producto.module';
import { ArchivoModule } from './modules/archivo/archivo.module';
import { CompraModule } from './modules/compra/compra.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { CodigoCorrelativoModule } from './modules/codigo-correlativo/codigo-correlativo.module';
import { UnidadMedidaModule } from './modules/unidad-medida/unidad-medida.module';
import { ProveedorModule } from './modules/proveedor/proveedor.module';
import { TasaCambioModule } from './modules/tasa-cambio/tasa-cambio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    DominioModule,
    SucursalModule,
    ConceptoModule,
    ContabilidadModule,
    UbicacionModule,
    ProductoModule,
    ArchivoModule,
    CompraModule,
    InventarioModule,
    CodigoCorrelativoModule,
    UnidadMedidaModule,
    ProveedorModule,
    TasaCambioModule,
  ],
})
export class AppModule {
  static port: number | string;
  static allowedOrigins: string[];
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT) || 8080;
    AppModule.allowedOrigins = [
      ...this._configService.get(Configuration.OTHER_URL).split(','),
    ];
  }
}
