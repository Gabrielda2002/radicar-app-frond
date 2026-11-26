# Tareas — Nombre visible en la TV

- [x] Actualizar el contrato del estado de TV.
- [x] Mostrar el nombre abreviado en el llamado vigente y en el historial de ambas pantallas.
- [x] Validar con datos simulados y ejecutar compilación y lint.
- [ ] Validar en TV que la API solo entregue el nombre abreviado y que se lea a distancia.

## Evidencia

- Prueba simulada: nombre presente y ausente en ambas vistas; código y módulo conservados; próximos sin nombre y rellamado de la Lite sin nombre en la voz.
- `pnpm build`, ESLint focalizado y comprobación de sintaxis de TV Lite: aprobados. El lint global conserva 365 errores y 51 advertencias preexistentes.
