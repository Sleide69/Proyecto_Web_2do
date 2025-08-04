# 🏗️ Módulo Domain - Sistema de Eventos Deportivos

## 📋 Descripción

El módulo `domain` es el núcleo compartido del sistema de eventos deportivos que contiene toda la lógica de negocio, entidades, DTOs, interfaces y servicios que pueden ser reutilizados entre los diferentes proyectos (REST API, GraphQL API y WebSocket Server).

## 🎯 Objetivos de la Arquitectura

### ✅ **Separación de Responsabilidades**
- **Entidades**: Lógica de dominio pura sin dependencias externas
- **DTOs**: Contratos de datos con validaciones
- **Servicios**: Lógica de negocio compleja y validaciones
- **Interfaces**: Contratos para implementaciones específicas

### ✅ **Reutilización**
- Un solo lugar para la lógica de negocio
- Entidades consistentes entre proyectos
- Validaciones uniformes en todas las interfaces

### ✅ **Escalabilidad**
- Fácil extensión de funcionalidades
- Nuevos tipos de entidades sin duplicación
- Servicios modulares y testeable

### ✅ **Mantenibilidad**
- Cambios centralizados en un solo lugar
- Versionado independiente del módulo
- Documentación unificada

## 📁 Estructura del Módulo

```
domain/
├── src/
│   ├── entities/           # Entidades del dominio
│   │   ├── base.entity.ts     # Entidad base con funcionalidad común
│   │   ├── race.entity.ts     # Entidad de carreras
│   │   ├── competitor.entity.ts # Entidad de competidores
│   │   ├── registration.entity.ts # Entidad de inscripciones
│   │   ├── payment.entity.ts  # Entidad de pagos
│   │   └── index.ts          # Exportaciones de entidades
│   │
│   ├── enums/             # Enumeraciones del dominio
│   │   └── index.ts          # Todos los enums (RaceType, RaceStatus, etc.)
│   │
│   ├── dtos/              # Data Transfer Objects
│   │   ├── base.dto.ts       # DTOs para Race y Competitor
│   │   ├── registration.dto.ts # DTOs para Registration y Payment
│   │   └── index.ts          # Exportaciones de DTOs
│   │
│   ├── interfaces/        # Contratos e interfaces
│   │   ├── repositories.interface.ts # Interfaces para repositorios
│   │   ├── services.interface.ts    # Interfaces para servicios
│   │   └── index.ts                 # Exportaciones de interfaces
│   │
│   ├── services/          # Servicios de dominio
│   │   ├── base-domain.service.ts      # Servicio base con utilidades
│   │   ├── business-validation.service.ts # Validaciones de negocio
│   │   └── index.ts                    # Exportaciones de servicios
│   │
│   └── index.ts           # Punto de entrada principal del módulo
│
├── package.json           # Configuración del paquete
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Este archivo
```

## 🧱 Componentes Principales

### **1. Entidades (entities/)**

#### **BaseEntity**
Clase abstracta que proporciona funcionalidad común:
- ID único (UUID v4)
- Timestamps (createdAt, updatedAt)
- Métodos de serialización
- Comparación de entidades

#### **Race**
Representa una carrera deportiva:
- Información básica (nombre, descripción, tipo)
- Fechas (evento, inicio/fin de registro)
- Configuración (ubicación, distancia, capacidad, tarifa)
- Estado (PLANNED, OPEN_REGISTRATION, etc.)
- Métodos de negocio (isAvailableForRegistration, isFull)

#### **Competitor**
Representa un participante:
- Información personal (nombre, email, teléfono)
- Preferencias de camiseta (tipo, talla)
- Validaciones (email, teléfono)
- Propiedades calculadas (fullName)

#### **Registration**
Representa una inscripción:
- Relación competidor-carrera
- Estado de inscripción
- Código de confirmación
- Métodos de gestión (confirm, cancel, complete)

#### **Payment**
Representa un pago:
- Información de pago (monto, método, estado)
- ID de transacción único
- Cálculo de comisiones
- Métodos de procesamiento (complete, fail, refund)

### **2. Enumeraciones (enums/)**

Valores constantes del dominio:
- **RaceType**: MARATHON, HALF_MARATHON, TEN_K, FIVE_K, etc.
- **RaceStatus**: PLANNED, OPEN_REGISTRATION, IN_PROGRESS, etc.
- **ShirtType**: COTTON, POLYESTER, DRI_FIT, etc.
- **ShirtSize**: XS, S, M, L, XL, XXL
- **RegistrationStatus**: PENDING, CONFIRMED, CANCELLED, etc.
- **PaymentMethod**: CREDIT_CARD, PAYPAL, BANK_TRANSFER, etc.
- **PaymentStatus**: PENDING, COMPLETED, FAILED, etc.

### **3. DTOs (dtos/)**

Objetos de transferencia de datos con validaciones:
- **CreateRaceDto**: Validación completa para crear carreras
- **UpdateRaceDto**: Campos opcionales para actualizar carreras
- **CreateCompetitorDto**: Validación de datos del competidor
- **CreateRegistrationDto**: DTO anidado con competidor embebido
- **CreatePaymentDto**: Validación de información de pago
- **RegistrationSummaryDto**: Vista completa de inscripción

### **4. Interfaces (interfaces/)**

#### **Repositorios**
- **IRepository<T>**: Interface genérica para repositorios
- **IRaceRepository**: Métodos específicos para carreras
- **ICompetitorRepository**: Métodos específicos para competidores
- **IRegistrationRepository**: Métodos específicos para inscripciones
- **IPaymentRepository**: Métodos específicos para pagos

#### **Servicios**
- **IRaceService**: Operaciones de carreras
- **ICompetitorService**: Operaciones de competidores
- **IRegistrationService**: Operaciones de inscripciones
- **IPaymentService**: Operaciones de pagos
- **IEventPublisher/IEventSubscriber**: Eventos de dominio

### **5. Servicios (services/)**

#### **BaseDomainService**
Funcionalidad común para servicios:
- Publicación de eventos
- Validaciones utilitarias
- Manejo de errores
- Paginación y ordenamiento

#### **BusinessValidationService**
Validaciones de reglas de negocio:
- Validación de creación/actualización de entidades
- Reglas de cambio de estado
- Límites de participación
- Políticas de cancelación y reembolso

## 🔧 Integración en Proyectos

### **1. Instalación del Módulo**

```bash
# En el directorio del módulo domain
npm install
npm run build

# En cada proyecto (REST, GraphQL, WebSocket)
npm install ../domain
```

### **2. Uso en Proyecto REST API**

```typescript
// En sports-events-rest/src/entities/race.entity.ts
import { Race as DomainRace, RaceType, RaceStatus } from '@sports-events/domain';

@Entity()
export class Race extends DomainRace {
  // Decoradores específicos de TypeORM si es necesario
}

// En sports-events-rest/src/services/race.service.ts
import { 
  IRaceService, 
  CreateRaceDto, 
  BusinessValidationService,
  DomainEventType 
} from '@sports-events/domain';

@Injectable()
export class RaceService implements IRaceService {
  // Implementación específica usando el dominio compartido
}
```

### **3. Uso en Proyecto GraphQL**

```typescript
// En sports-events-graphql/src/entities/race.entity.ts
import { Race as DomainRace } from '@sports-events/domain';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Race extends DomainRace {
  // Decoradores específicos de GraphQL
}

// En sports-events-graphql/src/inputs/create-race.input.ts
import { CreateRaceDto } from '@sports-events/domain';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateRaceInput extends CreateRaceDto {
  // Hereda validaciones del domain
}
```

### **4. Uso en Proyecto WebSocket**

```typescript
// En sports-events-websocket/src/gateways/events.gateway.ts
import { 
  Registration, 
  DomainEventType, 
  IEventSubscriber,
  IDomainEvent 
} from '@sports-events/domain';

@WebSocketGateway()
export class EventsGateway implements IEventSubscriber {
  // Suscripción a eventos de dominio para notificaciones en tiempo real
}
```

## 🎯 Beneficios de la Arquitectura

### **✅ Para Desarrolladores**
- **Consistencia**: Mismas entidades y reglas en todos los proyectos
- **Productividad**: No duplicar código de validación y lógica
- **Testing**: Testear lógica de negocio de forma aislada
- **IntelliSense**: Autocompletado y tipado en toda la aplicación

### **✅ Para el Proyecto**
- **Mantenibilidad**: Cambios en un solo lugar
- **Escalabilidad**: Fácil agregar nuevas interfaces
- **Calidad**: Validaciones centralizadas y probadas
- **Documentación**: Dominio autodocumentado con tipos

### **✅ Para el Negocio**
- **Consistencia**: Mismas reglas de negocio en todas las interfaces
- **Rapidez**: Desarrollo más rápido de nuevas funcionalidades
- **Confiabilidad**: Menos errores por duplicación de código
- **Flexibilidad**: Fácil adaptación a cambios de requerimientos

## 🚀 Casos de Uso Implementados

### **1. Gestión de Carreras**
- Crear/actualizar/eliminar carreras
- Cambios de estado con validaciones
- Consultas con filtros avanzados
- Verificación de disponibilidad

### **2. Registro de Competidores**
- Crear/actualizar competidores
- Validación de datos únicos (email)
- Búsqueda por patrones
- Gestión de preferencias

### **3. Proceso de Inscripción**
- Inscripción con validaciones de negocio
- Verificación de capacidad y fechas
- Códigos de confirmación únicos
- Estados y transiciones controladas

### **4. Procesamiento de Pagos**
- Múltiples métodos de pago
- Cálculo automático de comisiones
- Estados de procesamiento
- Política de reembolsos

### **5. Eventos de Dominio**
- Notificaciones de cambios de estado
- Integración con WebSocket para tiempo real
- Auditoría de operaciones
- Triggers para procesos externos

## 📈 Extensibilidad

### **Agregar Nueva Entidad**
1. Crear entidad extendiendo `BaseEntity`
2. Definir enums necesarios
3. Crear DTOs con validaciones
4. Definir interface de repositorio y servicio
5. Implementar validaciones de negocio
6. Exportar desde `index.ts`

### **Agregar Nueva Funcionalidad**
1. Extender interfaces existentes
2. Agregar métodos a servicios de dominio
3. Crear nuevos eventos de dominio si es necesario
4. Actualizar validaciones de negocio
5. Documentar cambios en este README

## 🔒 Principios de Diseño

### **Domain-Driven Design (DDD)**
- Entidades ricas con comportamiento
- Servicios de dominio para lógica compleja
- Eventos de dominio para comunicación
- Interfaces para desacoplamiento

### **SOLID Principles**
- **S**: Responsabilidad única por clase
- **O**: Abierto para extensión, cerrado para modificación
- **L**: Sustitución de Liskov con interfaces
- **I**: Segregación de interfaces específicas
- **D**: Inversión de dependencias con interfaces

### **Clean Architecture**
- Independencia de frameworks
- Testeable sin infraestructura
- Independiente de UI y base de datos
- Centrado en reglas de negocio

## 🧪 Testing

### **Estructura de Tests**
```bash
npm test                # Ejecutar todos los tests
npm run test:watch      # Modo watch para desarrollo
npm run test:coverage   # Reporte de cobertura
```

### **Tipos de Tests**
- **Unit Tests**: Entidades y servicios aislados
- **Integration Tests**: Validaciones de negocio complejas
- **Contract Tests**: Verificar interfaces
- **Property Tests**: Validar invariantes del dominio

---

## 📞 Soporte y Contribuciones

Para reportar issues, solicitar features o contribuir al módulo domain:

1. **Issues**: Usar GitHub Issues del repositorio principal
2. **Features**: Documentar casos de uso y beneficios
3. **Pull Requests**: Seguir convenciones de código existentes
4. **Documentación**: Actualizar README con cambios significativos

---

**Versión**: 1.0.0  
**Última actualización**: Agosto 2025  
**Mantenedores**: Sports Events Team
