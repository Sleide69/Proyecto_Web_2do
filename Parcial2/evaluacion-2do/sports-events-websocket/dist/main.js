"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    });
    const port = process.env.PORT || 3002;
    await app.listen(port);
    console.log(`🚀 Servidor WebSocket para Eventos Deportivos ejecutándose en: http://localhost:${port}`);
    console.log(`📡 WebSocket disponible en: ws://localhost:${port}`);
    console.log(`🔔 Eventos en tiempo real disponibles:`);
    console.log(`   - Nuevas inscripciones en carreras`);
    console.log(`   - Cambios de estado de carreras`);
    console.log(`   - Cancelaciones de inscripciones`);
    console.log(`   - Estadísticas de carreras en tiempo real`);
    console.log(`\n📋 Eventos WebSocket disponibles:`);
    console.log(`   - subscribe-to-race: Suscribirse a una carrera específica`);
    console.log(`   - unsubscribe-from-race: Desuscribirse de una carrera`);
    console.log(`   - get-races-status: Obtener estado actual de todas las carreras`);
    console.log(`\n🎯 Eventos emitidos por el servidor:`);
    console.log(`   - new-registration: Nueva inscripción en carrera`);
    console.log(`   - race-status-changed: Cambio de estado de carrera`);
    console.log(`   - registration-cancelled: Cancelación de inscripción`);
    console.log(`   - global-race-update: Actualizaciones globales de carreras`);
}
bootstrap();
//# sourceMappingURL=main.js.map