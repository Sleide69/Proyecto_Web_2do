import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcesamientoIa } from './entities/procesamiento-ia.entity';
import { ProcesamientoIaService } from './procesamiento-ia.service';
import { ProcesamientoIaGateway } from './procesamiento-ia.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ProcesamientoIa])],
  providers: [ProcesamientoIaService, ProcesamientoIaGateway],
})
export class ProcesamientoIaModule {}
