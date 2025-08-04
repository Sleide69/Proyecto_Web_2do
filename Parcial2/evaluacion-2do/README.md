# Sistema de Gestión de Eventos Deportivos

Sistema completo para la gestión de eventos deportivos implementado con NestJS en tres arquitecturas diferentes: REST API, GraphQL API y WebSocket para comunicación en tiempo real.

## 🏗️ Arquitectura del Sistema

El sistema está compuesto por tres proyectos independientes que pueden ejecutarse por separado:

### 1. **sports-events-rest** (Puerto 3000)
API REST completa para la gestión de eventos deportivos.

**Características:**
- ✅ Gestión completa de carreras deportivas
- ✅ Registro de competidores con validaciones
- ✅ Sistema de inscripciones con códigos de confirmación
- ✅ Procesamiento de pagos con múltiples estados
- ✅ Validación de datos con class-validator
- ✅ Persistencia en JSON

**Endpoints principales:**
```
POST /api/races              # Crear nueva carrera
GET  /api/races/available     # Carreras disponibles
POST /api/registrations       # Registrar competidor
GET  /api/registrations/:id/summary  # Resumen de inscripción
```

### 2. **sports-events-graphql** (Puerto 3001)
API GraphQL con las mismas funcionalidades que REST pero con consultas flexibles.

**Características:**
- ✅ Schema GraphQL generado automáticamente
- ✅ Queries y Mutations para todas las operaciones
- ✅ Tipos y inputs fuertemente tipados
- ✅ GraphQL Playground incluido
- ✅ Resolvers con validación

**Operaciones principales:**
```graphql
mutation CreateRace($input: CreateRaceInput!) {
  createRace(input: $input) { id name status }
}

query AvailableRaces {
  availableRaces { id name registrationFee }
}

mutation CreateRegistration($input: CreateRegistrationInput!) {
  createRegistration(input: $input) { id confirmationCode }
}
```

### 3. **sports-events-websocket** (Puerto 3002)
Servidor WebSocket para comunicación en tiempo real.

**Características:**
- ✅ Notificaciones en tiempo real
- ✅ Suscripciones a carreras específicas
- ✅ Eventos de nuevas inscripciones
- ✅ Cambios de estado de carreras
- ✅ Estadísticas en vivo

**Eventos WebSocket:**
```javascript
// Suscribirse a una carrera
socket.emit('subscribe-to-race', { raceId: '123' });

// Recibir nueva inscripción
socket.on('new-registration', (data) => {
  console.log('Nueva inscripción:', data);
});
```

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (v18 o superior)
- npm

### Instalación
```bash
# Clonar o descargar el proyecto
cd sports-events-rest
npm install

cd ../sports-events-graphql
npm install

cd ../sports-events-websocket
npm install
```

### Ejecución Individual

**API REST:**
```bash
cd sports-events-rest
npm run start:dev
# Disponible en: http://localhost:3000/api
```

**API GraphQL:**
```bash
cd sports-events-graphql
npm run start:dev
# Disponible en: http://localhost:3001/graphql
```

**WebSocket Server:**
```bash
cd sports-events-websocket
npm run start:dev
# Disponible en: ws://localhost:3002
```

### Ejecución con VS Code Tasks
Usa `Ctrl+Shift+P` y selecciona "Tasks: Run Task" para ejecutar:
- `Start REST API`
- `Start GraphQL API` 
- `Start WebSocket Server`
- `Start All Services`

## 📊 Modelo de Datos

### Entidades Principales

#### Race (Carrera)
```typescript
{
  id: string;
  name: string;
  description: string;
  type: RaceType;               // MARATHON, 10K, 5K, etc.
  eventDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  location: string;
  distance: string;
  maxParticipants: number;
  registrationFee: number;
  status: RaceStatus;           // PLANNED, OPEN_REGISTRATION, etc.
}
```

#### Competitor (Competidor)
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shirtType: ShirtType;         // COTTON, POLYESTER, etc.
  shirtSize: ShirtSize;         // XS, S, M, L, XL, XXL
}
```

#### Registration (Inscripción)
```typescript
{
  id: string;
  raceId: string;
  competitorId: string;
  paymentId?: string;
  status: RegistrationStatus;   // PENDING, CONFIRMED, etc.
  confirmationCode: string;
  registrationDate: Date;
  notes?: string;
}
```

#### Payment (Pago)
```typescript
{
  id: string;
  amount: number;
  method: PaymentMethod;        // CREDIT_CARD, PAYPAL, etc.
  status: PaymentStatus;        // PENDING, COMPLETED, etc.
  transactionId?: string;
  paymentDate?: Date;
}
```

## 🎯 Casos de Uso Principales

### 1. Crear Nueva Carrera
**Interfaz:** Administrador crea evento deportivo
- Definir tipo, fecha, ubicación, cupos
- Configurar fechas de registro
- Establecer tarifa de inscripción

### 2. Registro de Competidor
**Interfaz:** Competidor se inscribe en carrera
- Datos personales + preferencias de camiseta
- Verificación de cupos disponibles
- Generación de código de confirmación

### 3. Resumen de Inscripción
**Interfaz:** Competidor ve detalles y puede pagar/cancelar
- Detalles de la carrera
- Información del participante
- Estado del pago
- Opción de cancelar

## 🔧 Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **GraphQL** - API query language
- **Socket.IO** - WebSocket communication
- **Class Validator** - Validación de datos
- **UUID** - Generación de IDs únicos
- **JSON** - Persistencia de datos

## 📁 Estructura del Proyecto

```
evaluacion-2do/
├── sports-events-rest/          # API REST
│   ├── src/
│   │   ├── controllers/         # Endpoints REST
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── entities/            # Modelos de datos
│   │   ├── services/            # Lógica de negocio
│   │   └── persistence/         # Capa de datos JSON
│   └── data/database.json       # Base de datos JSON
│
├── sports-events-graphql/       # API GraphQL
│   ├── src/
│   │   ├── resolvers/           # GraphQL Resolvers
│   │   ├── inputs/              # GraphQL Input Types
│   │   ├── entities/            # GraphQL Object Types
│   │   └── services/            # Servicios compartidos
│   └── data/database.json       # Base de datos JSON
│
└── sports-events-websocket/     # WebSocket Server
    ├── src/
    │   ├── gateways/            # WebSocket Gateways
    │   └── entities/            # Entidades básicas
    └── README.md
```

## 🧪 Testing de APIs

### REST API con curl
```bash
# Crear carrera
curl -X POST http://localhost:3000/api/races \
  -H "Content-Type: application/json" \
  -d '{"name":"Maratón 2025","type":"MARATHON","eventDate":"2025-12-01",...}'

# Listar carreras disponibles
curl http://localhost:3000/api/races/available
```

### GraphQL con Playground
Visita `http://localhost:3001/graphql` para el playground interactivo.

### WebSocket con JavaScript
```javascript
const socket = io('ws://localhost:3002');
socket.on('connection-established', (data) => console.log(data));
```

## 📋 Próximas Mejoras

- [ ] Base de datos real (PostgreSQL/MongoDB)
- [ ] Autenticación y autorización
- [ ] Tests unitarios y de integración
- [ ] Docker containerization
- [ ] Frontend web application
- [ ] Notificaciones por email
- [ ] Reportes y analytics

## 📄 Licencia

ISC License
