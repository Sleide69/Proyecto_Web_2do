import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plaga } from './entities/plaga.entity';
import { PlagaService } from './plaga.service';
import { PlagaController } from './plaga.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plaga])],
  controllers: [PlagaController],
  providers: [PlagaService],
})
export class PlagaModule {}
