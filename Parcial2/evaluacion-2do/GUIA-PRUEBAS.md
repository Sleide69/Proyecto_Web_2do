# 🏃 Guía de Pruebas - Sistema de Eventos Deportivos

Este documento explica cómo probar cada una de las tres interfaces del sistema utilizando diferentes tecnologías.

## 🏗️ **Arquitectura Modular con Domain**

### 📦 **Módulo Domain Compartido**
El sistema utiliza una **arquitectura modular** basada en **Domain-Driven Design** con un módulo `domain` compartido que contiene:

- **Entidades**: `Race`, `Competitor`, `Registration`, `Payment`
- **DTOs**: Con validaciones unificadas para todas las interfaces
- **Enums**: Estados, tipos y valores constantes del dominio
- **Interfaces**: Contratos para servicios y repositorios
- **Servicios de Dominio**: Validaciones de negocio centralizadas

### 🎯 **Beneficios de la Arquitectura**
- ✅ **Consistencia**: Mismas reglas de negocio en REST, GraphQL y WebSocket
- ✅ **Reutilización**: Un solo lugar para la lógica de dominio
- ✅ **Mantenibilidad**: Cambios centralizados
- ✅ **Escalabilidad**: Fácil extensión de funcionalidades

### 📁 **Estructura del Domain Module**
```
domain/
├── entities/          # Race, Competitor, Registration, Payment
├── enums/            # RaceType, RaceStatus, ShirtType, etc.
├── dtos/             # DTOs con validaciones
├── interfaces/       # Contratos para servicios
├── services/         # Lógica de negocio
└── index.ts          # Exportaciones unificadas
```

---

## 📋 Resumen de las Interfaces

### Interface 1: Crear Nueva Carrera 🏁
- **Tecnología**: REST API
- **Puerto**: 3000
- **Herramientas de prueba**: Swagger UI, Postman
- **Propósito**: Permite al administrador crear nuevos eventos deportivos

### Interface 2: Registro del Competidor 🏃‍♂️
- **Tecnología**: GraphQL
- **Puerto**: 3001  
- **Herramientas de prueba**: GraphQL Playground, Apollo Studio
- **Propósito**: Permite registrar competidores en carreras existentes

### Interface 3: Resumen de Inscripción 📊
- **Tecnología**: WebSocket
- **Puerto**: 3002
- **Herramientas de prueba**: Cliente HTML incluido, herramientas de WebSocket
- **Propósito**: Muestra actualizaciones en tiempo real del estado de inscripciones

---

## 🚀 Iniciar los Servicios

### Opción 1: Usar VS Code Tasks (Recomendado)
1. Abrir VS Code en el workspace
2. Presionar `Ctrl+Shift+P` y escribir "Tasks: Run Task"
3. Seleccionar una de estas opciones:
   - `Start REST API` (Interface 1)
   - `Start GraphQL API` (Interface 2)  
   - `Start WebSocket Server` (Interface 3)

### Opción 2: Terminal Manual
```powershell
# Interface 1 - REST API
cd sports-events-rest
npm run start:dev

# Interface 2 - GraphQL API  
cd sports-events-graphql
npm run start:dev

# Interface 3 - WebSocket
cd sports-events-websocket
npm run start:dev
```

---

## 🏁 Interface 1: Crear Nueva Carrera (REST API)

### 📖 Acceso a Documentación Swagger
**URL**: http://localhost:3000/docs

### 🧪 Pruebas con Swagger UI

1. **Abrir Swagger**: http://localhost:3000/docs
2. **Expandir el endpoint POST /api/races**
3. **Hacer clic en "Try it out"**
4. **⚠️ IMPORTANTE: Borrar todo el contenido del campo Request Body**
5. **Copiar y pegar EXACTAMENTE este JSON**:

```json
{
  "name": "Maratón Ciudad 2024",
  "description": "Maratón anual de la ciudad con recorrido por el centro histórico",
  "type": "MARATHON",
  "eventDate": "2024-12-15T08:00:00Z",
  "registrationStartDate": "2024-10-01T00:00:00Z",
  "registrationEndDate": "2024-12-10T23:59:59Z",
  "location": "Plaza Central, Ciudad",
  "distance": "42.195 km",
  "maxParticipants": 500,
  "registrationFee": 75.00,
  "status": "PLANNED"
}
```

6. **Hacer clic en "Execute"**
7. **Verificar respuesta 201 Created**

### 🚨 **Solución al Error 400 "Bad Request"**

Si recibes el error: **"Expected property name or '}' in JSON"**, significa:

1. **El JSON tiene caracteres inválidos** (comillas especiales, espacios raros)
2. **Hay contenido previo en el campo** que no se borró completamente
3. **Usaste tipos incorrectos** (ej: "10K" en lugar de "TEN_K")

**✅ SOLUCIÓN PASO A PASO**:
- **Paso 1**: Seleccionar TODO el contenido del Request Body (`Ctrl+A`)
- **Paso 2**: Borrarlo completamente (`Delete`)
- **Paso 3**: Copiar el JSON desde aquí (NO desde Word o PDF)
- **Paso 4**: Pegar con `Ctrl+V`
- **Paso 5**: Verificar que las comillas sean rectas `"` no curvas `"`

### ✅ **Valores Válidos para Campos**

#### Tipos de Carrera (`type`)
```
"MARATHON"        - Maratón
"HALF_MARATHON"   - Medio Maratón  
"TEN_K"           - 10 Kilómetros (NO usar "10K")
"FIVE_K"          - 5 Kilómetros (NO usar "5K")
"TRAIL"           - Trail Running
"TRIATHLON"       - Triatlón
"CYCLING"         - Ciclismo
```

#### Estados de Carrera (`status`)
```
"PLANNED"                - Planificada
"OPEN_REGISTRATION"      - Registro Abierto
"CLOSED_REGISTRATION"    - Registro Cerrado
"IN_PROGRESS"           - En Progreso
"COMPLETED"             - Completada
"CANCELLED"             - Cancelada
```

### 📮 Pruebas con Postman

#### Crear Nueva Carrera
```http
POST http://localhost:3000/api/races
Content-Type: application/json

{
  "name": "10K Parque Central",
  "description": "Carrera familiar de 10 kilómetros",
  "type": "TEN_K",
  "eventDate": "2024-11-30T07:00:00Z",
  "registrationStartDate": "2024-09-01T00:00:00Z",
  "registrationEndDate": "2024-11-25T23:59:59Z",
  "location": "Parque Central",
  "distance": "10 km",
  "maxParticipants": 200,
  "registrationFee": 25.00,
  "status": "OPEN_REGISTRATION"
}
```

### 🎯 **Más Ejemplos para Swagger UI**

#### Ejemplo Simple - 5K ✅
```json
{
  "name": "5K Familiar",
  "description": "Carrera de 5 kilómetros para toda la familia",
  "type": "FIVE_K",
  "eventDate": "2024-10-20T08:00:00Z",
  "registrationStartDate": "2024-08-01T00:00:00Z",
  "registrationEndDate": "2024-10-15T23:59:59Z",
  "location": "Plaza del Pueblo",
  "distance": "5 km",
  "maxParticipants": 150,
  "registrationFee": 15.00,
  "status": "OPEN_REGISTRATION"
}
```

#### Ejemplo Medio Maratón ✅
```json
{
  "name": "Medio Maratón Costero",
  "description": "Recorrido de 21K por la costa",
  "type": "HALF_MARATHON",
  "eventDate": "2024-12-01T06:30:00Z",
  "registrationStartDate": "2024-08-15T00:00:00Z",
  "registrationEndDate": "2024-11-26T23:59:59Z",
  "location": "Malecón de la Ciudad",
  "distance": "21.097 km",
  "maxParticipants": 300,
  "registrationFee": 45.00,
  "status": "PLANNED"
}
```

#### Ejemplo Triatlón ✅
```json
{
  "name": "Triatlón Olímpico",
  "description": "Natación, ciclismo y carrera",
  "type": "TRIATHLON",
  "eventDate": "2024-11-15T06:00:00Z",
  "registrationStartDate": "2024-08-01T00:00:00Z",
  "registrationEndDate": "2024-11-10T23:59:59Z",
  "location": "Centro Acuático",
  "distance": "1.5km natación + 40km ciclismo + 10km carrera",
  "maxParticipants": 100,
  "registrationFee": 120.00,
  "status": "OPEN_REGISTRATION"
}
```

#### Listar Carreras
```http
GET http://localhost:3000/api/races
```

#### Carreras Disponibles para Registro
```http
GET http://localhost:3000/api/races/available
```

---

## 🏃‍♂️ Interface 2: Registro del Competidor (GraphQL)

### 🎮 Acceso a GraphQL Playground
**URL**: http://localhost:3001/graphql

### 🧪 Pruebas con GraphQL Playground

#### 1. Crear Competidor
```graphql
mutation CreateCompetitor {
  createCompetitor(input: {
    firstName: "Juan"
    lastName: "Pérez"
    email: "juan.perez@email.com"
    phone: "+1234567890"
    shirtType: COTTON
    shirtSize: M
  }) {
    id
    firstName
    lastName
    email
    phone
    shirtType
    shirtSize
    fullName
    createdAt
  }
}
```

### 🚨 **Solución a Errores de GraphQL**

Si recibes errores como:
- **"Field 'dateOfBirth' is not defined"**
- **"Field 'emergencyContact' is not defined"**  
- **"Enum 'ShirtType' cannot represent 'STANDARD'"**

**✅ CAMPOS VÁLIDOS PARA CreateCompetitorInput**:
- `firstName` (requerido)
- `lastName` (requerido)
- `email` (requerido)
- `phone` (requerido)
- `shirtType` (requerido)
- `shirtSize` (requerido)

**✅ VALORES VÁLIDOS**:

#### Tipos de Camiseta (`shirtType`) - SIN comillas
```
COTTON        - Camiseta de Algodón
POLYESTER     - Camiseta de Poliéster
COTTON_BLEND  - Mezcla de Algodón
DRI_FIT       - Tecnología Dri-FIT
```

#### Tallas de Camiseta (`shirtSize`) - SIN comillas
```
XS   - Extra Small
S    - Small
M    - Medium
L    - Large
XL   - Extra Large
XXL  - Double Extra Large
```

#### 2. Consultar Carreras Disponibles
```graphql
query AvailableRaces {
  availableRaces {
    id
    name
    description
    type
    eventDate
    location
    maxParticipants
    registrationFee
    distance
    status
  }
}
```

### 🎯 **Más Ejemplos de Competidores Correctos**

#### Competidor Femenino ✅
```graphql
mutation CreateCompetitor {
  createCompetitor(input: {
    firstName: "Ana"
    lastName: "García"
    email: "ana.garcia@email.com"
    phone: "+9876543210"
    shirtType: DRI_FIT
    shirtSize: S
  }) {
    id
    firstName
    lastName
    email
    phone
    shirtType
    shirtSize
    fullName
    createdAt
  }
}
```

#### Competidor Talla XL ✅
```graphql
mutation CreateCompetitor {
  createCompetitor(input: {
    firstName: "Carlos"
    lastName: "Rodríguez"
    email: "carlos.rodriguez@email.com"
    phone: "+5555555555"
    shirtType: POLYESTER
    shirtSize: XL
  }) {
    id
    firstName
    lastName
    email
    phone
    shirtType
    shirtSize
    fullName
    createdAt
  }
}
```

#### Competidor Talla XXL ✅
```graphql
mutation CreateCompetitor {
  createCompetitor(input: {
    firstName: "Roberto"
    lastName: "Martínez"
    email: "roberto.martinez@email.com"
    phone: "+1111111111"
    shirtType: COTTON_BLEND
    shirtSize: XXL
  }) {
    id
    firstName
    lastName
    email
    phone
    shirtType
    shirtSize
    fullName
    createdAt
  }
}
```

### 📋 **Consultar Todos los Competidores**
```graphql
query GetAllCompetitors {
  competitors {
    id
    firstName
    lastName
    email
    phone
    shirtType
    shirtSize
    fullName
    createdAt
    updatedAt
  }
}
```

#### 3. Registrar Competidor en Carrera
```graphql
mutation CreateRegistration {
  createRegistration(input: {
    raceId: "race-id-aqui"
    competitorEmail: "juan.perez@email.com"
    emergencyContact: "María Pérez - +0987654321"
    medicalConditions: "Ninguna"
    notes: "Primera vez participando"
  }) {
    id
    raceId
    competitorEmail
    status
    confirmationCode
    registrationDate
    emergencyContact
    medicalConditions
    notes
  }
}
```

#### 4. Consultar Resumen de Inscripción
```graphql
query GetRegistration {
  registration(id: "registration-id-aqui") {
    id
    raceId
    competitorEmail
    status
    confirmationCode
    registrationDate
    emergencyContact
    medicalConditions
    notes
  }
}
```

### 📮 Pruebas con Postman (GraphQL)

```http
POST http://localhost:3001/graphql
Content-Type: application/json

{
  "query": "mutation CreateCompetitor($input: CreateCompetitorInput!) { createCompetitor(input: $input) { id firstName lastName email phone shirtType shirtSize fullName createdAt } }",
  "variables": {
    "input": {
      "firstName": "Sofia",
      "lastName": "López",
      "email": "sofia.lopez@email.com",
      "phone": "+1122334455",
      "shirtType": "DRI_FIT",
      "shirtSize": "XS"
    }
  }
}
```

### 🔍 **Consultar Competidor por ID (Postman)**
```http
POST http://localhost:3001/graphql
Content-Type: application/json

{
  "query": "query GetCompetitor($id: ID!) { competitor(id: $id) { id firstName lastName email phone shirtType shirtSize fullName createdAt updatedAt } }",
  "variables": {
    "id": "competitor-id-aqui"
  }
}
```

---

## 📊 Interface 3: Resumen de Inscripción (WebSocket)

### 🌐 Cliente de Prueba Web
**URL**: http://localhost:3002/websocket-client.html

### 🧪 Instrucciones de Prueba

1. **Abrir el cliente**: http://localhost:3002/websocket-client.html
2. **Conectar al WebSocket**: Hacer clic en "Conectar"
3. **Suscribirse a una carrera**: 
   - Introducir ID de carrera (ej: "race-123")
   - Hacer clic en "Suscribirse"
4. **Obtener estado de carreras**: Hacer clic en "Obtener Estado de Carreras"
5. **Simular eventos**:
   - Simular registro de competidor
   - Simular cambio de estado de carrera

### 🔧 Pruebas con Herramientas de WebSocket

#### Con Socket.IO Client (JavaScript)
```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:3002');

socket.on('connect', () => {
  console.log('Conectado al servidor WebSocket');
  
  // Suscribirse a una carrera
  socket.emit('subscribe-to-race', { raceId: 'race-123' });
});

socket.on('race-registration-update', (data) => {
  console.log('Nueva inscripción:', data);
});

socket.on('race-status-update', (data) => {
  console.log('Cambio de estado:', data);
});
```

#### Eventos Disponibles

| Evento | Dirección | Descripción |
|--------|-----------|-------------|
| `subscribe-to-race` | Cliente → Servidor | Suscribirse a actualizaciones de una carrera |
| `unsubscribe-from-race` | Cliente → Servidor | Desuscribirse de una carrera |
| `get-races-status` | Cliente → Servidor | Obtener estado actual de carreras |
| `race-registration-update` | Servidor → Cliente | Nueva inscripción en carrera |
| `race-status-update` | Servidor → Cliente | Cambio de estado de carrera |
| `connection-established` | Servidor → Cliente | Confirmación de conexión |

---

---

## 📝 **IMPORTANTE: Registro de Competidores en Swagger UI**

### 🚨 **Error Común con POST /api/registrations**

Si intentas crear una inscripción y recibes este error:
```json
{
  "message": [
    "property competitorEmail should not exist",
    "property emergencyContact should not exist", 
    "property medicalConditions should not exist",
    "competitor should not be empty"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

### ✅ **SOLUCIÓN: Usar el formato correcto**

**❌ INCORRECTO** (No funciona):
```json
{
  "raceId": "d572eb54-4b19-48ff-a269-55c224cd6176",
  "competitorEmail": "maria.gonzalez@email.com",
  "emergencyContact": "Carlos González - +0987654321",
  "medicalConditions": "Ninguna condición especial",
  "notes": "Primera participación en maratón"
}
```

**✅ CORRECTO** (Funciona):
```json
{
  "raceId": "d572eb54-4b19-48ff-a269-55c224cd6176",
  "competitor": {
    "firstName": "María",
    "lastName": "González",
    "email": "maria.gonzalez@email.com",
    "phone": "+1234567890",
    "shirtType": "COTTON",
    "shirtSize": "M"
  },
  "notes": "Primera participación en maratón"
}
```

### 🎯 **Más Ejemplos de Inscripciones para Swagger**

#### Ejemplo 1: Competidor Masculino Talla XL ✅
```json
{
  "raceId": "d572eb54-4b19-48ff-a269-55c224cd6176",
  "competitor": {
    "firstName": "Carlos",
    "lastName": "Rodríguez", 
    "email": "carlos.rodriguez@email.com",
    "phone": "+5555555555",
    "shirtType": "DRI_FIT",
    "shirtSize": "XL"
  },
  "notes": "Corredor experimentado en maratones"
}
```

#### Ejemplo 2: Competidora Femenina Talla S ✅
```json
{
  "raceId": "d572eb54-4b19-48ff-a269-55c224cd6176",
  "competitor": {
    "firstName": "Ana",
    "lastName": "García",
    "email": "ana.garcia@email.com", 
    "phone": "+9876543210",
    "shirtType": "POLYESTER",
    "shirtSize": "S"
  },
  "notes": "Primera vez participando en eventos deportivos"
}
```

#### Ejemplo 3: Competidor Talla XXL ✅
```json
{
  "raceId": "d572eb54-4b19-48ff-a269-55c224cd6176",
  "competitor": {
    "firstName": "Roberto",
    "lastName": "Martínez",
    "email": "roberto.martinez@email.com",
    "phone": "+1111111111",
    "shirtType": "DRI_FIT", 
    "shirtSize": "XXL"
  },
  "notes": "Aficionado al running desde hace 5 años"
}
```

### 📋 **Pasos para Registrar en Swagger UI**

1. **Crear una carrera primero** (POST /api/races)
2. **Copiar el ID de la carrera** de la respuesta
3. **Ir a POST /api/registrations** en Swagger
4. **Hacer clic en "Try it out"**
5. **Borrar todo el contenido** del Request Body
6. **Pegar uno de los JSON correctos** de arriba
7. **Reemplazar el raceId** con el ID real de tu carrera
8. **Ejecutar** y verificar respuesta 201 Created

### � **Error: "La carrera no está disponible para registro"**

Si recibes este error al intentar registrar un competidor:
```json
{
  "message": "La carrera no está disponible para registro",
  "error": "Bad Request",
  "statusCode": 400
}
```

**✅ SOLUCIÓN**: La carrera debe estar en estado `OPEN_REGISTRATION` y las fechas deben ser válidas.

#### **Paso 1: Verificar estado de la carrera**
```bash
GET /api/races/{raceId}
```

#### **Paso 2: Actualizar estado si es necesario**
```json
PATCH /api/races/{raceId}
{
  "status": "OPEN_REGISTRATION"
}
```

#### **Paso 3: Actualizar fechas si es necesario**
```json
PATCH /api/races/{raceId}
{
  "eventDate": "2025-12-15T08:00:00Z",
  "registrationStartDate": "2025-08-01T00:00:00Z", 
  "registrationEndDate": "2025-12-10T23:59:59Z"
}
```

### �🔍 **Otros Endpoints de Inscripciones**

#### **GET /api/registrations** - Listar todas las inscripciones
```
No requiere body, simplemente hacer clic en "Execute"
```

#### **GET /api/registrations/{id}/summary** - Resumen detallado
```
Usar el ID de una inscripción creada anteriormente
Ejemplo: 550e8400-e29b-41d4-a716-446655440001
```

#### **PATCH /api/registrations/{id}/confirm** - Confirmar inscripción
```
Usar el ID de una inscripción para confirmarla
No requiere body
```

#### **PATCH /api/registrations/{id}/cancel** - Cancelar inscripción
```
Usar el ID de una inscripción para cancelarla
No requiere body
```

---

## 🔄 Flujo Completo de Pruebas

### Escenario: Crear carrera, registrar competidor y monitorear en tiempo real

1. **Crear Carrera (REST)**:
   - Usar Swagger en http://localhost:3000/docs
   - Crear nueva carrera con el endpoint POST /api/races
   - Anotar el ID de la carrera creada

2. **Registrar Competidor (GraphQL)**:
   - Abrir GraphQL Playground en http://localhost:3001/graphql
   - Crear competidor con mutation `createCompetitor`
   - Crear inscripción con mutation `createRegistration`
   - Usar el ID de carrera del paso 1

3. **Monitorear en Tiempo Real (WebSocket)**:
   - Abrir cliente WebSocket en http://localhost:3002/websocket-client.html
   - Conectar al WebSocket
   - Suscribirse a la carrera usando su ID
   - Simular eventos para ver actualizaciones en tiempo real

---

## 🐛 Solución de Problemas

### Puertos en Uso
Si algún puerto está ocupado:
```powershell
# Verificar qué proceso usa el puerto
netstat -ano | findstr :3000
netstat -ano | findstr :3001  
netstat -ano | findstr :3002

# Terminar proceso (reemplazar PID)
taskkill /PID 1234 /F
```

### Limpiar y Reinstalar
```powershell
# En cada directorio de proyecto
npm run clean
npm install
npm run start:dev
```

### Verificar Servicios
```powershell
# Verificar que los servicios estén corriendo
curl http://localhost:3000/api/races
curl http://localhost:3001/graphql
curl http://localhost:3002/websocket-client.html
```

---

## 📝 Datos de Ejemplo

### Tipos de Carrera Disponibles
- `MARATHON` - Maratón (42.2 km)
- `HALF_MARATHON` - Medio Maratón (21.1 km)  
- `10K` - 10 Kilómetros
- `5K` - 5 Kilómetros
- `TRAIL` - Trail Running
- `TRIATHLON` - Triatlón
- `CYCLING` - Ciclismo

### Estados de Carrera
- `PLANNED` - Planificada
- `OPEN_REGISTRATION` - Registro Abierto
- `CLOSED_REGISTRATION` - Registro Cerrado
- `IN_PROGRESS` - En Progreso
- `COMPLETED` - Completada
- `CANCELLED` - Cancelada

### Tipos de Camiseta
**Para REST API (Swagger)**:
- `"COTTON"` - Algodón
- `"POLYESTER"` - Poliéster
- `"COTTON_BLEND"` - Mezcla de Algodón
- `"DRI_FIT"` - Tecnología Dri-FIT

**Para GraphQL (sin comillas)**:
- `COTTON` - Algodón
- `POLYESTER` - Poliéster
- `COTTON_BLEND` - Mezcla de Algodón
- `DRI_FIT` - Tecnología Dri-FIT

### Tallas de Camiseta
- `XS`, `S`, `M`, `L`, `XL`, `XXL`

---

## 🎯 Resultados Esperados

Después de seguir esta guía, deberías poder:

✅ Crear carreras usando la API REST  
✅ Registrar competidores usando GraphQL  
✅ Monitorear inscripciones en tiempo real con WebSocket  
✅ Verificar la integración entre los tres sistemas  
✅ Entender el flujo completo del sistema de eventos deportivos  

¡El sistema está listo para gestionar eventos deportivos de manera completa y eficiente! 🏆
