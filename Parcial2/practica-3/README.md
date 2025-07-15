## 📄 `README.md` — practica-3

# 📡 Práctica 3 - CRUD en Tiempo Real con NestJS + WebSockets

Este proyecto implementa una API en **NestJS** con soporte de **WebSockets en tiempo real** para tres entidades relacionadas con la detección de plagas en cultivos:

- 📷 `Captura` — Almacena la información de imágenes tomadas en campo.
- 🔔 `Notificacion` — Gestiona alertas generadas por la detección automática.
- 🧠 `ProcesamientoIA` — Registra los resultados generados por la inteligencia artificial.

> Se utilizó **SQLite** como base de datos embebida y **TypeORM** como ORM.

---

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [WebSockets](https://docs.nestjs.com/websockets/gateways)
- [Socket.IO](https://socket.io/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)
- [Postman](https://www.postman.com/) para pruebas

---

## ⚙️ Instalación

```bash
git clone <repositorio>
cd practica-3
npm install
````

---

## ▶️ Ejecución del servidor

```bash
npm run start:dev
```

La API estará disponible en:

* REST: `http://localhost:3000`
* WebSocket: `ws://localhost:3000`

---

## 🧩 Estructura de entidades

### 📷 Captura

| Campo       | Tipo    | Descripción                      |
| ----------- | ------- | -------------------------------- |
| id          | number  | ID autogenerado                  |
| fecha       | string  | Fecha de la captura (YYYY-MM-DD) |
| imagenUrl   | string  | URL de la imagen                 |
| descripcion | string  | Descripción de la imagen         |
| procesada   | boolean | ¿Ya fue analizada por IA?        |

---

### 🔔 Notificacion

| Campo      | Tipo    | Descripción              |
| ---------- | ------- | ------------------------ |
| id         | number  | ID autogenerado          |
| mensaje    | string  | Mensaje de la alerta     |
| leida      | boolean | ¿El usuario la ha leído? |
| fechaEnvio | string  | Fecha y hora del envío   |

---

### 🧠 ProcesamientoIA

| Campo              | Tipo   | Descripción                       |
| ------------------ | ------ | --------------------------------- |
| id                 | number | ID autogenerado                   |
| capturaId          | number | Relación con la entidad Captura   |
| resultado          | string | Resultado del análisis            |
| confianza          | float  | Porcentaje de certeza (0.0 a 1.0) |
| fechaProcesamiento | string | Fecha y hora del procesamiento    |

---

## 🔁 WebSocket: Eventos disponibles

Conéctate desde Postman o Insomnia a:

```
ws://localhost:3000
```

---

### 📷 Captura

| Acción     | Evento               | Payload JSON                        |
| ---------- | -------------------- | ----------------------------------- |
| Crear      | `crearCaptura`       | `{ fecha, imagenUrl, descripcion }` |
| Listar     | `listarCapturas`     | —                                   |
| Actualizar | `actualizarCaptura`  | `{ id, dto: { ... } }`              |
| Eliminar   | `eliminarCaptura`    | `id`                                |
| Broadcast  | `capturaActualizada` | Lista actualizada emitida a todos   |

---

### 🔔 Notificación

| Acción     | Evento                    | Payload JSON                     |
| ---------- | ------------------------- | -------------------------------- |
| Crear      | `crearNotificacion`       | `{ mensaje, leida, fechaEnvio }` |
| Listar     | `listarNotificaciones`    | —                                |
| Actualizar | `actualizarNotificacion`  | `{ id, dto: { ... } }`           |
| Eliminar   | `eliminarNotificacion`    | `id`                             |
| Broadcast  | `notificacionActualizada` | Lista actualizada                |

---

### 🧠 ProcesamientoIA

| Acción     | Evento                     | Payload JSON                                              |
| ---------- | -------------------------- | --------------------------------------------------------- |
| Crear      | `crearProcesamiento`       | `{ capturaId, resultado, confianza, fechaProcesamiento }` |
| Listar     | `listarProcesamientos`     | —                                                         |
| Actualizar | `actualizarProcesamiento`  | `{ id, dto: { ... } }`                                    |
| Eliminar   | `eliminarProcesamiento`    | `id`                                                      |
| Broadcast  | `procesamientoActualizado` | Lista actualizada emitida a todos                         |

---

## 🧪 Ejemplo de prueba con Postman (crear captura)

1. Abre una nueva conexión WebSocket a:

```
ws://localhost:3000
```

2. En el campo "Message", envía:

```json
{
  "event": "crearCaptura",
  "data": {
    "fecha": "2025-07-16",
    "imagenUrl": "http://ejemplo.com/foto.jpg",
    "descripcion": "Imagen parcela A",
    "procesada": false
  }
}
```

3. Recibirás como respuesta el evento `capturaActualizada` con la lista de capturas.

---

## 📂 Estructura del proyecto

```
src/
├── captura/
│   ├── captura.entity.ts
│   ├── captura.service.ts
│   ├── captura.gateway.ts
│   └── dto/
├── notificacion/
│   ├── notificacion.entity.ts
│   ├── notificacion.service.ts
│   ├── notificacion.gateway.ts
│   └── dto/
├── procesamiento-ia/
│   ├── procesamiento-ia.entity.ts
│   ├── procesamiento-ia.service.ts
│   ├── procesamiento-ia.gateway.ts
│   └── dto/
```

---

## 🧠 Consideraciones

* Usa `synchronize: true` solo en desarrollo.
* Todos los eventos son únicos para evitar colisiones.
* Se puede probar en paralelo desde múltiples clientes Postman.
* Puedes ampliar validaciones con `class-validator`.

---

## 📘 Referencias

* [NestJS WebSockets](https://docs.nestjs.com/websockets/gateways)
* [Postman WebSocket](https://blog.postman.com/postman-supports-websocket-apis/)
* [TypeORM Docs](https://typeorm.io/)

---

