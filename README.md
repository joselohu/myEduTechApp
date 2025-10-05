# 🎓 CoreAppEduTech - Sistema de Gestión Educativa

[Documentacion EduTech.pdf](https://github.com/user-attachments/files/22450008/Documentacion.EduTech.pdf)

## 📋 Descripción

**CoreAppEduTech** es un sistema integral de gestión educativa desarrollado con Next.js 14, diseñado para facilitar la administración de instituciones educativas. El sistema permite gestionar estudiantes, profesores, padres, clases, materias, exámenes, tareas y asistencias de manera eficiente y escalable.

## ✨ Características Principales

### 👥 Gestión de Usuarios
- **Estudiantes**: Registro completo con información personal, académica y familiar
- **Profesores**: Gestión de docentes con materias asignadas y horarios
- **Padres**: Portal para seguimiento del progreso de sus hijos
- **Administradores**: Control total del sistema y configuraciones

### 📚 Gestión Académica
- **Clases y Grados**: Organización por niveles educativos
- **Materias**: Asignación de materias por profesor y clase
- **Lecciones**: Programación de horarios y contenidos
- **Exámenes**: Creación y gestión de evaluaciones
- **Tareas**: Asignación y seguimiento de trabajos

### 📊 Seguimiento y Reportes
- **Asistencias**: Control diario de presencia estudiantil
- **Calificaciones**: Registro y seguimiento de resultados
- **Eventos**: Calendario de actividades institucionales
- **Anuncios**: Sistema de comunicación interna

### 📱 Características de la Interfaz
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **Dashboard Interactivo**: Gráficos y estadísticas en tiempo real
- **Búsqueda Avanzada**: Filtros y búsqueda en todas las secciones
- **Calendario Integrado**: Visualización de eventos y horarios
- **Interfaz en Español**: Completamente localizada

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14.2.5**: Framework de React con App Router
- **React 18**: Biblioteca de interfaz de usuario
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS**: Framework de estilos utilitarios
- **React Hook Form**: Gestión de formularios
- **Zod**: Validación de esquemas

### Backend y Base de Datos
- **Prisma ORM**: Object-Relational Mapping para PostgreSQL
- **PostgreSQL**: Base de datos relacional
- **Clerk**: Autenticación y gestión de usuarios

### Herramientas y Utilidades
- **React Big Calendar**: Calendario interactivo
- **Recharts**: Gráficos y visualizaciones
- **React Toastify**: Notificaciones
- **Next Cloudinary**: Gestión de imágenes
- **Docker**: Containerización para desarrollo y producción

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18 o superior
- PostgreSQL 13 o superior
- npm, yarn, pnpm o bun

### 1. Clonar el Repositorio
```bash
git clone https://github.com/joselohu/eduTechApp.git
cd edutech
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Variables de Entorno
Crear un archivo `.env.local` con las siguientes variables:

```env
# Base de Datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/edutech_db"

# Clerk (Autenticación)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_publica_clerk
CLERK_SECRET_KEY=tu_clave_secreta_clerk

# Cloudinary (Opcional - para imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
```

### 4. Configurar Base de Datos
```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Sembrar datos de prueba (opcional)
npx prisma db seed
```

### 5. Ejecutar en Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🐳 Instalación con Docker

### Desarrollo con Docker
```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### Producción con Docker
```bash
# Ejecutar en modo producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 📁 Estructura del Proyecto

```
edutech/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── (dashboard)/        # Rutas del dashboard
│   │   │   ├── admin/         # Panel de administrador
│   │   │   ├── teacher/       # Panel de profesor
│   │   │   ├── student/       # Panel de estudiante
│   │   │   ├── parent/        # Panel de padre
│   │   │   └── list/          # Páginas de listados
│   │   └── [[...sign-in]]/    # Autenticación
│   ├── components/             # Componentes reutilizables
│   │   ├── forms/             # Formularios
│   │   └── ...                # Otros componentes
│   └── lib/                   # Utilidades y configuraciones
├── prisma/                    # Esquema y migraciones de BD
├── public/                    # Archivos estáticos
├── docs/                      # Documentación
└── docker-compose.yml         # Configuración Docker
```

## 👤 Roles y Permisos

### Administrador
- Gestión completa de usuarios
- Configuración del sistema
- Acceso a todos los reportes
- Gestión de clases y materias

### Profesor
- Gestión de sus clases asignadas
- Registro de asistencias
- Creación de exámenes y tareas
- Ingreso de calificaciones

### Estudiante
- Visualización de horarios
- Consulta de calificaciones
- Acceso a tareas y exámenes
- Calendario personal

### Padre
- Seguimiento del progreso de sus hijos
- Consulta de asistencias
- Comunicación con profesores
- Acceso a anuncios

## 📊 Comandos Útiles

### Desarrollo
```bash
# Modo desarrollo
npm run dev

# Construcción para producción
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint
```

### Base de Datos
```bash
# Ver base de datos visualmente
npx prisma studio

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Resetear base de datos
npx prisma migrate reset

# Aplicar cambios al esquema
npx prisma db push
```

### Docker
```bash
# Construir imagen
docker build -t edutech-app .

# Ver logs de servicio específico
docker-compose logs -f web

# Ejecutar comando en contenedor
docker-compose exec web bash

# Limpiar contenedores
docker-compose down --volumes
```

## 🔧 Configuración Avanzada

### Personalización de Temas
El sistema utiliza Tailwind CSS. Puedes personalizar los colores y estilos en `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        lamaSky: '#C3EBFA',
        lamaSkyLight: '#EDF9FD',
        lamaPurple: '#CFCEFF',
        // Agregar tus colores personalizados
      }
    }
  }
}
```

### Variables de Entorno para Producción
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
CLERK_SECRET_KEY=tu_clave_secreta
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_publica
```

## 📚 Documentación Adicional

- [📊 Documentación de Base de Datos](./docs/DATABASE.md)
- [🐳 Guía de Docker](./docs/DOCKER.md)
- [🔐 Configuración de Clerk](https://clerk.com/docs)
- [📱 Guía de Next.js](https://nextjs.org/docs)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu función (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -m 'Agregar nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte y Problemas

Si encuentras algún problema o tienes preguntas:

1. Revisa la [documentación](./docs/)
2. Busca en los [issues existentes](https://github.com/joselohu/eduTechApp/issues)
3. Crea un nuevo issue si es necesario
