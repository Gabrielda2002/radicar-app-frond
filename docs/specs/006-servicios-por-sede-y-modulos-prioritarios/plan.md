# Plan técnico — Servicios por sede, prioridad por turno y clasificación

La implementación reutiliza los flujos y stores de turnos existentes. La revisión aprobada elimina la exclusividad de prioridad por módulo y añade clasificación persistente, coordinada con el contrato actualizado del backend 005. No incorpora dependencias ni framework de pruebas.

## Decisiones técnicas

| Área | Decisión |
|---|---|
| Comunicación HTTP | Usar exclusivamente `api` desde `@/utils/api-config` y los endpoints existentes de `/turnos`. |
| Estado | Extender los stores Zustand de administración, atención y solicitud pública; mantener el estado remoto con forma `data`, `error`, `isLoading` y acciones donde corresponda. |
| Asignaciones de sede | Cargar catálogo activo y asignaciones con `GET /turnos/admin/sedes/:headquarterId/servicios`; guardar el conjunto completo con `PUT` y `serviceIds`. |
| Módulos | Retirar `isPriority` de modelos, validadores y formularios; conservar código, nombre y estado. |
| Opciones operativas | Consumir `servicesByHeadquarter` y disponibilidad de módulos sin exigir `isPriority`; no usar el catálogo global como sustituto. |
| Clasificación | Tipo cerrado con `ASIGNACION_CITAS`, `CONFIRMACION_CITAS`, `TRAMITES_ADMINISTRATIVOS`; etiquetas españolas compartidas entre selección, resumen y ticket. |
| Colas | El frontend muestra la prioridad en la lista informativa de próximos turnos; el backend sigue siendo autoridad para decidir el turno que el módulo puede llamar. |
| Errores y persistencia visual | Confirmar y actualizar la vista solo después de respuestas exitosas. Ante un rechazo, mantener el último estado confirmado y mostrar el mensaje del backend. |
| Verificación | Ejecutar `pnpm lint` y `pnpm build`. No agregar pruebas automatizadas ni dependencias sin aprobación. |

## Componentes y responsabilidades

### Administración

- Retirar `isPriority` de `ITurnoModuloAdmin`, `ITurnoModuloInput` e `ITurnoModuloUpdate` y del validador de respuesta.
- Agregar los tipos de catálogo/asignación por sede en `src/models/ITurnoAdmin.ts`.
- Extender `src/featuures/Turnos/Admin/services/turnos-admin.service.ts` con las consultas y el guardado de servicios asignados.
- Extender `src/featuures/Turnos/Admin/store/useStoreTurnoAdmin.ts` con estado y acciones de asignaciones por sede, diferenciando carga, error y mutación para no reemplazar datos confirmados antes de tiempo.
- Crear `src/featuures/Turnos/Admin/Components/TurnoSedeServiciosSection.tsx` para mostrar los servicios asignados y disponibles, editar la selección y presentar estados vacío, carga, reintento y rechazo.
- Integrar la sección en `src/featuures/Turnos/Admin/Pages/TurnoAdminPage.tsx` para la sede seleccionada; reutilizar el contexto existente de sede y rol administrador.
- Retirar de `TurnoModulosSection.tsx` la columna de tipo, el selector, su validación y los textos de exclusividad.

### Solicitud pública

- El endpoint público ya entrega `services` filtrados por asignación y estado activo. Mantener esa respuesta como fuente única de opciones y conservar la selección vacía inicial.
- Actualizar la validación de respuesta en `fetchTurnoConfig` solo si el contrato requiere campos adicionales; no añadir una llamada al catálogo administrativo.
- Diferenciar «sin servicios habilitados» de «sin tipos de documento» en `TurnoRequestPage.tsx`; bloquear confirmación si no hay servicios y ofrecer volver a consultar la configuración.
- Si el backend rechaza la emisión porque la asignación cambió, mostrar el error y permitir recargar la configuración de la sede sin presentar el turno como emitido.
- Insertar Clasificación como paso 2 (índice desde cero) en `useTurnoRequestForm`, con radios nativos sin preselección y validación Yup requerida.
- Desplazar Servicio, Prioridad y Confirmación a los índices 3, 4 y 5; actualizar progreso, botones, edición y omisión de ubicación en desarrollo.
- Enviar `classification` en `ITurnoRequest`; no filtrar `config.services` según ese valor.
- Mostrar la clasificación en resumen y ticket. `ITurnoTicket.classification` admite ausencia/null para datos históricos.
- Mantener el estado pendiente habitual sin añadir avisos especiales por ausencia de asesores.

### Inicio y operación de atención

- Conservar `servicesByHeadquarter` en las opciones operativas y retirar el campo `isPriority`.
- Actualizar `fetchTurnoAtencionOptions` y `useStoreTurnoAtencion` para conservar las opciones agrupadas por sede.
- En `TurnoAtencionSessionSetup.tsx`, conservar selección por sede y depuración al cambiar de módulo; no mostrar tipo de prioridad.
- Mostrar solo la sede del módulo activo y explicar prioritarios primero con FIFO dentro de cada prioridad. El servidor conserva la autoridad del despacho.
- Filtrar los destinos de transferencia por sede del turno/sesión, excluir el servicio actual e impedir confirmar sin destino. Si el backend rechaza una transferencia obsoleta, mantener el estado actual y mostrar el error.
- Mantener la lista de próximos turnos como lectura informativa con indicadores de prioridad; no agregar controles para escoger pacientes. El backend determina la compatibilidad al llamar.

## Secuencia de implementación

1. **Contratos y servicios:** actualizar los modelos y métodos HTTP de administración y atención, alineándolos con las respuestas documentadas del backend.
2. **Administración:** conservar asignaciones por sede y retirar tipo de módulo.
3. **Solicitud pública y ticket:** añadir clasificación conservando identificación, ubicación, servicios y estados vacíos vigentes.
4. **Atención:** mantener límites de servicios y transferencias por sede, retirar exclusividad y conservar cola informativa sin selección manual.
5. **Verificación:** recorrer los criterios RF por flujo; corregir tipos, lint y compilación sin extender el alcance.

## Verificación por flujo

- **Administración de sede:** sin asignaciones, catálogo vacío, selección vacía, guardado correcto, rechazo por sesión/turnos no resueltos e intento de guardar con error. Comprobar que el estado visible solo cambia tras confirmación.
- **Módulos:** listado y edición sin tipo; módulos inactivos visibles.
- **Paciente:** clasificación requerida y sin preselección; mismo catálogo en tres opciones; editar sin perder servicio/prioridad; payload y ticket con clasificación; ticket histórico sin inventar datos.
- **Asesor:** módulos disponibles/ocupados con sede sin tipo; selección por sede; cola informativa mixta; mensaje sin turnos elegibles referido únicamente a servicios.
- **Calidad:** `pnpm lint`, `pnpm build` y revisión manual de interacción por teclado, foco y controles públicos de al menos 48 × 48 CSS px.

## Fuera del plan

- Ejecución de migraciones: requiere autorización separada y entorno acordado.
- Cambios a autenticación, ubicación, criterios clínicos, pantalla de sala, selección manual de turnos o rediseño visual general.
- Nuevas dependencias, framework de pruebas, persistencia local de asignaciones o cambios a la estructura `src/featuures/`.
