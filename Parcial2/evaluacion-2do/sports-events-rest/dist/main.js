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
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 API REST para Eventos Deportivos ejecutándose en: http://localhost:${port}/api`);
    console.log(`📚 Endpoints disponibles:`);
    console.log(`   - GET  /api/races - Listar carreras`);
    console.log(`   - POST /api/races - Crear nueva carrera`);
    console.log(`   - GET  /api/races/available - Carreras disponibles para registro`);
    console.log(`   - POST /api/registrations - Registrar competidor en carrera`);
    console.log(`   - GET  /api/registrations/:id/summary - Resumen de inscripción`);
}
bootstrap();
//# sourceMappingURL=main.js.map