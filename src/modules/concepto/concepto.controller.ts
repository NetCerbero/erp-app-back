import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ConceptoService } from './concepto.service';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';
import { Auth, IAuth, JwtAuthGuard } from 'src/core';
import { ActionGuard } from 'src/core/guard/action.guard';
import { QueryConcepto } from './dto/query-concepto.dto';

@Controller({version:"1",path:'concepto'})
@UseGuards(JwtAuthGuard,ActionGuard)
export class ConceptoController {
  constructor(private readonly conceptoService: ConceptoService) {}

  @Post()
  create(@Body() createConceptoDto: CreateConceptoDto) {
    return this.conceptoService.create(createConceptoDto);
  }

  @Get()
  findAll(
    @Auth() auth:IAuth,
    @Query() filtro:QueryConcepto
  ) {
    return this.conceptoService.findAll(auth,filtro);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conceptoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConceptoDto: UpdateConceptoDto) {
    return this.conceptoService.update(+id, updateConceptoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conceptoService.remove(+id);
  }
}
