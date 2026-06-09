# AGENTS.md — Sistema de Radicación (NordVital IPS)

Vite + React 19 + TypeScript SPA. Internal admin tool for a Colombian health
provider. UI and copy are in Spanish; identifiers stay English except for
business terms (Radicacion, Auditoria, Convenio, etc.).

## Commands

- `pnpm install` — pnpm only; CI pins pnpm 10 + Node 22
- `pnpm dev` — Vite dev server
- `pnpm build` — `tsc -b && vite build`; TS errors block the build
- `pnpm lint` — `eslint .` (flat config, `eslint.config.js`)
- `pnpm preview` — serves `dist/` on `:4173`
- There is no test script and no test files. Don't add Vitest without asking.

## Repo-specific gotchas

### 1. Misspelled directory: `src/featuures/`

The features directory is misspelled and is used everywhere (imports,
`ContextualizedRoutes.tsx`, `tsconfig.app.json` `include`). **Do not rename it**
— it would break the build.

### 2. Single Axios instance

Always `import { api } from "@/utils/api-config"`. The instance has a
token-refresh interceptor that reads `localStorage.getItem("token")` and
POSTs to `/refresh`. Do not create another axios instance or call `fetch`
directly.

### 3. Auth and routing

- `Login` (`/` in `src/featuures/auth/Page/login.tsx`) is the only public
  route. Everything else is wrapped in `PrivateRoutes` and rendered through
  `ContextualizedRoutes` (`src/components/Routes/ContextualizedRoutes.tsx`).
- Add new protected pages to `ContextualizedRoutes.tsx`; nested CRUD tables
  belong in `TablesRoutes.tsx` under `/tablas/*`.
- The catch-all `<Route path="*" element={<Navigate to="/home" />} />` is the
  last route in `ContextualizedRoutes.tsx`. Keep new routes above it.
- Auth token, rol, Municipio, and user live in `localStorage` under
  `token` / `rol` / `Municipio` / `user` (set by `authContext`).

### 4. State management split

- Context API (in `src/context/`) for read-heavy app-wide state: auth, theme,
  sidebar, notifications, user profile.
- Zustand for CRUD, async mutations, frequently changing state. See
  `src/featuures/Radicacion/store/useStoreRadicacion.ts` for the team-
  mandated store shape (`data` + `error` + `isLoading` + actions).

### 5. Shared UI — use it

- Tables: `DataTable`, `DataTableContainer`, `useTableState` from
  `@/components/common/ReusableTable`. Don't build custom tables for CRUD.
- Forms: Formik + Yup with `Input` / `Button` / `Select` from
  `@/components/common/Ui`. The `Input` already wires `formik.handleChange`,
  `error`, `onBlur`, `touched`.
- Toasts: `react-toastify` (`toast.success` / `toast.error`).

### 6. Path aliases

- TS: `@/*` → `src/*` (configured in `tsconfig.app.json`).
- Vite: `@hooks` → `src/hooks` and `@` → `src` (`vite.config.ts`). The codebase
  also uses relative imports; both work. Prefer `@/...` for new code.

### 7. Environment

- Copy `.env.example` to `.env`. Only `VITE_URL_BACKEND` is required — the
  axios instance appends `/api/v1`. `VITE_NODE_ENV` is informational.
- In CI, `VITE_URL_BACKEND` is provided via the `VITE_URL_BACKEND` GitHub
  secret. Don't commit a real `.env`.

### 8. Vite / build quirks

- Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.*` file).
- SVGR is enabled (`vite-plugin-svgr`) — import SVGs as React components.
- `assetFileNames` in `vite.config.ts` reroutes `pdf.worker` and `.mjs` assets
  to `.js`. Don't remove this; PDF.js rendering depends on it.
- `tsconfig.app.json` has
  `include: ["src", "src/featuures/Radicacion/Page/TableServiceRequestSubmission.tsx"]`
  (the same path listed twice). Don't "fix" the duplication unless you know
  why it's there.

## Team conventions

All naming, hook, Tailwind class-order, Zustand store, error-handling, and
Formik rules live in `.github/copilot-instructions.md` (also applies to
Copilot via `applyTo: '**/*.{ts,tsx,js,jsx}'`). Read it before writing code
in this repo. Highlights:

- Model interfaces: `I` prefix (`IUsuarios`, `IRadicados`).
- Hooks: `useFetch*` (auto on mount) vs `useLazyFetch*` (manual trigger).
- Tailwind v4: `dark:` prefix for dark mode.
- Spanish for user-facing strings, comments, and console messages.

## Deploy

- `.github/workflows/deploy.yml` — on push to `master`, runs `pnpm install`
  (Node 22, pnpm 10) and `pnpm build`, then FTPs `./dist/` to
  `app.nordvitalips.com/` via `SamKirkland/FTP-Deploy-Action@v4.3.5`.
- Required GitHub secrets: `VITE_URL_BACKEND`, `FTP_SERVER`, `FTP_USERNAME`,
  `FTP_PASSWORD`. There is no preview/staging environment.
- `master` is the only branch that deploys. Don't push feature branches
  expecting them to be live.

## OpenCode / skills

- `skills-lock.json` + `.agents/skills/` register local skills
  (react-best-practices, composition-patterns, frontend-design, tailwind,
  typescript-advanced-types, vite, etc.). They're auto-loaded — no setup.
- The project-level OpenCode plugin lives in `.opencode/` with its own
  `node_modules` and `package-lock.json`. Do not run `pnpm install` inside
  `.opencode/`.

## When in doubt

- Check `src/utils/api-config.ts` for HTTP, `src/context/authContext.tsx`
  for auth, and `src/components/Routes/ContextualizedRoutes.tsx` for routes.
- Run `pnpm lint` and `pnpm build` before considering any change done.
