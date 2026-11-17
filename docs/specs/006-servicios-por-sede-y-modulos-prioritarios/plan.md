# Plan técnico — Servicios por sede y módulos prioritarios

La implementación reutilizará los flujos y stores de turnos existentes. El frontend consumirá las asignaciones y tipos que ya expone el backend de la unidad 005; no requiere cambios de API, dependencias nuevas ni un framework de pruebas.

## Decisiones técnicas

| Área | Decisión |
|---|---|
| Comunicación HTTP | Usar exclusivamente `api` desde `@/utils/api-config` y los endpoints existentes de `/turnos`. |
| Estado | Extender los stores Zustand de administración, atención y solicitud pública; mantener el estado remoto con forma `data`, `error`, `isLoading` y acciones donde corresponda. |
| Asignaciones de sede | Cargar catálogo activo y asignaciones con `GET /turnos/admin/sedes/:headquarterId/servicios`; guardar el conjunto completo con `PUT` y `serviceIds`. |
| Tipo de módulo | Enviar `isPriority` al crear y actualizar. El formulario de creación inicia sin selección y no se envía hasta que se elija «General» o «Prioritario». |
| Opciones operativas | Consumir `modules[].isPriority` y `servicesByHeadquarter`; no usar el catálogo global `services` para ofrecer opciones por sede. |
| Colas | El frontend muestra la prioridad en la lista informativa de próximos turnos; el backend sigue siendo autoridad para decidir el turno que el módulo puede llamar. |
| Errores y persistencia visual | Confirmar y actualizar la vista solo después de respuestas exitosas. Ante un rechazo, mantener el último estado confirmado y mostrar el mensaje del backend. |
| Verificación | Ejecutar `pnpm lint` y `pnpm build`. No agregar pruebas automatizadas ni dependencias sin aprobación. |

## Componentes y responsabilidades

### Administración

- Ampliar `ITurnoModuloAdmin`, `ITurnoModuloInput` e `ITurnoModuloUpdate` en `src/models/ITurnoAdmin.ts` con el tipo del módulo; hacer `isPriority` obligatorio en la entrada de creación y opcional en la actualización.
- Agregar los tipos de catálogo/asignación por sede en `src/models/ITurnoAdmin.ts`.
- Extender `src/featuures/Turnos/Admin/services/turnos-admin.service.ts` con las consultas y el guardado de servicios asignados.
- Extender `src/featuures/Turnos/Admin/store/useStoreTurnoAdmin.ts` con estado y acciones de asignaciones por sede, diferenciando carga, error y mutación para no reemplazar datos confirmados antes de tiempo.
- Crear `src/featuures/Turnos/Admin/Components/TurnoSedeServiciosSection.tsx` para mostrar los servicios asignados y disponibles, editar la selección y presentar estados vacío, carga, reintento y rechazo.
- Integrar la sección en `src/featuures/Turnos/Admin/Pages/TurnoAdminPage.tsx` para la sede seleccionada; reutilizar el contexto existente de sede y rol administrador.
- Extender `TurnoModulosSection.tsx`: mostrar el tipo en la tabla; agregar una elección requerida sin valor inicial al crear; al editar, cargar el tipo vigente; mostrar el mensaje del backend si se rechaza el cambio por una sesión activa.

### Solicitud pública

- El endpoint público ya entrega `services` filtrados por asignación y estado activo. Mantener esa respuesta como fuente única de opciones y conservar la selección vacía inicial.
- Actualizar la validación de respuesta en `fetchTurnoConfig` solo si el contrato requiere campos adicionales; no añadir una llamada al catálogo administrativo.
- Diferenciar «sin servicios habilitados» de «sin tipos de documento» en `TurnoRequestPage.tsx`; bloquear confirmación si no hay servicios y ofrecer volver a consultar la configuración.
- Si el backend rechaza la emisión porque la asignación cambió, mostrar el error y permitir recargar la configuración de la sede sin presentar el turno como emitido.
- En el ticket, conservar el estado pendiente habitual; no añadir un aviso especial cuando no haya módulo prioritario activo.

### Inicio y operación de atención

- Extender `ITurnoAtencionModule` y `ITurnoAtencionOptions` en `src/models/ITurnoAtencion.ts` con `isPriority` y `servicesByHeadquarter`; validar ambos campos al obtener opciones, manteniendo tolerancia únicamente donde el cliente todavía use el campo legado `services`.
- Actualizar `fetchTurnoAtencionOptions` y `useStoreTurnoAtencion` para conservar las opciones agrupadas por sede.
- En `TurnoAtencionPage.tsx`, filtrar los servicios de inicio por la sede del módulo seleccionado. Si cambia el módulo, retirar de la selección los servicios que no existan en la nueva sede; presentar sede y tipo antes de iniciar.
- Derivar el tipo del módulo activo desde las opciones operativas y presentarlo en la sesión. El servidor sigue validando que los servicios seleccionados pertenezcan a esa sede.
- Filtrar los destinos de transferencia por sede del turno/sesión, excluir el servicio actual e impedir confirmar sin destino. Si el backend rechaza una transferencia obsoleta, mantener el estado actual y mostrar el error.
- Mantener la lista de próximos turnos como lectura informativa con indicadores de prioridad; no agregar controles para escoger pacientes. El backend determina la compatibilidad al llamar.

## Secuencia de implementación

1. **Contratos y servicios:** actualizar los modelos y métodos HTTP de administración y atención, alineándolos con las respuestas documentadas del backend.
2. **Administración:** incorporar la sección de asignaciones por sede; después, integrar selección requerida y edición del tipo de módulo.
3. **Solicitud pública y ticket:** adaptar estados vacíos, recarga ante cambios de disponibilidad y mensajes de error, preservando identificación, geolocalización y emisión vigentes.
4. **Atención:** limitar servicios al cambiar módulo, exponer tipo de atención, limitar destinos de transferencia y conservar la lista informativa sin selección manual.
5. **Verificación:** recorrer los criterios RF por flujo; corregir tipos, lint y compilación sin extender el alcance.

## Verificación por flujo

- **Administración de sede:** sin asignaciones, catálogo vacío, selección vacía, guardado correcto, rechazo por sesión/turnos no resueltos e intento de guardar con error. Comprobar que el estado visible solo cambia tras confirmación.
- **Módulos:** creación bloqueada sin tipo; creación y edición en ambos tipos; módulos inactivos visibles; rechazo de cambio con sesión activa conservando el tipo confirmado.
- **Paciente:** opciones únicamente de la sede; sede sin servicios; servicios que dejan de estar disponibles; emisión prioritaria sin módulos compatibles, con ticket pendiente.
- **Asesor:** módulos disponibles/ocupados con sede y tipo; cambio de módulo con depuración de servicios; sede sin servicios; rechazo al iniciar; sesión con tipo visible; cola informativa; sin turnos elegibles; destinos de transferencia asignados y no asignados.
- **Calidad:** `pnpm lint`, `pnpm build` y revisión manual de interacción por teclado, foco y controles públicos de al menos 48 × 48 CSS px.

## Fuera del plan

- Cambios backend, migraciones o nuevas rutas: el contrato de backend 005 ya está implementado; su migración pendiente no forma parte de este plan frontend.
- Cambios a autenticación, autorización backend, reglas de prioridad, ubicación, ticket/sala fuera del estado requerido, selección manual de turnos o rediseño visual general.
- Nuevas dependencias, framework de pruebas, persistencia local de asignaciones o cambios a la estructura `src/featuures/`.
