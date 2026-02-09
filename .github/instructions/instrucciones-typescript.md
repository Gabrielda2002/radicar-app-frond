---
applyTo: '**/*.{ts,tsx,js,jsx}'
---

# 🚀 Reglas Generales para TypeScript/React

Sigue estas reglas de codificación para todos los archivos TypeScript y React en cualquier proyecto.

## 📁 Convenciones de Nombres

### Archivos y Carpetas
- **Componentes React**: `PascalCase.tsx` (ej: `UserProfile.tsx`)
- **Hooks personalizados**: `use + PascalCase.ts` (ej: `useAuth.ts`)
- **Utilities/Helpers**: `camelCase.ts` (ej: `formatDate.ts`)
- **Types/Interfaces**: `camelCase.types.ts` (ej: `user.types.ts`)
- **Services/API**: `camelCase.service.ts` (ej: `auth.service.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (ej: `API_ENDPOINTS.ts`)
- **Carpetas**: `PascalCase` (ej: `UserProfile/`)
- **Lenguaje**: `Ingles`

### Variables y Funciones
- **Variables**: `camelCase` (ej: `userName`, `isLoading`)
- **Funciones**: `camelCase` con verbos (ej: `handleClick`, `fetchUserData`)
- **Constantes**: `UPPER_SNAKE_CASE` (ej: `MAX_RETRY_ATTEMPTS`)
- **Interfaces**: `PascalCase` con prefijo `I` opcional (ej: `User` o `IUser`)
- **Types**: `PascalCase` con sufijo `Type` (ej: `UserType`, `ApiResponseType`)
- **Enums**: `PascalCase` (ej: `UserStatus`, `ApiStatus`)
- **Props de componentes**: `PascalCase` (ej: `UserProfileProps`)
- **Lenguaje**: `Ingles`

## 🏗️ Estructura de Componentes React

### Orden de elementos en componentes:
1. Imports (librerías externas primero, luego internas)
2. Types/Interfaces
3. Props interface
4. Componente principal
5. Componentes auxiliares (si los hay)
6. Export default

### Ejemplo de estructura:
```typescript
// Imports externos
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Imports internos
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/user.types';

// Types/Interfaces
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

// Componente principal
export const UserProfile: React.FC<UserProfileProps> = ({ 
  userId, 
  onUpdate 
}) => {
  // Estados
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hooks personalizados
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Effects
  useEffect(() => {
    fetchUserData();
  }, [userId]);
  
  // Funciones
  const fetchUserData = async () => {
    // lógica aquí
  };
  
  const handleUpdate = () => {
    // lógica aquí
  };
  
  // Early returns
  if (isLoading) return <div>Cargando...</div>;
  if (!user) return <div>Usuario no encontrado</div>;
  
  // Render principal
  return (
    <div className="user-profile">
      {/* JSX aquí */}
    </div>
  );
};

export default UserProfile;
```
- los comentarios son solo de referencia, no deben estar en el código final.

## 🔧 Buenas Prácticas de TypeScript

### Types e Interfaces
- Usar `interface` para objetos que pueden ser extendidos
- Usar `type` para uniones, primitivos y funciones
- Siempre tipar props, estados y funciones
- Evitar `any`, usar `unknown` si es necesario
- Usar tipos genéricos cuando sea apropiado

### Imports/Exports
- Usar imports absolutos con alias `@/` cuando sea posible
- Agrupar imports: externos, internos, tipos
- Usar named exports para utilidades
- Usar default export solo para componentes principales

### Manejo de Estados
- Usar `useState` con tipos explícitos
- Inicializar estados con valores por defecto apropiados
- Usar `useCallback` y `useMemo` cuando sea necesario para optimización

## 🎯 Principios de Clean Code

### Funciones
- Máximo 20 líneas por función
- Una responsabilidad por función
- Nombres descriptivos y verbos de acción
- Evitar más de 3 parámetros (usar objetos)

### Componentes
- Máximo 450 líneas por componente
- Extraer lógica compleja a hooks personalizados
- Usar early returns para validaciones
- Separar lógica de presentación

### Comentarios
- Evitar comentarios obvios
- Comentar "por qué", no "qué"
- Usar JSDoc para funciones públicas
- Actualizar comentarios al cambiar código
- describir sin rodeos

## 🚨 Manejo de Errores

### Async/Await
```typescript
const fetchData = async (): Promise<User[]> => {
  try {
    const response = await api.getUsers();
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};
```

### Error Boundaries
- Usar Error Boundaries para componentes críticos
- Mostrar fallbacks útiles al usuario
- Loggear errores para debugging

## 📦 Organización de Archivos

### Estructura sugerida:
```
src/
├── components/
│   ├── ui/           # Componentes básicos reutilizables
│   ├── layout/       # Componentes de layout
│   └── common/       # Componentes comunes
├── features/         # Features específicas
│   └── auth/         # Nombre de la feature
│       ├── components/ # Componentes específicos de la feature
│       ├── hooks/      # Hooks específicos de la feature
│       ├── services/   # Servicios API específicos de la feature
│       └── types/      # Tipos específicos de la feature
├── hooks/           # Hooks globales
├── services/        # Servicios API
├── types/           # Tipos globales
├── utils/           # Utilidades
└── constants/       # Constantes globales
```
- Mantener una estructura clara y modular
- si la feature se usa en mas de un componente crearlo en hooks globales, lo mismo con servicios y tipos
- Agrupar componentes relacionados en carpetas


## 🎨 Estilos (Tailwind CSS)

### Clases
- Orden: layout → spacing → typography → colors → effects
- Usar clases utilitarias antes que CSS custom
- Extraer clases repetitivas a componentes
- Usar variables CSS para temas/colores

### Responsive
- Mobile-first approach
- Usar breakpoints de Tailwind: `sm:`, `md:`, `lg:`, `xl:`

## ⚡ Performance

### Optimizaciones básicas
- Lazy loading para rutas y componentes pesados
- Memoización con `React.memo`, `useMemo`, `useCallback`
- Evitar re-renders innecesarios
- Optimizar imágenes y assets

## 🧪 Testing (si aplica)

### Naming
- Archivos de test: `ComponentName.test.tsx`
- Describir comportamientos, no implementación
- Usar AAA pattern: Arrange, Act, Assert

---

## ✅ Checklist antes de commit:

- [ ] Nombres siguiendo convenciones
- [ ] Componentes con tipos correctos
- [ ] Imports organizados
- [ ] Funciones con una sola responsabilidad
- [ ] Early returns implementados
- [ ] Manejo de errores apropiado
- [ ] No console.logs en producción
- [ ] Responsive design verificado

---

#### Configuración por defecto
- **ClickUp list ID:** 901325027947 (lista "Desarrollos").
- **Notion data source ID:** 1c2e88ee-9bde-80de-a6ea-000b7171a4ba (base "Seguimiento de tareas").
- Cuando se solicite "crear las tareas en base a los commits", analiza los commits recientes y usa los datos anteriores por defecto.

## Gestión de Tareas
- **Sistema de tareas:** Todas las tareas del proyecto se gestionan en Notion
- **Base de datos:** "Seguimiento de tareas" (https://www.notion.so/1c2e88ee9bde80c4aa11f50a91f3a858)
- **Responsable principal:** Gabriel Duarte (ID: 1bdd872b-594c-81f7-9e75-000297f4be7a)
- **Cuando el usuario mencione "tareas":** Usar automáticamente el MCP de Notion para crear, listar o actualizar tareas
- **Convención de nombres:** El título de la tarea debe incluir un prefijo según el tipo:
  - `feat:` para Feature
  - `fix:` para Bug
  - `refactor:` para Refactor
  - `maintenance:` para Maintenance
  - `document:` para Documentation
  - Ejemplo: "refactor: mejorar lógica de autenticación"
- **Campos obligatorios:**
 - Estos campos deben estar presentes en cada tarea creada para asegurar una gestión adecuada si no es posible integrarlos en la solicitud decirlo.
- **Nombre de tarea:** Título con prefijo según tipo (feat:, fix:, refactor:, etc.)
- **Descripción:** Descripción clara del objetivo y alcance de la tarea minimo 10 lineas y maximo 50 lineas.
- **Estado:** 
  - Notion: Sin empezar | En curso | Retrasada | Listo
  - ClickUp: EN ESPERA | PENDIENTE | EN PROCESO | COMPLETADO | EN REVISION | ACEPTADO
- **Prioridad:**
  - Notion: Alta | Media | Baja
  - ClickUp: Baja | Normal | Alta | Urgente
- **Responsable:** Gabriel Duarte (por defecto)
- **Fecha límite:** Fecha en formato YYYY-MM-DD
- **Tiempo Estimado:** Duración en horas
- **Tags/Etiquetas:** Tags relevantes para la tarea
- **Fecha de inicio:** Fecha en formato YYYY-MM-DD

### Separación de Tareas
- **Principio de Responsabilidad Única:** Cada tarea debe tener UN solo propósito claro
- **Cuándo separar en múltiples tareas:**
  - Cuando los cambios combinan diferentes tipos (ej: fix + refactor)
  - Cuando afectan diferentes capas o módulos independientes (ej: frontend + backend)
  - Cuando una parte puede completarse independientemente de la otra
  - Cuando el tiempo estimado total supera las 2 horas
  - Cuando los cambios tienen diferentes niveles de prioridad
- **Criterios de separación:**
  - **fix + refactor:** SIEMPRE separar. El fix soluciona un problema, el refactor mejora el código
  - **feat + refactor:** Separar si el refactor no es esencial para la feature
  - **múltiples features:** Separar cada feature en su propia tarea
  - **cambios en múltiples módulos:** Separar por módulo si son independientes
- **Ejemplo de separación correcta:**
  - ❌ MAL: "fix: mejorar visualización de títulos y refactorizar modelo de datos"
  - ✅ BIEN: 
    - Tarea 1: "fix: mejorar visualización de títulos largos en tarjetas"
    - Tarea 2: "refactor: migrar nomenclatura del modelo a inglés"
- **Acción al detectar múltiples responsabilidades:** 
  - Analizar los cambios realizados con get_changed_files
  - Identificar diferentes tipos de cambios (fix, refactor, feat)
  - Crear una tarea separada para cada tipo de cambio
  - Documentar claramente qué archivos y cambios corresponden a cada tarea
  - Mantener tareas enfocadas y con estimaciones realistas (< 2 horas cada una)
