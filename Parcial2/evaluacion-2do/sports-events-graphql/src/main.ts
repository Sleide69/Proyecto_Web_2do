import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
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

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 API GraphQL para Eventos Deportivos ejecutándose en: http://localhost:${port}/graphql`);
  console.log(`🎮 GraphQL Playground disponible en: http://localhost:${port}/graphql`);
  console.log(`📊 Principales operaciones disponibles:`);
  console.log(`   - Mutation createRace - Crear nueva carrera`);
  console.log(`   - Query availableRaces - Carreras disponibles para registro`);
  console.log(`   - Mutation createRegistration - Registrar competidor en carrera`);
  console.log(`   - Query registration - Obtener resumen de inscripción`);
}

bootstrap();
