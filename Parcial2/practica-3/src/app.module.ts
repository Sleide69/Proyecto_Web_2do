import { Module } from '@nestjs/common';
import { CapturaModule } from './captura/captura.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { ProcesamientoIaModule } from './procesamiento-ia/procesamiento-ia.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'deteccion.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CapturaModule,
    NotificacionModule,
    ProcesamientoIaModule,
  ],
})
export class AppModule {}
