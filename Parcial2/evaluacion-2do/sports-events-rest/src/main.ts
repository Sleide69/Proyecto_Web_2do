import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Habilitar CORS
  app.enableCors();

  // Configurar prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Sports Events API')
    .setDescription('API REST para gestión de eventos deportivos')
    .setVersion('1.0')
    .addTag('races', 'Gestión de carreras deportivas')
    .addTag('competitors', 'Gestión de competidores')
    .addTag('registrations', 'Gestión de inscripciones')
    .addTag('payments', 'Gestión de pagos')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 API REST para Eventos Deportivos ejecutándose en: http://localhost:${port}/api`);
  console.log(`📖 Documentación Swagger disponible en: http://localhost:${port}/docs`);
  console.log(`📚 Endpoints disponibles:`);
  console.log(`   - GET  /api/races - Listar carreras`);
  console.log(`   - POST /api/races - Crear nueva carrera`);
  console.log(`   - GET  /api/races/available - Carreras disponibles para registro`);
  console.log(`   - POST /api/registrations - Registrar competidor en carrera`);
  console.log(`   - GET  /api/registrations/:id/summary - Resumen de inscripción`);
}

bootstrap();
