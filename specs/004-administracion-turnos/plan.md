# Plan técnico — Spec 004: Administración de sedes y módulos

## Objetivo

Implementar la configuración de sedes y módulos dentro de la sección existente
de Configuración, reutilizando el catálogo de sedes, la API administrativa de
turnos y los componentes compartidos del proyecto.

## Enfoque

1. Registrar “Administración de turnos” como una entrada visible únicamente
   para Administrador en `src/featuures/Configuration/config/tableRegistry.ts`.
   La vista se integrará con `Configuration` y seguirá el patrón de componentes
   lazy del registro actual.
2. Crear el módulo en `src/featuures/Turnos/` y mantener la página, los
   componentes de formularios/mapa, los servicios HTTP y el estado en archivos
   separados, siguiendo `AGENTS.md` y `.github/copilot-instructions.md`.
3. Obtener las sedes disponibles con el store existente
   `src/store/useStoreHeadquarters.ts`; comparar su catálogo con las
   configuraciones recibidas para ofrecer en “Agregar sede” solo las que aún no
   están configuradas.
4. Centralizar las llamadas a `/turnos/admin/sedes-config` y
   `/turnos/admin/modulos` en servicios que usen `api` de
   `@/utils/api-config`; usar Zustand para carga, errores y mutaciones.
5. Usar Formik + Yup y los controles compartidos `Input`, `Select` y `Button`.
   Las tablas de sedes y módulos usarán `DataTable`, `DataTableContainer` y
   `useTableState`.
6. Proponer React Leaflet + Leaflet para el mapa de ubicación, con tiles de
   OpenStreetMap y atribución visible. El repositorio no incluye actualmente
   una biblioteca de mapas. La incorporación de `react-leaflet`, `leaflet` y
   `@types/leaflet` queda sujeta a aprobación explícita antes de instalarse.
7. Mantener latitud y longitud editables manualmente y sincronizadas con el
   marcador; el radio configurado se representará como círculo en el mapa.
8. Construir los enlaces con el origen actual y las rutas públicas vigentes:
   `/turnos/sede/:slug` y `/turnos/tv/:slug`. Mostrar ambos y permitir copiarlos,
   dejando el texto seleccionable si falla el portapapeles.
9. Mostrar los módulos activos e inactivos; crear y editar código/nombre y
   cambiar `isActive`. No se implementará eliminación, porque no existe un
   endpoint para ello.

## Validaciones alineadas con la API

- Sede: slug de 2 a 100 caracteres y único; latitud entre -90 y 90; longitud
  entre -180 y 180; radio entero de al menos 10 metros; promedio entero de al
  menos 1 minuto.
- Módulo: código de 1 a 20 caracteres; nombre de 2 a 100 caracteres.
- Mostrar los errores de validación devueltos por el backend sin descartar los
  valores ingresados.

## Autorización: punto de control

La spec requiere acceso exclusivo para Administrador y el registro de
Configuración deberá filtrar por rol `1`. En la API inspeccionada, la ruta
actual usa `ROLE_GROUPS.MANAGEMENT`, grupo que incluye Administrador y Gerente.
El usuario indicó que ya modificó la autorización; antes de aceptar el acceso
como completo, verificar que el archivo/servidor de API que se pruebe no permita
a Gerente. Este plan no incluye cambios a la API.

## Verificación

- Ejecutar `pnpm exec eslint` sobre los archivos nuevos y modificados.
- Ejecutar `pnpm build`.
- Validar con la aplicación y respuestas de API de prueba: visibilidad solo
  para Administrador, alta/edición de sedes, filtrado de sedes ya configuradas,
  cambios de coordenadas y radio en mapa, enlaces tras editar slug, copia y
  fallback manual, alta/edición/activación/reactivación de módulos, errores y
  estados vacíos.
- No incorporar framework de pruebas automatizadas sin aprobación adicional.

## Unidades de trabajo y reversión

- **Unidad A — Administración de sedes:** entrada en Configuración, catálogo,
  configuración, mapa y enlaces. Puede revertirse eliminando la entrada y los
  componentes/servicios/store de sede sin afectar la solicitud pública.
- **Unidad B — Módulos de atención:** listado y mutaciones de módulos dentro de
  la sede seleccionada. Puede revertirse retirando esa sección y sus mutaciones,
  sin afectar la configuración de sedes.

Las tareas de cada unidad se mantendrán juntas en un cambio revisable. No se
iniciará ninguna tarea hasta que el usuario apruebe explícitamente la lista de
`tasks.md`.
