import { Module } from '@nestjs/common';
import { CiudadanosModule } from './ciudadanos/ciudadanos.module';

@Module({
  imports: [CiudadanosModule],
})
export class AppModule {}
