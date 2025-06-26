import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Captura } from './entities/captura.entity';
import { CapturaService } from './captura.service';
import { CapturaController } from './captura.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Captura])],
  controllers: [CapturaController],
  providers: [CapturaService],
})
export class CapturaModule {}
