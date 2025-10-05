# 📚 CoreAppEduTech - Documentación Completa

## 🎯 Descripción General

**CoreAppEduTech** es un sistema integral de gestión educativa desarrollado con Next.js 14, diseñado para administrar instituciones educativas de manera eficiente. Incluye gestión de estudiantes, profesores, padres, clases, evaluaciones y asistencias con una interfaz completamente en español.

---

## 🛠️ Arquitectura y Tecnologías

### Stack Tecnológico
- **Frontend**: Next.js 14.2.5 + React 18 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Base de Datos**: PostgreSQL 15+
- **Autenticación**: Clerk
- **Contenedores**: Docker + Docker Compose
- **Validación**: Zod + React Hook Form
- **UI/UX**: Gráficos con Recharts, Calendario con React Big Calendar

### Arquitectura de la Aplicación
```
├── Frontend (Next.js App Router)
│   ├── Dashboard Roles (Admin, Teacher, Student, Parent)
│   ├── Páginas de Listados (CRUD)
│   └── Formularios y Componentes
├── Backend (API Routes + Server Actions)
├── Base de Datos (PostgreSQL + Prisma)
└── Autenticación (Clerk)
```

---

## 🔐 Autenticación y Roles (Clerk)

### Configuración de Clerk
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Sistema de Roles
- **Admin**: Control total del sistema
- **Teacher**: Gestión de clases, evaluaciones y asistencias
- **Student**: Consulta de horarios, calificaciones y tareas
- **Parent**: Seguimiento del progreso de sus hijos

### Middleware de Protección
El archivo `src/middleware.ts` gestiona el acceso basado en roles:
```typescript
// Rutas protegidas por rol
const roleMatchers = [
  { matcher: createRouteMatcher(["/admin(.*)"]), allowedRoles: ["admin"] },
  { matcher: createRouteMatcher(["/teacher(.*)"]), allowedRoles: ["teacher"] },
  { matcher: createRouteMatcher(["/student(.*)"]), allowedRoles: ["student"] },
  { matcher: createRouteMatcher(["/parent(.*)"]), allowedRoles: ["parent"] }
];
```

---

## 🐳 Docker y Desarrollo

### Configuración Docker
```yaml
# docker-compose.yml - Servicios principales
services:
  web:          # Aplicación Next.js
  postgres:     # Base de datos PostgreSQL
  redis:        # Cache (opcional)
  pgadmin:      # Administración DB (desarrollo)
```

### Comandos Útiles
```bash
# Desarrollo
docker-compose up --build
docker-compose logs -f web

# Producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Base de datos
docker-compose exec postgres psql -U edutech -d edutech_db
```

---

## 🗄️ Base de Datos (PostgreSQL + Prisma)

### Modelos Principales
```prisma
model Student {
  id          String       @id
  username    String       @unique
  name        String
  surname     String
  email       String?      @unique
  classId     Int
  class       Class        @relation(fields: [classId], references: [id])
  parentId    String
  parent      Parent       @relation(fields: [parentId], references: [id])
  attendances Attendance[]
  results     Result[]
}

model Teacher {
  id       String    @id
  username String    @unique
  name     String
  surname  String
  subjects Subject[]
  lessons  Lesson[]
  classes  Class[]
}

model Class {
  id           Int            @id @default(autoincrement())
  name         String         @unique
  capacity     Int
  students     Student[]
  lessons      Lesson[]
  events       Event[]
  announcements Announcement[]
}
```

### Comandos Prisma
```bash
npx prisma generate          # Generar cliente
npx prisma migrate dev       # Aplicar migraciones
npx prisma studio           # Interfaz visual
npx prisma db seed          # Datos de prueba
```

---

## 📱 Estructura de Páginas

### Dashboard Principal
- **Admin** (`/admin`): Estadísticas generales, gráficos, gestión completa
- **Teacher** (`/teacher`): Horarios, clases asignadas, evaluaciones
- **Student** (`/student`): Horario personal, calificaciones, tareas
- **Parent** (`/parent`): Progreso de hijos, comunicación, eventos

### Páginas de Listados (`/list/`)
| Página | Ruta | Funcionalidad | Roles |
|--------|------|---------------|-------|
| Profesores | `/list/teachers` | CRUD profesores | Admin |
| Estudiantes | `/list/students` | CRUD estudiantes | Admin, Teacher |
| Padres | `/list/parents` | CRUD padres | Admin |
| Clases | `/list/classes` | CRUD clases | Admin |
| Materias | `/list/subjects` | CRUD materias | Admin |
| Lecciones | `/list/lessons` | CRUD lecciones | Admin, Teacher |
| Exámenes | `/list/exams` | CRUD exámenes | Admin, Teacher |
| Tareas | `/list/assignments` | CRUD tareas | Admin, Teacher |
| Resultados | `/list/results` | Ver calificaciones | Admin, Teacher |
| Anuncios | `/list/announcements` | CRUD anuncios | Admin, Teacher |
| Eventos | `/list/events` | CRUD eventos | Admin, Teacher |

### Características de Listados
- **Búsqueda**: Filtrado en tiempo real
- **Paginación**: 10 elementos por página
- **Operaciones CRUD**: Crear, leer, actualizar, eliminar
- **Permisos**: Basados en roles de usuario

---

## 📝 Sistema de Formularios

### Formularios Disponibles
1. **TeacherForm**: Registro/edición de profesores
2. **StudentForm**: Registro/edición de estudiantes
3. **ParentForm**: Registro/edición de padres
4. **ClassForm**: Creación/edición de clases
5. **SubjectForm**: Gestión de materias
6. **LessonForm**: Programación de lecciones
7. **ExamForm**: Creación de exámenes
8. **AssignmentForm**: Asignación de tareas
9. **AnnouncementForm**: Publicación de anuncios
10. **EventForm**: Programación de eventos

### Tecnología de Formularios
```typescript
// Ejemplo: StudentForm con validación Zod
const studentSchema = z.object({
  username: z.string().min(3, "Mínimo 3 caracteres"),
  name: z.string().min(1, "Campo requerido"),
  email: z.string().email("Email inválido").optional(),
  classId: z.coerce.number().min(1, "Selecciona una clase")
});

// React Hook Form
const form = useForm<StudentSchema>({
  resolver: zodResolver(studentSchema)
});
```

### Características
- **Validación en tiempo real** con Zod
- **Manejo de estados** con React Hook Form
- **Subida de imágenes** con Cloudinary
- **Interfaz en español** completa
- **Feedback visual** con toasts

---

## 🧩 Componentes Principales

### Componentes de Navegación
- **Menu**: Navegación lateral con roles
- **Navbar**: Barra superior con búsqueda y perfil
- **TableSearch**: Búsqueda en tiempo real
- **Pagination**: Navegación entre páginas

### Componentes de Visualización
- **CountChart**: Gráficos de conteo (estudiantes, profesores)
- **AttendanceChart**: Gráfico de asistencias semanales
- **FinanceChart**: Gráficos financieros
- **BigCalendar**: Calendario principal con eventos
- **EventCalendar**: Calendario lateral de eventos

### Componentes de Datos
- **Table**: Tablas reutilizables con acciones
- **UserCard**: Tarjetas de información de usuarios
- **Performance**: Gráfico de rendimiento estudiantil
- **Announcements**: Lista de anuncios
- **FormContainer**: Contenedor modal para formularios

### Componentes de Input
- **InputField**: Campo de entrada reutilizable
- **FormModal**: Modal para formularios
- **StudentAttendanceCard**: Tarjeta de asistencia

---

## ⚙️ Funciones y Acciones del Servidor

### Acciones Principales (`src/lib/actions.ts`)
```typescript
// Gestión de usuarios
export const createTeacher = async (formData: TeacherSchema) => { ... }
export const updateTeacher = async (formData: TeacherSchema) => { ... }
export const deleteTeacher = async (formData: FormData) => { ... }

// Gestión académica
export const createClass = async (formData: ClassSchema) => { ... }
export const createExam = async (formData: ExamSchema) => { ... }
export const createAssignment = async (formData: AssignmentSchema) => { ... }

// Autenticación
export const clerkClient = createClerkClient({ ... })
```

### Utilidades (`src/lib/`)
- **prisma.ts**: Cliente de base de datos
- **utils.ts**: Funciones auxiliares para fechas y horarios
- **settings.ts**: Configuraciones globales (ITEM_PER_PAGE)
- **data.ts**: Datos estáticos y opciones
- **formValidationSchemas.ts**: Esquemas de validación Zod

---

## 🚀 Guía de Instalación y Despliegue

### Instalación Local
```bash
# 1. Clonar repositorio
git clone https://github.com/joselohu/myEduTechApp.git
cd myEduTechApp

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Configurar base de datos
npx prisma migrate dev
npx prisma db seed

# 5. Ejecutar aplicación
npm run dev
```

### Variables de Entorno Requeridas
```env
# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/edutech_db"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Cloudinary (opcional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Despliegue con Docker
```bash
# Desarrollo
docker-compose up --build

# Producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Despliegue en Vercel
1. Conectar repositorio de GitHub
2. Configurar variables de entorno
3. Configurar base de datos PostgreSQL (Neon, Supabase, etc.)
4. Deploy automático

---

## 📊 Características Principales del Sistema

### Gestión de Usuarios
- **Registro masivo** de estudiantes/profesores
- **Perfiles completos** con foto y datos personales
- **Autenticación segura** con Clerk
- **Roles y permisos** granulares

### Gestión Académica
- **Organización por grados** y clases
- **Horarios dinámicos** por día de la semana
- **Evaluaciones y tareas** con fechas límite
- **Sistema de calificaciones** integrado

### Seguimiento y Reportes
- **Asistencias diarias** por estudiante
- **Gráficos de rendimiento** en tiempo real
- **Estadísticas institucionales** completas
- **Exportación de datos** (futuro)

### Comunicación
- **Sistema de anuncios** por clase
- **Calendario de eventos** institucional
- **Portal de padres** para seguimiento
- **Notificaciones** integradas

---

## 🔧 Comandos de Desarrollo

### Base de Datos
```bash
npx prisma studio              # Ver datos
npx prisma migrate reset       # Resetear DB
npx prisma generate           # Regenerar cliente
```

### Docker
```bash
docker-compose logs -f web    # Ver logs
docker-compose down --volumes # Limpiar todo
docker system prune          # Limpiar imágenes
```

### Next.js
```bash
npm run dev                   # Desarrollo
npm run build                # Construir
npm start                    # Producción
npm run lint                 # Linting
```

---

## 🚨 Solución de Problemas Comunes

### Error de Conexión a Base de Datos
```bash
# Verificar PostgreSQL
docker-compose ps
docker-compose logs postgres

# Recrear base de datos
npx prisma migrate reset
```

### Problemas de Autenticación
```bash
# Verificar variables de Clerk
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo $CLERK_SECRET_KEY

# Reiniciar desarrollo
npm run dev
```

### Problemas de Docker
```bash
# Limpiar y reconstruir
docker-compose down --volumes
docker-compose up --build
```

---

## 📈 Roadmap y Mejoras Futuras

### Funcionalidades Planificadas
- [ ] **Comunicación en tiempo real** (WebSockets)
- [ ] **Aplicación móvil** (React Native)
- [ ] **Reportes avanzados** (PDF, Excel)
- [ ] **Sistema de pagos** integrado
- [ ] **Múltiples idiomas** (i18n)
- [ ] **API REST** completa
- [ ] **Backup automático** de datos
- [ ] **Integración con Google Classroom**

### Optimizaciones Técnicas
- [ ] **Cache con Redis** para mejor rendimiento
- [ ] **CDN** para archivos estáticos
- [ ] **Monitoreo** con Sentry
- [ ] **Tests automatizados** (Jest, Cypress)
- [ ] **CI/CD** con GitHub Actions

---

## 📞 Soporte y Contribución

### Documentación Adicional
- **GitHub**: https://github.com/joselohu/myEduTechApp
- **Issues**: Para reportar problemas
- **Discussions**: Para sugerencias

### Tecnologías de Referencia
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**CoreAppEduTech** - Sistema integral de gestión educativa desarrollado con las mejores prácticas de desarrollo web moderno. 🎓✨