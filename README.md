# Sistema de Radicación NordVital

Sistema integral de gestión para instituciones de salud que centraliza y automatiza los procesos administrativos y operativos del sector sanitario.

## Funcionalidades Principales

- **Radicación de Servicios** - Gestión de solicitudes y autorizaciones médicas
- **Auditoría Médica** - Seguimiento y control de auditorías de servicios de salud
- **Gestión de Pacientes** - Administración de información clínica y demográfica
- **Autorizaciones** - Aprobación y seguimiento de servicios médicos
- **Inventario** - Control de insumos y recursos hospitalarios
- **Sistema de Calidad (SGC)** - Documentación y procedimientos de calidad
- **Help Desk** - Mesa de ayuda para soporte interno
- **Gestión de Personal** - Usuarios, permisos, vacaciones y roles

## Stack Tecnológico

- **React 18** + **TypeScript** - UI moderna y tipado seguro
- **Vite** - Build tool rápido con HMR
- **TailwindCSS** - Estilos utilitarios
- **Axios** - Cliente HTTP
- **React Big Calendar** - Gestión de calendarios

## Desarrollo

```bash
# Instalar dependencias
pnpm install

# Modo desarrollo
pnpm dev

# Build producción
pnpm build
```

## Arquitectura

El proyecto sigue una arquitectura modular con separación de responsabilidades:
- `featuures/` - Módulos funcionales por dominio
- `components/` - Componentes reutilizables
- `services/` - Lógica de comunicación con API
- `hooks/` - Hooks personalizados
- `context/` - Estado global de la aplicación
