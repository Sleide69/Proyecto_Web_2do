"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
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
//# sourceMappingURL=main.js.map