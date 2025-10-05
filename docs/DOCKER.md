# 🐳 Documentación Completa de Docker - CoreAppEduTech

## Introducción

CoreAppEduTech utiliza Docker para proporcionar un entorno de desarrollo y producción consistente, reproducible y escalable. Esta documentación cubre todos los aspectos de la containerización del sistema educativo.

## 🎯 Objetivos de la Containerización

### Beneficios Implementados
- **Consistencia de Entorno**: Mismo comportamiento en desarrollo, testing y producción
- **Aislamiento de Dependencias**: Cada servicio en su propio contenedor
- **Escalabilidad Horizontal**: Fácil escalamiento de servicios específicos
- **Portabilidad**: Funciona en cualquier sistema que soporte Docker
- **Despliegue Simplificado**: Un solo comando para levantar toda la infraestructura
- **Desarrollo Eficiente**: Configuración rápida para nuevos desarrolladores

## 🏗️ Arquitectura de Contenedores

### Servicios Principales
```yaml
┌─────────────────────────────────────────────────────────────┐
│                    STACK DE DESARROLLO                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │   Next.js   │ │ PostgreSQL  │ │        Redis            │ │
│  │   Web App   │ │  Database   │ │        Cache            │ │
│  │   :3000     │ │   :5432     │ │        :6379            │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │  PgAdmin    │ │   Nginx     │ │     File Storage        │ │
│  │    :5050    │ │   :80       │ │      Uploads            │ │
│  │    (dev)    │ │   (prod)    │ │      Volume             │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Diagrama de Red
```mermaid
graph TB
    A[Load Balancer] --> B[Nginx Container]
    B --> C[Next.js App Container 1]
    B --> D[Next.js App Container 2]
    C --> E[PostgreSQL Container]
    D --> E
    C --> F[Redis Container]
    D --> F
    
    G[PgAdmin Container] --> E
    H[File Storage Volume] --> C
    H --> D
    
    subgraph "Production Network"
        B
        C
        D
        E
        F
    end
    
    subgraph "Development Network"
        G
        I[Development Container]
        I --> E
        I --> F
    end
```

## 📁 Archivos de Configuración

### Dockerfile
```dockerfile
# Imagen base optimizada para Node.js
FROM node:18-alpine AS base

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Instalar dependencias
FROM base AS deps
RUN npm ci --only=production

# Etapa de construcción
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Construir aplicación
RUN npm run build

# Imagen de producción
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  # Aplicación Next.js
  web:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://edutech:password123@postgres:5432/edutech_db
      - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      - CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./uploads:/app/uploads
    networks:
      - edutech-network
    restart: unless-stopped

  # Base de Datos PostgreSQL
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: edutech_db
      POSTGRES_USER: edutech
      POSTGRES_PASSWORD: password123
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U edutech -d edutech_db"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    networks:
      - edutech-network
    restart: unless-stopped

  # Redis para Cache (Opcional)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - edutech-network
    restart: unless-stopped
    command: redis-server --appendonly yes

  # PgAdmin para administración (Desarrollo)
  pgadmin:
    image: dpage/pgadmin4:latest
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@edutech.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    networks:
      - edutech-network
    profiles:
      - dev
    depends_on:
      - postgres

# Volúmenes persistentes
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  pgadmin_data:
    driver: local

# Red interna
networks:
  edutech-network:
    driver: bridge
```

### .dockerignore
```dockerignore
# Archivos de desarrollo
.git
.gitignore
README.md
Dockerfile
docker-compose.yml

# Dependencias
node_modules
npm-debug.log*

# Archivos de entorno
.env
.env.local
.env.production

# Archivos de construcción
.next
out
build

# Archivos temporales
*.log
.DS_Store
```

## 🚀 Comandos de Docker

### Comandos Básicos

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f web
```

### Comandos de Desarrollo

```bash
# Ejecutar solo para desarrollo (incluye PgAdmin)
docker-compose --profile dev up

# Reconstruir imagen específica
docker-compose build web

# Ejecutar comando en contenedor
docker-compose exec web bash
docker-compose exec postgres psql -U edutech -d edutech_db

# Ver estado de servicios
docker-compose ps
```

### Comandos de Producción

```bash
# Iniciar servicios en producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Actualizar aplicación sin downtime
docker-compose pull
docker-compose up -d --no-deps web

# Backup de base de datos
docker-compose exec postgres pg_dump -U edutech edutech_db > backup.sql
```

## 🔧 Configuración por Entornos

### Desarrollo (docker-compose.dev.yml)
```yaml
version: '3.8'

services:
  web:
    build:
      target: dev
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev

  postgres:
    environment:
      POSTGRES_DB: edutech_dev
    ports:
      - "5433:5432"
```

### Producción (docker-compose.prod.yml)
```yaml
version: '3.8'

services:
  web:
    build:
      target: runner
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M
          cpus: '0.5'

  postgres:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
```

## 📊 Monitoreo y Logs

### Configuración de Logging
```yaml
# En docker-compose.yml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        
  postgres:
    logging:
      driver: "json-file"
      options:
        max-size: "50m"
        max-file: "5"
```

### Comandos de Monitoreo
```bash
# Ver uso de recursos
docker stats

# Ver información detallada de contenedor
docker inspect edutech_web_1

# Ver logs con filtros
docker-compose logs --since="1h" web
docker-compose logs --tail=100 postgres
```

## 🛡️ Seguridad y Mejores Prácticas

### Variables de Entorno Seguras
```bash
# .env.example
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@postgres:5432/db
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_public_key

# No incluir en git
echo ".env" >> .gitignore
```

### Usuario No-Root
```dockerfile
# En Dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
```

### Escaneo de Vulnerabilidades
```bash
# Escanear imagen por vulnerabilidades
docker scout cves edutech-web:latest

# Actualizar imágenes base
docker-compose pull
docker-compose build --no-cache
```

## 🔄 CI/CD con Docker

### GitHub Actions
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t edutech-app .
        
      - name: Run tests
        run: docker run --rm edutech-app npm test
        
      - name: Deploy to server
        run: |
          docker-compose -f docker-compose.prod.yml pull
          docker-compose -f docker-compose.prod.yml up -d
```

## 🚨 Solución de Problemas

### Problemas Comunes

1. **Puerto ya en uso**
   ```bash
   # Verificar puertos
   docker-compose ps
   lsof -i :3000
   
   # Cambiar puerto
   ports:
     - "3001:3000"
   ```

2. **Problemas de permisos**
   ```bash
   # Cambiar propietario de volúmenes
   sudo chown -R $USER:$USER ./data
   
   # Verificar usuario en contenedor
   docker-compose exec web whoami
   ```

3. **Base de datos no conecta**
   ```bash
   # Verificar health check
   docker-compose ps
   
   # Ver logs de PostgreSQL
   docker-compose logs postgres
   
   # Probar conexión manual
   docker-compose exec postgres psql -U edutech -d edutech_db
   ```

### Comandos de Limpieza

```bash
# Limpiar contenedores parados
docker container prune

# Limpiar imágenes no utilizadas
docker image prune

# Limpiar volúmenes no utilizados
docker volume prune

# Limpieza completa (CUIDADO)
docker system prune -a
```

## 📈 Optimización de Rendimiento

### Multi-stage Build
```dockerfile
# Optimizar tamaño de imagen
FROM node:18-alpine AS deps
# Solo instalar dependencias de producción

FROM node:18-alpine AS builder
# Construir aplicación

FROM node:18-alpine AS runner
# Imagen final mínima
```

### Cache de Layers
```dockerfile
# Copiar package.json primero para cache
COPY package*.json ./
RUN npm install

# Luego copiar código fuente
COPY . .
RUN npm run build
```

Esta documentación de Docker te proporciona todo lo necesario para entender, configurar y mantener la containerización del proyecto CoreAppEduTech.