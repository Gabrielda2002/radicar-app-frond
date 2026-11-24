# Tareas frontend — Historial de llamados en TV

- [x] Incorporar `recentCalls` al contrato del estado de la sede.
- [x] Mostrar el historial y su estado vacío en ambas pantallas, incluso con cola vacía.
- [x] Refrescar el historial tras llamado o rellamado en la TV normal y en cada consulta de la Lite.
- [x] Mostrar el tiempo transcurrido con actualización por minuto solo en la TV normal.
- [x] Reorganizar la TV normal en panel principal, historial y franja de próximos turnos.
- [x] Ejecutar compilación, lint focalizado, lint global y pruebas con datos simulados.
- [ ] Verificar el flujo de llamado y rellamado contra el backend real.
- [ ] Revisar la legibilidad y que las tres zonas queden visibles en la TV por HDMI.

## Evidencia

- `pnpm build`: aprobado, con advertencias de empaquetado.
- ESLint focalizado en los archivos modificados: aprobado. `git diff --check`: aprobado.
- `pnpm lint`: falla con 365 errores y 51 advertencias preexistentes fuera de los archivos modificados.
- Pruebas con datos simulados: orden, límite y estado vacío en ambas vistas; actualización de la Lite sin voz histórica; cambio de «hace 5 min» a «hace 6 min» en la TV normal.
