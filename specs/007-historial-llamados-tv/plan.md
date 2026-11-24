# Plan técnico — Historial de llamados en TV

**Spec:** [spec.md](spec.md). Este plan documenta el alcance aprobado en conversación y la implementación realizada en el frontend.

## Contrato y actualización

El endpoint `GET /api/v1/turnos/tv/:slug/estado` expone `recentCalls` junto con `activeTurns` y `upcomingTurns`. Cada entrada incluye `ticketCode`, `moduloCode`, `moduloName` y `calledAt` (fecha ISO). El backend mantiene el orden y la deduplicación; ambas vistas muestran hasta cinco entradas tal como se reciben. Si el campo no está disponible, muestran el estado vacío.

| Área | Implementación |
|---|---|
| TV normal | Tipar `recentCalls` en `ITurnoTvState`. Recargar el estado al recibir `turno:llamado` o `turno:rellamado`, reutilizando la espera de `cola:actualizada` para agrupar recargas. |
| TV Lite | Renderizar `recentCalls` en la consulta existente de cinco segundos, sin cambiar la detección de llamados para audio. |
| Tiempo transcurrido | En `TvRecentCalls`, usar `formatRelativeTime(calledAt)` y volver a renderizar el historial cada minuto mientras tenga entradas. No generar peticiones adicionales por el temporizador. |
| Distribución | En `TurnoTvPage`, separar el panel principal, el historial y la franja de próximos turnos. Usar una columna en pantallas angostas. |

El llamado o la espera ocupa el panel principal por ahora. Al incorporar videos, ese espacio podrá alojarlos y el llamado se moverá encima del historial. En esta entrega no se crea un panel vacío ni se agrega un reproductor.

## Verificación

- Simular historial vacío y con entradas aunque no haya turnos activos ni próximos.
- Simular un rellamado y comprobar el orden recibido, el límite de cinco y que el historial no dispara voz.
- Validar el cambio de «hace 5 min» a «hace 6 min» con el temporizador en la TV normal.
- Probar eventos de llamado y rellamado con el backend real. Verificar la distribución en una TV conectada por HDMI.
- Ejecutar ESLint focalizado, `pnpm lint` y `pnpm build`.
