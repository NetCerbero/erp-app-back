import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import {
  ACCION,
  Actions,
  Auth,
  IAuth,
  JwtAuthGuard,
  QueryListDto,
} from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';

@Controller({ version: '1', path: 'producto' })
@UseGuards(JwtAuthGuard, ActionGuard)
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @Actions(ACCION.CREAR_PRODUCTO)
  create(@Auth() auth: IAuth, @Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(auth, createProductoDto);
  }

  @Get()
  @Actions(ACCION.LISTAR_PRODUCTO)
  findAll(@Auth() auth: IAuth, @Query() filtro: QueryListDto) {
    return this.productoService.findAll(auth, filtro);
  }

  @Get(':id')
  @Actions(ACCION.LISTAR_PRODUCTO)
  findOne(@Auth() auth: IAuth, @Param('id') id: string) {
    return this.productoService.findOne(auth, +id);
  }

  @Patch(':id')
  @Actions(ACCION.EDITAR_PRODUCTO)
  update(
    @Auth() auth: IAuth,
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productoService.update(auth, +id, updateProductoDto);
  }

  @Delete(':id')
  @Actions(ACCION.ELIMINAR_PRODUCTO)
  remove(@Auth() auth: IAuth, @Param('id') id: string) {
    return this.productoService.remove(auth, +id);
  }

  @Get('listar/item-compra')
  @Actions(ACCION.LISTAR_PRODUCTO)
  listarProductoCompra(@Auth() auth: IAuth) {
    return this.productoService.listarProductoCompra(auth);
  }

  @Get('listar/item-operacion')
  listarProductoOperacion(@Auth() auth: IAuth) {
    return this.productoService.listarProductoOperacion(auth);
  }

  @Get('listar/item-punto-venta/:sucursalId/:almacenId')
  listarProductoPuntoVenta(
    @Auth() auth: IAuth,
    @Param("sucursalId", new ParseIntPipe()) sucursalId: number,
    @Param("almacenId", new ParseIntPipe()) almacenId: number
  ) {
    return this.productoService.listarProductoPuntoVenta(auth, sucursalId, almacenId);
  }
}
