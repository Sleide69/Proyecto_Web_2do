# 🔗 Integración del Módulo Domain

## 📝 Resumen de la Refactorización

Se ha implementado una **arquitectura modular** basada en **Domain-Driven Design** con un módulo `domain` compartido que centraliza toda la lógica de negocio, entidades, DTOs, interfaces y servicios de dominio.

## 🎯 Objetivos Alcanzados

### ✅ **Reutilización**
- Un solo lugar para todas las entidades del dominio
- DTOs con validaciones unificadas
- Servicios de dominio compartidos
- Interfaces consistentes entre proyectos

### ✅ **Claridad**
- Separación clara entre dominio y infraestructura
- Responsabilidades bien definidas
- Documentación centralizada del dominio

### ✅ **Escalabilidad**
- Fácil extensión de funcionalidades
- Nuevos proyectos pueden usar el mismo núcleo
- Versionado independiente del módulo domain

## 📦 Estructura del Módulo Domain

```
domain/
├── src/
│   ├── entities/           # Entidades del dominio
│   │   ├── base.entity.ts     # Entidad base con UUID y timestamps
│   │   ├── race.entity.ts     # Entidad de carreras con lógica de negocio
│   │   ├── competitor.entity.ts # Entidad de competidores
│   │   ├── registration.entity.ts # Entidad de inscripciones
│   │   ├── payment.entity.ts  # Entidad de pagos con cálculo de fees
│   │   └── index.ts          # Exportaciones
│   │
│   ├── enums/             # Enumeraciones del dominio
│   │   └── index.ts          # RaceType, RaceStatus, ShirtType, PaymentMethod, etc.
│   │
│   ├── dtos/              # Data Transfer Objects con validaciones
│   │   ├── base.dto.ts       # DTOs para Race y Competitor
│   │   ├── registration.dto.ts # DTOs para Registration y Payment
│   │   └── index.ts          # Exportaciones
│   │
│   ├── interfaces/        # Contratos e interfaces
│   │   ├── repositories.interface.ts # IRepository, IRaceRepository, etc.
│   │   ├── services.interface.ts    # IRaceService, IEventPublisher, etc.
│   │   └── index.ts                 # Exportaciones
│   │
│   ├── services/          # Servicios de dominio
│   │   ├── base-domain.service.ts      # Servicio base con utilidades
│   │   ├── business-validation.service.ts # Validaciones de negocio
│   │   └── index.ts                    # Exportaciones
│   │
│   └── index.ts           # Punto de entrada principal
│
├── package.json           # Configuración del paquete
├── tsconfig.json          # TypeScript con strictPropertyInitialization: false
└── README.md              # Documentación detallada
```

## 🔧 Integración en Proyectos

### **1. Sports Events REST API (Puerto 3000)**

#### **Entidades TypeORM Extendidas**
```typescript
// sports-events-rest/src/entities/race.entity.ts
import { Race as DomainRace, RaceType, RaceStatus } from '@sports-events/domain';

export class Race extends DomainRace {
  // Hereda toda la lógica del dominio
  // Decoradores específicos de TypeORM si es necesario
}
```

#### **DTOs con Swagger**
```typescript
// sports-events-rest/src/dto/race.dto.ts
import { CreateRaceDto as DomainCreateRaceDto } from '@sports-events/domain';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRaceDto extends DomainCreateRaceDto {
  // Hereda validaciones del dominio
  // Decoradores Swagger para documentación
}
```

#### **Servicios Implementando Interfaces**
```typescript
// sports-events-rest/src/services/race.service.ts
import { IRaceService, BusinessValidationService } from '@sports-events/domain';

@Injectable()
export class RaceService implements IRaceService {
  // Implementa interface del dominio
  // Usa validaciones de negocio centralizadas
}
```

### **2. Sports Events GraphQL API (Puerto 3001)**

#### **Tipos GraphQL Basados en Entidades**
```typescript
// sports-events-graphql/src/entities/race.entity.ts
import { Race as DomainRace } from '@sports-events/domain';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Race extends DomainRace {
  // Hereda entidad del dominio
  // Decoradores GraphQL para esquema
}
```

#### **Inputs con Validaciones**
```typescript
// sports-events-graphql/src/inputs/create-race.input.ts
import { CreateRaceDto } from '@sports-events/domain';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateRaceInput extends CreateRaceDto {
  // Hereda validaciones del dominio
}
```

#### **Resolvers con Lógica de Dominio**
```typescript
// sports-events-graphql/src/resolvers/race.resolver.ts
import { IRaceService, BusinessValidationService } from '@sports-events/domain';

@Resolver(() => Race)
export class RaceResolver {
  // Usa servicios del dominio
  // Implementa mutations y queries
}
```

### **3. Sports Events WebSocket Server (Puerto 3002)**

#### **Gateway con Eventos de Dominio**
```typescript
// sports-events-websocket/src/gateways/events.gateway.ts
import { 
  IEventSubscriber, 
  IDomainEvent, 
  DomainEventType 
} from '@sports-events/domain';

@WebSocketGateway()
export class EventsGateway implements IEventSubscriber {
  // Suscribe a eventos de dominio
  // Notifica cambios en tiempo real
}
```

#### **Entidades para Notificaciones**
```typescript
// sports-events-websocket/src/entities/race.entity.ts
import { Race as DomainRace } from '@sports-events/domain';

export class Race extends DomainRace {
  // Hereda entidad del dominio
  // Métodos adicionales para WebSocket si es necesario
}
```

## 🚀 Beneficios Implementados

### **Para Desarrolladores**
- ✅ **IntelliSense completo** con tipos compartidos
- ✅ **Validaciones consistentes** en todas las interfaces
- ✅ **Menos duplicación de código**
- ✅ **Testing centralizado** de lógica de negocio

### **Para el Proyecto**
- ✅ **Mantenimiento simplificado** - cambios en un solo lugar
- ✅ **Nuevas funcionalidades** más rápidas de implementar
- ✅ **Calidad mejorada** con validaciones centralizadas
- ✅ **Documentación unificada** del dominio

### **Para el Negocio**
- ✅ **Consistencia garantizada** en todas las interfaces
- ✅ **Reglas de negocio centralizadas**
- ✅ **Menor riesgo de errores** por duplicación
- ✅ **Adaptación rápida** a cambios de requerimientos

## 📋 Funcionalidades Compartidas

### **Entidades con Lógica de Negocio**
- **Race**: `isAvailableForRegistration()`, `isFull()`, `updateStatus()`
- **Competitor**: `fullName`, `validate()`, `updateShirtInfo()`
- **Registration**: `confirm()`, `cancel()`, `canBeCancelled()`
- **Payment**: `complete()`, `refund()`, `calculateFee()`

### **Validaciones de Negocio Centralizadas**
- Validación de fechas de carreras
- Límites de capacidad y participación
- Políticas de cancelación y reembolsos
- Cálculo automático de comisiones

### **DTOs con Validaciones Robustas**
- **CreateRaceDto**: Validación completa de fechas, capacidad y tarifas
- **CreateCompetitorDto**: Validación de email, teléfono y datos personales
- **CreateRegistrationDto**: DTO anidado con competidor embebido
- **CreatePaymentDto**: Validación de montos y métodos de pago

### **Interfaces para Desacoplamiento**
- **IRepository<T>**: Interface genérica para repositorios
- **IRaceService**, **ICompetitorService**: Contratos de servicios
- **IEventPublisher**: Para eventos de dominio
- **IPersistenceService**: Para manejo de datos

## 🔄 Flujo de Datos Compartido

### **1. Crear Carrera**
```
REST/GraphQL Input → CreateRaceDto (domain) → BusinessValidationService → Race Entity → Repository
```

### **2. Procesar Inscripción**
```
Input → CreateRegistrationDto → Validaciones de Negocio → Registration + Competitor → Events → WebSocket
```

### **3. Gestionar Pagos**
```
Payment DTO → Validación de Montos → Payment Entity → Cálculo de Fees → Eventos de Estado
```

## 🧪 Testing Mejorado

### **Tests de Dominio Aislados**
```bash
# En el módulo domain
npm test                # Tests unitarios de entidades
npm run test:coverage   # Cobertura de lógica de negocio
```

### **Tests de Integración**
```bash
# En cada proyecto
npm test                # Tests usando dominio compartido
```

## 📈 Escalabilidad Demostrada

### **Agregar Nueva Entidad**
1. Crear en `domain/src/entities/`
2. Exportar desde `domain/src/index.ts`
3. Usar en todos los proyectos automáticamente

### **Agregar Nueva Validación**
1. Modificar `BusinessValidationService`
2. Se aplica automáticamente en todas las interfaces

### **Agregar Nuevo Proyecto**
1. `npm install ../domain`
2. Importar entidades y DTOs necesarios
3. Implementar interfaces específicas

## 🏆 Resultado Final

La refactorización ha creado una **arquitectura modular robusta** que:

- **Centraliza** toda la lógica de dominio
- **Garantiza** consistencia entre interfaces
- **Facilita** el mantenimiento y extensión
- **Mejora** la calidad del código
- **Acelera** el desarrollo de nuevas funcionalidades

El sistema ahora sigue principios de **Clean Architecture** y **Domain-Driven Design**, proporcionando una base sólida para el crecimiento y evolución del proyecto.
