# Sports Events REST API

API REST para la gestión de eventos deportivos que permite crear carreras, registrar competidores y gestionar inscripciones.

## Características Principales

### 🏃‍♂️ Gestión de Carreras
- Crear nuevas carreras deportivas
- Configurar fechas, ubicación, cupos y tarifas
- Estados de carrera (planificada, registro abierto, cerrado, etc.)

### 👥 Registro de Competidores
- Registro con datos personales
- Selección de tipo y talla de camiseta
- Validación de emails únicos

### 📝 Gestión de Inscripciones
- Inscripción de competidores en carreras
- Generación de códigos de confirmación
- Resumen detallado de inscripción

### 💳 Procesamiento de Pagos
- Múltiples métodos de pago
- Estados de pago (pendiente, procesando, completado, etc.)
- Cancelaciones y reembolsos

## Estructura del Proyecto

```
src/
├── entities/          # Modelos de datos
├── dto/              # Data Transfer Objects
├── services/         # Lógica de negocio
├── controllers/      # Endpoints REST
├── persistence/      # Capa de persistencia JSON
└── main.ts          # Punto de entrada
```

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev

# Compilar y ejecutar
npm run build
npm start
```

## Endpoints Principales

### Carreras
- `GET /api/races` - Listar todas las carreras
- `POST /api/races` - Crear nueva carrera
- `GET /api/races/available` - Carreras disponibles para registro
- `GET /api/races/:id` - Obtener carrera por ID

### Inscripciones
- `POST /api/registrations` - Registrar competidor
- `GET /api/registrations/:id/summary` - Resumen de inscripción
- `PATCH /api/registrations/:id/confirm` - Confirmar inscripción
- `PATCH /api/registrations/:id/cancel` - Cancelar inscripción

### Competidores
- `GET /api/competitors` - Listar competidores
- `POST /api/competitors` - Crear competidor
- `GET /api/competitors/:id` - Obtener competidor por ID

### Pagos
- `POST /api/payments` - Crear pago
- `PATCH /api/payments/:id/process` - Procesar pago
- `PATCH /api/payments/:id/complete` - Completar pago

## Entidades

### Race (Carrera)
```typescript
{
  id: string;
  name: string;
  description: string;
  type: RaceType;
  eventDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  location: string;
  distance: string;
  maxParticipants: number;
  registrationFee: number;
  status: RaceStatus;
}
```

### Competitor (Competidor)
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shirtType: ShirtType;
  shirtSize: ShirtSize;
}
```

### Registration (Inscripción)
```typescript
{
  id: string;
  raceId: string;
  competitorId: string;
  paymentId?: string;
  status: RegistrationStatus;
  confirmationCode: string;
  registrationDate: Date;
}
```

## Tecnologías

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **Class Validator** - Validación de datos
- **UUID** - Generación de IDs únicos
- **JSON** - Persistencia de datos

## Puerto

El servidor se ejecuta en el puerto 3000 por defecto:
`http://localhost:3000/api`
