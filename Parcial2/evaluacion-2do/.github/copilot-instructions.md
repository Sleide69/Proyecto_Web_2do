<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Sistema de Gestión de Eventos Deportivos

Este workspace contiene un sistema completo para gestión de eventos deportivos implementado en tres arquitecturas diferentes usando NestJS:

## Estructura del Proyecto

- **sports-events-rest**: API REST (Puerto 3000)
- **sports-events-graphql**: API GraphQL (Puerto 3001) 
- **sports-events-websocket**: WebSocket Server (Puerto 3002)

## Entidades Principales

### Race (Carrera)
- Gestión de eventos deportivos
- Tipos: MARATHON, HALF_MARATHON, 10K, 5K, TRAIL, TRIATHLON, CYCLING
- Estados: PLANNED, OPEN_REGISTRATION, CLOSED_REGISTRATION, IN_PROGRESS, COMPLETED, CANCELLED

### Competitor (Competidor)
- Datos personales del participante
- Configuración de camiseta (tipo y talla)
- Email único como identificador

### Registration (Inscripción)
- Vincula competidor con carrera
- Manejo de códigos de confirmación
- Estados: PENDING, CONFIRMED, CANCELLED, COMPLETED

### Payment (Pago)
- Procesamiento de pagos de inscripciones
- Métodos: CREDIT_CARD, DEBIT_CARD, BANK_TRANSFER, PAYPAL, CASH
- Estados: PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED, REFUNDED

## Interfaces Principales del Sistema

1. **Crear Nueva Carrera**: Administrador define evento deportivo
2. **Registro de Competidor**: Inscripción con datos personales y camiseta
3. **Resumen de Inscripción**: Detalles completos con opción de pago/cancelación

## Tecnologías y Patrones

- **NestJS** con TypeScript
- **Decoradores** para validación (class-validator)
- **DTOs/Inputs** para transferencia de datos
- **Servicios** para lógica de negocio
- **Persistencia JSON** para datos
- **GraphQL** con resolvers y types
- **WebSocket** con Socket.IO para tiempo real

## Comandos de Desarrollo

Usar VS Code Tasks para ejecutar los servicios:
- `Start REST API`
- `Start GraphQL API`
- `Start WebSocket Server`
- `Start All Services`

## Reglas de Código

- Usar tipos de TypeScript estrictos
- Validar datos de entrada con decoradores
- Implementar manejo de errores apropiado
- Mantener consistencia entre los tres proyectos
- Usar UUIDs para identificadores únicos
- Implementar logs informativos
