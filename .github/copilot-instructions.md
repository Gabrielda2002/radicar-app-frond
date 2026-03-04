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
- **Interfaces de modelos**: `PascalCase` **SIEMPRE con prefijo `I`** (ej: `IUsuarios`, `ITickets`, `IRadicados`)
- **Types auxiliares**: `PascalCase` con sufijo `Type` (ej: `AuthContextType`, `UserProfileProps`)
- **Enums**: `PascalCase` (ej: `UserStatus`, `ApiStatus`)
- **Lenguaje**: `Ingles` (con excepciones para términos de negocio del dominio)

### Contextos
- **Archivos de contexto**: `PascalCase + Context.tsx` (ej: `AuthContext.tsx`, `UsersContext.tsx`)
- **Provider component**: `PascalCase + Provider` (ej: `AuthProvider`, `UsersProvider`)
- **Hook del contexto**: `use + nombre` (ej: `useAuth`, `useUsers`)
- **Type del contexto**: `PascalCase + ContextType` (ej: `AuthContextType`, `UsersContextType`)

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

### Hooks Personalizados

#### Naming:
- **Fetch inmediato**: `useFetch + Nombre` (ej: `useFetchUsers`, `useFetchConvenio`)
  - Se ejecuta automáticamente en el mount del componente
- **Fetch bajo demanda**: `useLazyFetch + Nombre` (ej: `useLazyFetchRol`, `useLazyFetchMunicipio`)
  - Se ejecuta manualmente cuando se necesita
- **Lógica de negocio**: `use + Acción` (ej: `useAuth`, `useEditProfile`)

#### Ubicación:
- **Global**: `hooks/` si se usa en ≥2 features
- **Local**: `features/FeatureName/Hooks/` si es específico de una feature

#### Estructura de hook Fetch inmediato:
```typescript
export const useFetchUsers = () => {
  const [data, setData] = useState<IUsuarios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await fetchUsers();
        setData(users);
      } catch (error) {
        setError("Error al obtener datos: " + error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { data, loading, error };
};
```

#### Estructura de hook Lazy:
```typescript
export const useLazyFetchRol = () => {
  const [data, setData] = useState<IRol[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const roles = await fetchRoles();
      setData(roles);
    } catch (error) {
      setError("Error al obtener datos: " + error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
```

#### Reglas generales:
- Usar hooks personalizados para lógica reutilizable
- Evitar lógica compleja dentro de componentes
- Si un hook se vuelve demasiado grande, dividirlo en hooks más pequeños
- Si un hook se usa en más de un componente, moverlo a la carpeta global de hooks
- Si un hook es para mutar, fetch o manejo de estados usar **Zustand**
- Si un hook es para lógica de presentación usar **useState y useEffect**
- Si un hook es para lógica de negocio compartida usar **useContext**

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

## 🚨 Manejo de Errores Estándar

### En Stores (Zustand):
```typescript
catch (error: any) {
    if (error.response?.status === 500) {
        set({ error: "Error del servidor, intenta nuevamente más tarde" });
    } else {
        set({ error: error?.response?.data?.message || "Error desconocido" });
    }
}
```

### En Servicios:
```typescript
export const fetchUsers = async (): Promise<IUsuarios[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 500) {
      console.error("Error del servidor, intenta nuevamente más tarde");
    } else {
      console.error(error?.response?.data?.message || "Error inesperado");
    }
    throw error;
  }
};
```

### En Hooks personalizados:
```typescript
try {
  const users = await fetchUsers();
  setData(users);
} catch (error) {
  setError("Error al obtener datos: " + error);
} finally {
  setLoading(false);
}
```

### Error Boundaries
- Usar Error Boundaries para componentes críticos
- Mostrar fallbacks útiles al usuario
- Loggear errores para debugging

## 📦 Organización de Archivos

### Estructura del proyecto:
```
src/
├── components/
│   ├── common/         # Componentes compartidos
│   │   ├── Ui/        # Componentes básicos (Button, Input, Select, FormModal)
│   │   ├── HeaderPage/
│   │   ├── LoadingSpinner/
│   │   └── ReusableTable/  # Tabla con paginación, búsqueda, ordenamiento
│   ├── layout/        # Componentes de layout
│   └── Routes/        # Configuración de rutas
├── features/          # Features específicas (nota: actualmente 'featuures' en el proyecto)
│   └── FeatureName/
│       ├── Components/    # Componentes específicos
│       ├── Pages/        # Páginas/vistas principales (ej: TableUsers.tsx)
│       ├── Context/      # Context API específico (si aplica)
│       ├── Store/        # Zustand stores específicos (si aplica)
│       ├── Hooks/        # Hooks específicos
│       ├── Services/     # Servicios API específicos
│       └── types/        # Tipos específicos (opcional)
├── context/          # Contextos globales (Auth, Theme, etc.)
├── hooks/            # Hooks globales compartidos
├── models/           # Interfaces y tipos globales (IUsuarios, ITickets, etc.)
├── services/         # Servicios API globales
│   └── apiService.ts
├── utils/            # Utilidades globales
│   └── api-config.ts # Configuración de Axios
└── constants/        # Constantes globales
```

### Reglas de ubicación:
- **Global**: Si se usa en ≥2 features → hooks/, services/, models/
- **Local**: Si es específico de una feature → dentro de features/FeatureName/
- **Modelos**: Siempre en `models/` compartidos, nunca dentro de features
- Mantener una estructura clara y modular
- Agrupar componentes relacionados en carpetas


## 🎨 Estilos con Tailwind CSS v4.1.18

### Configuración:
- Usando `@tailwindcss/vite` plugin (ya configurado)
- Soporte para modo oscuro con prefijo `dark:`

### Orden estricto de clases:
1. **Layout**: `flex`, `grid`, `block`, `inline-block`
2. **Positioning**: `relative`, `absolute`, `fixed`, `sticky`
3. **Display & Visibility**: `hidden`, `visible`
4. **Spacing**: `p-4`, `m-2`, `gap-4`, `space-x-2`
5. **Sizing**: `w-full`, `h-screen`, `min-h-0`, `max-w-xl`
6. **Typography**: `text-lg`, `font-bold`, `leading-tight`, `tracking-wide`
7. **Colors**: `bg-blue-500`, `text-white`, `border-gray-300`
8. **Borders**: `border`, `border-2`, `rounded-lg`, `divide-y`
9. **Effects**: `shadow-md`, `opacity-80`, `blur-sm`
10. **Transitions**: `transition-all`, `duration-200`, `ease-in-out`
11. **Transforms**: `scale-105`, `rotate-45`, `translate-x-2`
12. **Interactions**: `hover:opacity-80`, `focus:ring-2`, `active:scale-95`
13. **Responsive**: `sm:text-base`, `md:p-8`, `lg:grid-cols-3`
14. **Dark mode**: `dark:bg-gray-800`, `dark:text-white`

### Ejemplo bien ordenado:
```tsx
<div className="flex flex-col items-center justify-center w-full h-screen p-4 gap-4 text-lg font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 md:p-8 lg:flex-row dark:bg-gray-900 dark:text-white dark:border-gray-700">
  Contenido
</div>
```

### Buenas prácticas:
- Usar clases utilitarias antes que CSS custom
- Extraer clases repetitivas a componentes
- Usar variables CSS para temas/colores personalizados
- Mobile-first approach
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)

## 📊 Gestión de Estado

### Cuándo usar Context API:
- Datos que se cargan al inicio y rara vez cambian
- Autenticación y datos de usuario
- Configuración global (tema, idioma)
- Compartir datos "read-heavy" entre muchos componentes
- **Ejemplos en el proyecto**: `AuthContext`, `UsersContext`, `SidebarContext`

### Cuándo usar Zustand:
- Operaciones CRUD (create, update, delete)
- Estado que cambia frecuentemente
- Acciones asíncronas con estados de loading/error
- Necesidad de acciones complejas y mutaciones
- **Ejemplos en el proyecto**: `useTicketsStore`, `useCommentsStore`

### Estructura estándar de Zustand Store:
```typescript
import { create } from "zustand";
import { api } from "@/utils/api-config";
import { IDataType } from "@/models/IDataType";

interface UseDataStoreReturn {
    data: IDataType[];
    error: string | null;
    isLoading: boolean;
    fetchData: () => Promise<void>;
    createData: (data: Object, onSuccess?: () => void) => Promise<void>;
}

const useDataStore = create<UseDataStoreReturn>((set) => ({
    data: [],
    error: null,
    isLoading: false,

    fetchData: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await api.get("/endpoint");
            if (response.status === 200) {
                set({ data: response.data, error: null });
            }
        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error del servidor, intenta nuevamente más tarde" });
            } else {
                set({ error: error?.response?.data?.message || "Error desconocido" });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    createData: async (data, onSuccess) => {
        try {
            set({ isLoading: true, error: null });
            const response = await api.post('/endpoint', data);
            if (response.status === 200 || response.status === 201) {
                onSuccess?.();
            }
        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error del servidor, intenta nuevamente más tarde" });
            } else {
                set({ error: error?.response?.data?.message || "Error desconocido" });
            }
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useDataStore;
```

## 🌐 Servicios y APIs

### Estructura de servicios:
- **Servicios globales**: `services/apiService.ts` - Funciones compartidas entre features
- **Configuración Axios**: `utils/api-config.ts` - Instancia y configuración
- **Servicios específicos**: `features/FeatureName/Services/` - Lógica específica de feature

### Instancia de Axios:
- **Importar desde**: `import { api } from "@/utils/api-config"`
- **Uso**: `api.get()`, `api.post()`, `api.put()`, `api.delete()`
- Los headers de autenticación se manejan automáticamente

### Naming de funciones de servicio:
- **Obtener lista**: `fetch + PluralNombre` → `fetchUsers()`, `fetchTickets()`, `fetchConvenios()`
- **Obtener uno**: `get + SingularNombre` → `getUser(id)`, `getTicket(id)`
- **Crear**: `create + Nombre` → `createTicket()`, `createUser()`
- **Actualizar**: `update + Nombre` → `updateUser()`, `updateTicket()`
- **Eliminar**: `delete + Nombre` → `deleteTicket()`, `deleteUser()`

### Tipado de respuestas:
```typescript
export const fetchUsers = async (): Promise<IUsuarios[]> => {
    const response = await api.get('/usuarios-table');
    const usuarios = response.data.map((usuario: IUsuarios) => ({
        ...usuario,
        createdAt: new Date(usuario.createdAt),
        updatedAt: new Date(usuario.updatedAt)
    }));
    return usuarios;
}
```

### Manejo de FormData:
```typescript
export const uploadFile = async (data: FormData) => {
    const response = await api.post('/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}
```

## 🌍 Convenciones de Idioma

### Variables y funciones:
- **Preferencia**: Inglés para nombres técnicos
- **Excepción**: Términos de negocio del dominio pueden estar en español si son más claros
- **Ejemplos aceptados**: `Radicacion`
### Nombres técnicos (siempre en inglés):
- `loading`, `error`, `isLoading`, `handleClick`, `fetchData`
- `useState`, `useEffect`, `onClick`, `onChange`

### Comentarios y mensajes:
- **Comentarios en código**: Español (para el equipo)
- **Mensajes de error al usuario**: Español
- **Logs de consola**: Español

### Ejemplo correcto:
```typescript
const fetchMunicipios = async (): Promise<IMunicipio[]> => {
  const [isLoading, setIsLoading] = useState(false);
  try {
    const response = await api.get('/municipios');
    return response.data;
  } catch (error) {
    console.error("Error al obtener municipios");
  }
}
```

## 📝 Formularios con Formik + Yup

### Librerías instaladas:
- **Formik**: Manejo de estado de formularios
- **Yup**: Validación de esquemas

### Estructura básica:
```typescript
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'Mínimo 3 caracteres'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  dniNumber: Yup.number()
    .required('El documento es requerido')
    .positive('Debe ser un número positivo'),
});

const formik = useFormik({
  initialValues: { name: '', email: '', dniNumber: '' },
  validationSchema,
  onSubmit: async (values, { setSubmitting, resetForm }) => {
    try {
      await submitForm(values);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  },
});

const MyForm = () => {
  return (
        <form onSubmit={formik.handleSubmit}>
          <Input 
            name="name"
            value={values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
            onBlur={formik.handleBlur}
            touchable={formik.touched.name}
          />
          <Button type="submit" disabled={isSubmitting}>
            {formik.isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
  );
};
```

### Validaciones comunes en Yup:
```typescript
// String
Yup.string().required('Campo requerido').min(3).max(50)

// Number
Yup.number().required('Campo requerido').positive().integer()

// Email
Yup.string().email('Email inválido').required('Campo requerido')

// Date
Yup.date().required('Campo requerido').min(new Date(), 'Fecha debe ser futura')

// Boolean
Yup.boolean().oneOf([true], 'Debe aceptar los términos')

// Condicional
Yup.string().when('otherField', {
  is: (schema) => schema === 'someValue',
  then: (schema) => schema.required('Campo requerido'),
  otherwise: (schema) => schema.notRequired(),
})
```

## 🧩 Componentes Reutilizables

### Uso de ReusableTable:
```typescript
import { 
  ColumnConfig, 
  DataTable, 
  DataTableContainer, 
  useTableState 
} from "@/components/common/ReusableTable";
import { IUsuarios } from "@/models/IUsuarios";

const TableExample = () => {
  const { users, loading, error } = useUsers();

  const tableState = useTableState({
    data: users,
    searchFields: ["id", "name", "lastName", "email", "status"],
    initialItemsPerPage: 10
  });

  const columns: ColumnConfig<IUsuarios>[] = [
    {
      key: "id",
      header: "ID",
      accessor: (item) => item.id,
    },
    {
      key: "name",
      header: "Nombre",
      accessor: (item) => item.name,
    },
    {
      key: "status",
      header: "Estado",
      render: (item) => (
        <span className={item.status ? "text-green-500" : "text-red-500"}>
          {item.status ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  return (
    <DataTableContainer
      searchValue={tableState.searchQuery}
      onSearchChange={tableState.setSearchQuery}
      itemsPerPage={tableState.itemsPerPage}
      onItemsPerPageChange={tableState.setItemsPerPage}
      currentPage={tableState.currentPage}
      totalPages={tableState.totalPages}
      onPageChange={tableState.paginate}
    >
      <DataTable
        data={tableState.currentData()}
        columns={columns}
        getRowKey={(item) => item.id.toString()}
        loading={loading}
        error={error}
        renderActions={(item) => (
          <ModalActionButton item={item} />
        )}
      />
    </DataTableContainer>
  );
};
```

### Componentes UI disponibles:
- `Button` - Botones consistentes
- `Input` - Inputs con validación
- `Select` - Selects con opciones
- `FormModal` - Modal para formularios
- `ModalDefault` - Modal genérico
- `LoadingSpinner` - Indicador de carga
- `HeaderPage` - Hero para páginas
- `Tabs` - Pestañas para navegación
- `Textarea` - Área de texto para entradas largas
- `InputAutoCompletado` - Input con autocompletado con llamadas a API
- `ConfirmDelete` - Modal para confirmar eliminación
- `DataTable` - Tabla basica
- `DataTableContainer` - Contenedor para la tabla con paginación, búsqueda, filtros y ordenamiento

## ⚡ Performance

### Optimizaciones básicas
- Lazy loading para rutas y componentes pesados
- Memoización con `React.memo`, `useMemo`, `useCallback`
- Evitar re-renders innecesarios
- Optimizar imágenes y assets
- Usar Suspense para carga de componentes
- Evitar cálculos pesados en render

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