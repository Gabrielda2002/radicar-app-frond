# AGENTS.md — Sistema de Radicación (NordVital IPS)

SPA desarrollada con Vite, React 19 y TypeScript. Herramienta administrativa
interna para un prestador de servicios de salud colombiano. La interfaz y los
textos están en español; los identificadores se mantienen en inglés, salvo los
términos del negocio (Radicacion, Auditoria, Convenio, etc.).

## Comandos

- `pnpm install` — usa únicamente pnpm; CI fija pnpm 10 y Node 22
- `pnpm dev` — inicia el servidor de desarrollo de Vite
- `pnpm build` — ejecuta `tsc -b && vite build`; los errores de TypeScript impiden la compilación
- `pnpm lint` — ejecuta `eslint .` (configuración flat en `eslint.config.js`)
- `pnpm preview` — sirve `dist/` en el puerto `:4173`
- No hay un script ni archivos de pruebas. No agregues Vitest sin consultarlo.

## Desarrollo guiado por especificaciones (SDD)

- Consulta `docs/constitution.md` antes de iniciar una tarea y úsala como referencia durante toda la implementación.
- Evita el *code slop*: implementa solo el alcance aprobado, reutiliza los patrones existentes y no agregues abstracciones, dependencias, código sin uso ni refactorizaciones ajenas a la spec.

## Particularidades del repositorio

### 1. Directorio con error ortográfico: `src/featuures/`

El directorio de funcionalidades está mal escrito y se usa en todo el proyecto
(importaciones, `ContextualizedRoutes.tsx` y `include` de `tsconfig.app.json`).
**No lo renombres**: se rompería la compilación.

### 2. Una sola instancia de Axios

Importa siempre `api` desde `@/utils/api-config`. La instancia tiene un
interceptor de renovación del token que lee `localStorage.getItem("token")` y
envía una petición POST a `/refresh`. No crees otra instancia de Axios ni uses
`fetch` directamente.

### 3. Autenticación y rutas

- `Login` (`/` en `src/featuures/auth/Page/login.tsx`) es la única ruta pública.
  Las demás rutas están protegidas por `PrivateRoutes` y se muestran mediante
  `ContextualizedRoutes` (`src/components/Routes/ContextualizedRoutes.tsx`).
- Agrega las nuevas páginas protegidas a `ContextualizedRoutes.tsx`; las tablas
  CRUD anidadas van en `TablesRoutes.tsx`, bajo `/tablas/*`.
- La ruta comodín `<Route path="*" element={<Navigate to="/home" />} />` es la
  última en `ContextualizedRoutes.tsx`. Agrega las rutas nuevas antes de ella.
- El token de autenticación, el rol, el municipio y el usuario se guardan en
  `localStorage` con las claves `token`, `rol`, `Municipio` y `user` (definidas
  por `authContext`).

### 4. División de la gestión de estado

- Usa Context API (en `src/context/`) para el estado global de lectura frecuente:
  autenticación, tema, barra lateral, notificaciones y perfil de usuario.
- Usa Zustand para CRUD, mutaciones asíncronas y estado que cambia con
  frecuencia. Consulta `src/featuures/Radicacion/store/useStoreRadicacion.ts`
  para ver la estructura obligatoria del equipo: `data`, `error`, `isLoading` y
  acciones.

### 5. Interfaz compartida: úsala

- Tablas: usa `DataTable`, `DataTableContainer` y `useTableState` de
  `@/components/common/ReusableTable`. No crees tablas CRUD personalizadas.
- Formularios: usa Formik + Yup con `Input`, `Button` y `Select` de
  `@/components/common/Ui`. `Input` ya conecta `formik.handleChange`, `error`,
  `onBlur` y `touched`.
- Notificaciones toast: usa `react-toastify` (`toast.success` / `toast.error`).

### 6. Alias de rutas

- TypeScript: `@/*` → `src/*` (configurado en `tsconfig.app.json`).
- Vite: `@hooks` → `src/hooks` y `@` → `src` (`vite.config.ts`). El proyecto
  también usa importaciones relativas; ambas opciones funcionan. Prefiere
  `@/...` en el código nuevo.

### 7. Entorno

- Copia `.env.example` a `.env`. Solo se requiere `VITE_URL_BACKEND`; la
  instancia de Axios añade `/api/v1`. `VITE_NODE_ENV` es informativa.
- En CI, `VITE_URL_BACKEND` se proporciona mediante el secreto de GitHub
  `VITE_URL_BACKEND`. No subas un archivo `.env` real.

### 8. Particularidades de Vite y la compilación

- Tailwind v4 se integra mediante `@tailwindcss/vite` (no hay archivo
  `tailwind.config.*`).
- SVGR está habilitado (`vite-plugin-svgr`): importa los SVG como componentes
  de React.
- `assetFileNames` en `vite.config.ts` redirige los recursos `pdf.worker` y
  `.mjs` a `.js`. No lo elimines: PDF.js depende de ello.
- `tsconfig.app.json` tiene
  `include: ["src", "src/featuures/Radicacion/Page/TableServiceRequestSubmission.tsx"]`
  (la misma ruta aparece dos veces). No «corrijas» la duplicación si no sabes
  por qué está ahí.

## Convenciones del equipo

Todas las reglas de nombres, hooks, orden de clases Tailwind, stores de
Zustand, manejo de errores y formularios Formik están en
`.github/copilot-instructions.md` (también se aplican a Copilot mediante
`applyTo: '**/*.{ts,tsx,js,jsx}'`). Léelas antes de modificar código en este
repositorio. Resumen:

- Interfaces de modelos: prefijo `I` (`IUsuarios`, `IRadicados`).
- Hooks: `useFetch*` (automático al montar) frente a `useLazyFetch*` (manual).
- Tailwind v4: usa el prefijo `dark:` para el modo oscuro.
- Usa español en textos de interfaz, comentarios y mensajes de consola.
- Evita el code slop: no agregues dependencias, abstracciones ni código sin uso; no refactorices fuera del alcance de la spec; no cambies nombres de clases Tailwind ni stores de Zustand existentes 
  (a menos que la spec lo indique). No agregues tests sin aprobación.

## Despliegue

- `.github/workflows/deploy.yml`: al hacer push a `master`, ejecuta
  `pnpm install` (Node 22, pnpm 10) y `pnpm build`; después transfiere por FTP
  `./dist/` a `app.nordvitalips.com/` con `SamKirkland/FTP-Deploy-Action@v4.3.5`.
- Secretos de GitHub necesarios: `VITE_URL_BACKEND`, `FTP_SERVER`,
  `FTP_USERNAME` y `FTP_PASSWORD`. No hay entorno de vista previa ni de pruebas.
- Solo la rama `master` activa el despliegue. No hagas push a ramas de
  funcionalidades esperando que se publiquen.

## OpenCode y skills

- `skills-lock.json` y `.agents/skills/` registran las skills locales
  (react-best-practices, composition-patterns, frontend-design, tailwind,
  typescript-advanced-types, vite, etc.). Se cargan automáticamente; no hace
  falta configurarlas.
- El plugin OpenCode del proyecto está en `.opencode/`, con su propio
  `node_modules` y `package-lock.json`. No ejecutes `pnpm install` dentro de
  `.opencode/`.

## Si tienes dudas

- Para HTTP, consulta `src/utils/api-config.ts`; para autenticación,
  `src/context/authContext.tsx`; y para rutas,
  `src/components/Routes/ContextualizedRoutes.tsx`.
- Ejecuta `pnpm lint` y `pnpm build` antes de dar por terminado cualquier cambio.
