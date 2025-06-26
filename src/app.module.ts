import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlagaModule } from './plaga/plaga.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { CapturaModule } from './captura/captura.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PlagaModule,
    NotificacionModule,
    CapturaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}