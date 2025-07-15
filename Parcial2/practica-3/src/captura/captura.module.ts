import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Captura } from './entities/captura.entity';
import { CapturaService } from './captura.service';
import { CapturaGateway } from './captura.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Captura])],
  providers: [CapturaService, CapturaGateway],
})
export class CapturaModule {}
