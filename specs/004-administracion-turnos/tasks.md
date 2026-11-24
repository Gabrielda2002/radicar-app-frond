# Tareas — Spec 004: Administración de sedes y módulos

> **Aprobación requerida:** revisar y aprobar estas tareas antes de iniciar
> cualquier implementación. La tarea de mapa propone dependencias nuevas;
> instalarlas requiere aprobación explícita.

## Unidad A — Administración de sedes

- [x] Registrar “Administración de turnos” en Configuración con visibilidad solo para Administrador.
- [x] Crear tipos y servicios para consultar/guardar configuraciones de sedes usando la instancia `api` existente.
- [x] Crear store Zustand para carga, errores y guardado de configuraciones.
- [x] Consultar configuraciones de turnos y el catálogo de sedes; mostrar las configuradas y excluirlas de las opciones de alta.
- [x] Crear el estado vacío y el flujo para agregar una sede disponible del catálogo.
- [x] Crear formulario de sede con slug, habilitación, radio y tiempo promedio, con validación alineada a la API.
- [x] Mostrar advertencia inline cuando se edite el slug de una sede existente y actualizar ambos enlaces tras guardar.
- [x] Mostrar enlaces de solicitud y sala y agregar acción de copiar con fallback de selección manual.
- [x] Implementar mapa con selección por clic, marcador arrastrable, círculo de radio y sincronización bidireccional con coordenadas manuales.
- [x] Solicitar aprobación de `react-leaflet`, `leaflet` y `@types/leaflet` antes de instalarlos; incluir atribución visible de OpenStreetMap si se aprueba ese proveedor.

> Dependencias instaladas con aprobación: `react-leaflet@5.0.0`, `leaflet@1.9.4` y `@types/leaflet@1.9.22` (dev). El mapa usa tiles de OpenStreetMap con atribución visible.
>
> Pendiente de verificación manual: el arrastre del marcador (RF-14). El navegador de pruebas dejó de entregar eventos de puntero y no fue posible simular el arrastre; el clic en el mapa, la sincronización con las coordenadas manuales y el guardado sí quedaron verificados.

## Unidad B — Módulos de atención

- [x] Crear tipos y servicios para listar, crear y actualizar módulos usando la instancia `api` existente.
- [x] Mostrar módulos activos e inactivos asociados a la sede seleccionada, reutilizando la tabla compartida.
- [x] Crear formulario para código y nombre con validación alineada a la API.
- [x] Permitir activar y desactivar módulos existentes y reactivar los inactivos.
- [x] Mostrar estado vacío, errores de carga y errores de mutación sin perder los datos ingresados.

## Verificación

- [x] Ejecutar ESLint focalizado sobre los archivos de la funcionalidad.
- [x] Ejecutar `pnpm build` y registrar resultado.
- [x] Verificar los flujos de módulos con respuestas de API controladas (listado de activos/inactivos, creación, desactivación y acción de reactivación visible).
- [ ] Confirmar que la autorización efectiva de API deniegue acceso a roles distintos de Administrador; no modificar la API dentro de esta unidad.
- [x] Revisar el diff y confirmar que no se agregaron pruebas automatizadas ni dependencias nuevas en la Unidad B.

> `pnpm lint` global sigue fallando por 367 errores y 51 advertencias preexistentes en otras áreas del repositorio; ESLint focalizado para Turnos no reporta errores. `pnpm build` pasa, con advertencias existentes de Rollup/Vite sobre chunks y dependencias circulares.
