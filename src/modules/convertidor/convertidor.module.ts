import { Module } from '@nestjs/common';
import { ConvertidorService } from './convertidor.service';

@Module({
  exports: [ConvertidorService],
})
export class ConvertidorModule {}
