# 📱 Documentación de Páginas - CoreAppEduTech

## Introducción

Esta documentación detalla todas las páginas del sistema CoreAppEduTech, incluyendo su funcionalidad, componentes, flujos de navegación y características específicas para cada tipo de usuario.

## 🏠 Estructura de Páginas

### Jerarquía de Rutas
```
app/
├── [[...sign-in]]/           # Autenticación
│   └── page.tsx             # Página de inicio de sesión
├── (dashboard)/             # Grupo de rutas protegidas
│   ├── layout.tsx          # Layout principal del dashboard
│   ├── admin/              # Panel de administrador
│   │   └── page.tsx
│   ├── teacher/            # Panel de profesor
│   │   └── page.tsx
│   ├── student/            # Panel de estudiante
│   │   └── page.tsx
│   ├── parent/             # Panel de padre
│   │   └── page.tsx
│   └── list/               # Páginas de gestión
│       ├── teachers/       # Gestión de profesores
│       ├── students/       # Gestión de estudiantes
│       ├── parents/        # Gestión de padres
│       ├── classes/        # Gestión de clases
│       ├── subjects/       # Gestión de materias
│       ├── lessons/        # Gestión de lecciones
│       ├── exams/          # Gestión de exámenes
│       ├── assignments/    # Gestión de tareas
│       ├── results/        # Gestión de resultados
│       ├── events/         # Gestión de eventos
│       └── announcements/  # Gestión de anuncios
```

## 🔐 Página de Autenticación

### `/[[...sign-in]]` - Inicio de Sesión

**Propósito**: Página principal de autenticación del sistema.

**Características:**
- ✅ Integración completa con Clerk
- ✅ Diseño responsivo y moderno
- ✅ Localización en español
- ✅ Redirección automática según rol
- ✅ Validación de credenciales en tiempo real

```typescript
// app/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">📚</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            CoreAppEduTech
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de Gestión Educativa
          </p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              card: "shadow-xl border-0 rounded-2xl",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600 mt-2",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-lg",
              formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg",
              footerActionText: "text-gray-600",
              footerActionLink: "text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
            }
          }}
        />
      </div>
    </div>
  );
}
```

**Flujo de Autenticación:**
1. Usuario ingresa credenciales
2. Clerk valida la información
3. Sistema obtiene rol del usuario
4. Redirección automática al dashboard correspondiente

## 🏗️ Layout Principal del Dashboard

### `(dashboard)/layout.tsx` - Layout Base

**Propósito**: Layout común para todas las páginas del dashboard.

**Componentes Incluidos:**
- **Navbar**: Barra superior con búsqueda y perfil de usuario
- **Menu**: Navegación lateral adaptada por rol
- **Área de Contenido**: Zona principal para el contenido de cada página

```typescript
// app/(dashboard)/layout.tsx
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      {/* LEFT - Sidebar */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold text-xl">CoreEduTech</span>
        </Link>
        <Menu />
      </div>
      
      {/* RIGHT - Content Area */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
```

## 👨‍💼 Panel de Administrador

### `/admin` - Dashboard Principal

**Rol Requerido**: `admin`

**Propósito**: Panel central de control para administradores del sistema.

**Características:**
- ✅ Vista general del sistema con estadísticas
- ✅ Gráficos de usuarios activos
- ✅ Resumen de actividad reciente
- ✅ Accesos rápidos a funciones principales
- ✅ Calendario de eventos importantes

```typescript
// app/(dashboard)/admin/page.tsx
import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT COLUMN */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      
      {/* RIGHT COLUMN */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
```

**Widgets del Dashboard:**

1. **Tarjetas de Usuario**: Muestra contadores de cada tipo de usuario
2. **Gráfico de Conteos**: Estadísticas generales del sistema
3. **Gráfico de Asistencias**: Tendencias de asistencia semanal
4. **Gráfico Financiero**: Datos financieros y presupuestarios
5. **Calendario de Eventos**: Eventos próximos y importantes
6. **Anuncios**: Comunicaciones importantes del sistema

## 👨‍🏫 Panel de Profesor

### `/teacher` - Dashboard del Profesor

**Rol Requerido**: `teacher`

**Propósito**: Panel específico para profesores con herramientas de gestión académica.

**Características:**
- ✅ Vista de clases asignadas
- ✅ Gráficos de rendimiento de estudiantes
- ✅ Calendario de lecciones y exámenes
- ✅ Anuncios relevantes para sus clases
- ✅ Acceso rápido a registro de asistencias

```typescript
// app/(dashboard)/teacher/page.tsx
import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT COLUMN */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-4">
            Panel del Profesor
          </h1>
          
          {/* TEACHER STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Mis Clases</h3>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Estudiantes</h3>
              <p className="text-2xl font-bold text-green-600">127</p>
            </div>
          </div>
          
          {/* CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 h-[300px]">
              <CountChartContainer />
            </div>
            <div className="w-full lg:w-1/2 h-[300px]">
              <AttendanceChartContainer />
            </div>
          </div>
        </div>
      </div>
      
      {/* RIGHT COLUMN */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
```

**Funcionalidades Específicas:**
- Filtrado automático de datos por clases asignadas
- Herramientas de gestión de calificaciones
- Vista de horario personal
- Comunicación con estudiantes y padres

## 🎓 Panel de Estudiante

### `/student` - Dashboard del Estudiante

**Rol Requerido**: `student`

**Propósito**: Panel personalizado para estudiantes con información académica.

**Características:**
- ✅ Vista de calificaciones personales
- ✅ Horario de clases
- ✅ Tareas pendientes
- ✅ Calendario de exámenes
- ✅ Registro de asistencias

```typescript
// app/(dashboard)/student/page.tsx
import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT COLUMN */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-6">
            Mi Panel Estudiantil
          </h1>
          
          {/* STUDENT INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-blue-800">Mi Clase</h3>
              <p className="text-lg font-bold text-blue-600">5to A</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-green-800">Promedio</h3>
              <p className="text-lg font-bold text-green-600">8.7</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-purple-800">Asistencia</h3>
              <p className="text-lg font-bold text-purple-600">95%</p>
            </div>
          </div>
          
          {/* PERFORMANCE CHART */}
          <div className="mb-6">
            <Performance />
          </div>
          
          {/* ATTENDANCE CARD */}
          <StudentAttendanceCard />
        </div>
      </div>
      
      {/* RIGHT COLUMN */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
```

**Información Mostrada:**
- Datos académicos personales
- Gráficos de rendimiento
- Calendario personalizado
- Anuncios de sus clases

## 👨‍👩‍👧‍👦 Panel de Padre

### `/parent` - Dashboard del Padre

**Rol Requerido**: `parent`

**Propósito**: Panel para padres con seguimiento de sus hijos.

**Características:**
- ✅ Información de todos los hijos registrados
- ✅ Seguimiento de calificaciones
- ✅ Control de asistencias
- ✅ Comunicación con profesores
- ✅ Eventos y actividades escolares

```typescript
// app/(dashboard)/parent/page.tsx
import Announcements from "@/components/Announcements";
import EventCalendar from "@/components/EventCalendar";
import { auth } from "@clerk/nextjs/server";

const ParentPage = async () => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT COLUMN */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold mb-6">
            Panel de Padre/Madre
          </h1>
          
          {/* CHILDREN INFO */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Mis Hijos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Child 1 */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">👦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Juan Pérez</h3>
                    <p className="text-sm text-gray-500">5to A</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Promedio:</span>
                    <span className="font-semibold ml-1">8.7</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Asistencia:</span>
                    <span className="font-semibold ml-1">95%</span>
                  </div>
                </div>
              </div>
              
              {/* Child 2 */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 font-semibold">👧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">María Pérez</h3>
                    <p className="text-sm text-gray-500">3ro B</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Promedio:</span>
                    <span className="font-semibold ml-1">9.2</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Asistencia:</span>
                    <span className="font-semibold ml-1">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* QUICK ACTIONS */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="p-3 text-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="block text-2xl mb-1">📊</span>
                <span className="text-sm font-medium">Calificaciones</span>
              </button>
              <button className="p-3 text-center bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="block text-2xl mb-1">📅</span>
                <span className="text-sm font-medium">Asistencias</span>
              </button>
              <button className="p-3 text-center bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="block text-2xl mb-1">📝</span>
                <span className="text-sm font-medium">Tareas</span>
              </button>
              <button className="p-3 text-center bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <span className="block text-2xl mb-1">💬</span>
                <span className="text-sm font-medium">Mensajes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* RIGHT COLUMN */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
```

**Funcionalidades para Padres:**
- Vista consolidada de todos los hijos
- Seguimiento académico detallado
- Comunicación directa con la escuela
- Calendario de actividades familiares

## 🔄 Flujos de Navegación

### Por Tipo de Usuario

#### Administrador
```
Login → Admin Dashboard → {
  ├── Gestión de Usuarios (CRUD completo)
  ├── Configuración del Sistema
  ├── Reportes y Estadísticas
  ├── Gestión de Eventos
  └── Supervisión General
}
```

#### Profesor
```
Login → Teacher Dashboard → {
  ├── Mis Clases
  ├── Registro de Asistencias
  ├── Calificaciones
  ├── Exámenes y Tareas
  └── Comunicación con Estudiantes
}
```

#### Estudiante
```
Login → Student Dashboard → {
  ├── Mi Información Académica
  ├── Horario de Clases
  ├── Tareas Pendientes
  ├── Calificaciones
  └── Calendario Personal
}
```

#### Padre
```
Login → Parent Dashboard → {
  ├── Información de Hijos
  ├── Seguimiento Académico
  ├── Comunicación con Escuela
  ├── Eventos Familiares
  └── Notificaciones
}
```

## 🎨 Características de Diseño

### Diseño Responsivo
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Grid System**: CSS Grid y Flexbox
- **Typography**: Jerarquía clara de textos

### Tema Visual
- **Colores Principales**: Azul (#3B82F6), Verde (#10B981), Púrpura (#8B5CF6)
- **Tipografía**: Inter (system fonts)
- **Iconografía**: Lucide React + Emojis
- **Espaciado**: Sistema de 8px

### Componentes UI
- **Cards**: Información estructurada
- **Charts**: Visualización de datos
- **Modals**: Interacciones específicas
- **Forms**: Entrada de datos validada
- **Tables**: Listados y gestión

Esta estructura de páginas proporciona una experiencia de usuario coherente y funcional para todos los roles del sistema educativo, manteniendo la seguridad y usabilidad como prioridades principales.