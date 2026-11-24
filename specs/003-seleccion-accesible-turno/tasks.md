# Tareas: 003 — Selección accesible de servicio y prioridad

- [x] Separar el paso de datos del paciente de las elecciones de servicio y prioridad.
- [x] Actualizar el flujo a cinco pasos y conservar la búsqueda/recuperación de turno activo.
- [x] Crear selección visible de servicios con opción inicial vacía y selección única.
- [x] Crear pregunta de prioridad Sí/No con opción inicial vacía.
- [x] Mapear explícitamente Sí a `PRIORITARIO` y No a `GENERAL`.
- [x] Permitir desde la revisión cambiar directamente servicio y prioridad.
- [x] Mantener de solo lectura los datos personales en la revisión.
- [x] Conservar geolocalización, errores, bloqueo de doble envío y navegación al ticket.
- [x] Ejecutar ESLint focalizado y `pnpm build`; registrar resultados.
- [x] Revisar manualmente los estados y pasos definidos en la spec.

## Evidencia

- `pnpm exec eslint src/featuures/Turnos src/models/ITurnos.ts`: aprobado.
- `pnpm build`: aprobado; persisten advertencias conocidas de Rollup y tamaño de chunks.
- Playwright sobre `/turnos/sede/casa-gabriel-07` con API simulada: servicio y prioridad sin preselección, se impide continuar sin elegir cada opción, se permite cambiar desde revisión y no hay errores de página.
- Emisión simulada: “Sí” se envía como `PRIORITARIO` con el ID del servicio elegido; el ticket abre correctamente.
- No se agregaron pruebas automatizadas: el repositorio no tiene infraestructura de pruebas frontend y las instrucciones requieren aprobación para incorporarla.
