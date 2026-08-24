# PymeN Enterprise Full Stack Boilerplate

Base modular para aplicaciones enterprise multi-tenant con NestJS, Next.js App Router, PostgreSQL y Prisma. Soporta múltiples tipos de negocio (boticas, ferreterías, bodegas, restaurantes, peluquerías, gimnasios) con sistema de suscripciones y membresías.

> **Nota**: Este proyecto está configurado para ejecutarse localmente sin Docker. Asegúrate de tener PostgreSQL instalado en tu máquina.

## Estructura de carpetas

```text
PymeN/
├── backend/                    # API NestJS
│   ├── prisma/
│   │   └── schema.prisma       # Modelos: User, Tenant, Subscription, Plan, Payment, TenantModule
│   └── src/
│       ├── auth/               # Registro, login, JWT y autorización
│       │   ├── decorators/     # @Roles() decorator
│       │   ├── dto/            # Login DTO
│       │   ├── guards/         # JwtAuthGuard, RolesGuard
│       │   ├── auth.controller.ts
│       │   ├── auth.module.ts
│       │   ├── auth.service.ts
│       │   ├── jwt-payload.type.ts
│       │   └── jwt.strategy.ts
│       ├── users/              # Gestión de usuarios
│       │   ├── dto/
│       │   ├── repositories/
│       │   ├── users.module.ts
│       │   └── users.service.ts
│       ├── tenants/            # Multi-tenancy
│       │   ├── dto/            # CreateTenantDTO, UpdateTenantDTO
│       │   ├── repositories/
│       │   ├── tenants.controller.ts
│       │   ├── tenants.module.ts
│       │   └── tenants.service.ts
│       ├── subscriptions/      # Suscripciones y membresías
│       │   ├── repositories/
│       │   ├── subscriptions.controller.ts
│       │   ├── subscriptions.module.ts
│       │   └── subscriptions.service.ts
│       ├── plans/              # Planes de suscripción
│       │   ├── repositories/
│       │   ├── plans.controller.ts
│       │   ├── plans.module.ts
│       │   └── plans.service.ts
│       ├── common/             # Utilidades compartidas
│       │   ├── dto/            # PaginationQueryDTO
│       │   ├── filters/        # HttpExceptionFilter
│       │   └── interceptors/   # LoggingInterceptor
│       ├── prisma.module.ts
│       ├── prisma.service.ts
│       ├── app.module.ts
│       └── main.ts
├── frontend/                   # Web Next.js App Router
│   ├── app/
│   │   ├── dashboard/          # Ruta protegida de ejemplo
│   │   ├── login/              # Inicio de sesión
│   │   ├── register/           # Registro de usuarios
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Estilos globales con TailwindCSS
│   ├── components/
│   │   └── ProtectedRoute.tsx  # HOC para rutas protegidas
│   ├── contexts/
│   │   └── AuthContext.tsx     # Estado global de autenticación
│   └── lib/
│       └── api.ts              # Cliente HTTP centralizado
└── package.json                # Workspace raíz
```

## Características principales

### Multi-Tenancy
- **Tenants**: Organizaciones independientes con configuración propia
- **TenantMember**: Usuarios pertenecientes a tenants con roles específicos
- **TenantModule**: Módulos configurables por tipo de negocio
- **Tipos de módulo**: BOTICA, FERRETERIA, BODEGA, RESTAURANTE, PELUQUERIA, GIMNASIO, CUSTOM

### Sistema de Suscripciones
- **Planes**: Definición de planes con ciclos de facturación (MONTHLY, QUARTERLY, YEARLY, LIFETIME)
- **Suscripciones**: Gestión de membresías activas, pendientes, canceladas o expiradas
- **Pagos**: Historial de transacciones con múltiples métodos de pago
- **Períodos de prueba**: Configuración de trial days por plan

### Roles y Permisos
- **Roles globales**: ADMIN, USER
- **Roles por tenant**: TENANT_ADMIN, TENANT_USER
- **Estados de tenant**: ACTIVE, SUSPENDED, EXPIRED, TRIAL

## Inicio rápido

### Prerrequisitos

- **Node.js** >= 18.x (recomendado v20)
- **npm** >= 9.x
- **PostgreSQL** >= 14.x instalado localmente

### Pasos para ejecutar localmente

1. **Instalar PostgreSQL** (si no lo tienes):
   - **Ubuntu/Debian**: `sudo apt-get install postgresql postgresql-contrib`
   - **macOS**: `brew install postgresql` o descargar desde https://postgresapp.com/
   - **Windows**: Descargar desde https://www.postgresql.org/download/windows/

2. **Crear la base de datos**:
   ```bash
   # Acceder a PostgreSQL
   sudo -u postgres psql
   
   # Crear usuario y base de datos (en la consola de PostgreSQL)
   CREATE USER postgres WITH PASSWORD 'postgres' SUPERUSER;
   CREATE DATABASE pymen_dev;
   \q
   ```

3. **Copiar variables de entorno**:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```
   
   > **Importante**: Edita `backend/.env` y ajusta `DATABASE_URL` si tu PostgreSQL tiene credenciales diferentes.

4. **Instalar dependencias**:
   ```bash
   npm install
   ```

5. **Generar Prisma Client**:
   ```bash
   npm run prisma:generate
   ```

6. **Ejecutar migraciones** (crea las tablas en la base de datos):
   ```bash
   npm run prisma:migrate
   ```

7. **Ejecutar el proyecto**:
   
   **Opción A - Ejecutar todo junto** (backend y frontend simultáneamente):
   ```bash
   npm run dev
   ```
   
   **Opción B - Ejecutar por separado** (en terminales diferentes):
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend
   
   # Terminal 2 - Frontend
   npm run dev:frontend
   ```

8. **Acceder a la aplicación**:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3001
   - **Prisma Studio** (opcional, para ver la BD): `npm run prisma:studio`

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm install` o `npm run setup` | Instala dependencias de todos los workspaces |
| `npm run prisma:generate` | Genera Prisma Client |
| `npm run prisma:migrate` | Ejecuta migraciones en desarrollo |
| `npm run prisma:studio` | Abre Prisma Studio para visualizar la base de datos |
| `npm run dev:backend` | Inicia backend en modo desarrollo (puerto 3001) |
| `npm run dev:frontend` | Inicia frontend en modo desarrollo (puerto 3000) |
| `npm run dev` | Inicia backend y frontend simultáneamente |
| `npm run build` | Construye backend y frontend para producción |
| `npm run test -w backend` | Ejecuta tests del backend |
| `npm run lint -w backend` | Ejecuta linter en backend |
| `npm run lint -w frontend` | Ejecuta linter en frontend |

## Manual de expansión

Para crear una funcionalidad independiente, por ejemplo `inventario`:

1. **Modelo de datos:** agrega modelos en `backend/prisma/schema.prisma`. Usa campos `Json` para flexibilidad documental cuando necesites almacenar datos variables por tipo de negocio.

2. **Migración:** ejecuta `npm run prisma:migrate -w backend -- --name add-inventario`.

3. **Módulo backend:** crea `backend/src/inventario/inventario.module.ts` e impórtalo en `backend/src/app.module.ts`.

4. **DTOs:** define contratos en `backend/src/inventario/dto/` para validar entrada. Usa `class-validator` y `class-transformer`.

5. **Repositorio:** crea `backend/src/inventario/repositories/inventario.repository.ts` para encapsular consultas Prisma.

6. **Servicio:** crea `backend/src/inventario/inventario.service.ts` con la lógica de aplicación.

7. **Controlador:** crea `backend/src/inventario/inventario.controller.ts` con rutas REST. Protege rutas con `@UseGuards(JwtAuthGuard)` y usa `@Roles()` cuando aplique.

8. **Paginación:** usa `PaginationQueryDTO` de `backend/src/common/dto/` para endpoints que retornen listas.

9. **Frontend:** crea rutas en `frontend/app/inventario`, componentes en `frontend/components/inventario` y funciones de API en `frontend/lib/`.

10. **Protección de rutas:** usa el componente `ProtectedRoute` para envolver páginas que requieran autenticación.

11. **Pruebas:** añade tests unitarios para servicios/repositorios y tests de integración para controladores críticos.

12. **Escalabilidad:** si el módulo crece, separa subdominios y eventos sin romper la interfaz pública del módulo.

## Consideraciones de arquitectura

### Backend
- **Inyección de dependencias:** Todos los servicios y repositorios siguen el patrón de inyección de NestJS
- **Validación:** Los DTOs usan `class-validator` para validación automática
- **Interceptores:** LoggingInterceptor registra todas las peticiones HTTP
- **Filtros de excepción:** HttpExceptionFilter maneja errores de forma consistente

### Frontend
- **App Router:** Next.js 14 con App Router y Server Components
- **Estilos:** TailwindCSS para estilizado utility-first
- **Estado global:** AuthContext provee estado de autenticación a toda la aplicación
- **API client:** Funciones centralizadas en `lib/api.ts` para comunicación con backend

### Base de datos
- **PostgreSQL:** Base de datos relacional principal
- **Prisma ORM:** Type-safe database access con migraciones versionadas
- **Campos JSON:** Para configuración flexible y datos específicos por negocio
