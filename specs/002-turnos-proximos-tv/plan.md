# Plan técnico — Frontend: próximos turnos en pantalla de sala

**Spec:** [spec.md](spec.md). Implementación exclusiva del frontend.

## Alcance técnico

- Consumir `upcomingTurns` del snapshot TV definido por el backend.
- Escuchar el evento `cola:actualizada` en la sala TV y solicitar un snapshot
  nuevo, sin mantener polling.
- Mantener el código llamado separado y visualmente destacado de los próximos.
- Mantener los anuncios de voz y eventos actuales de llamado/rellamado/retiro.
- No realizar modificaciones al cálculo de cola/espera, API ni backend.

## Cambios previstos

| Área | Responsabilidad |
|---|---|
| Modelo Turnos TV | Tipar la colección de próximos turnos. |
| Servicio TV | Validar que el snapshot incluya `upcomingTurns`. |
| Store TV | Reemplazar la lista con snapshot actualizado y evitar respuesta obsoleta. |
| Hook TV en vivo | Escuchar `cola:actualizada` y coordinar una recarga del snapshot; limpiar listener al desmontar. |
| Página/componentes TV | Renderizar el turno llamado destacado y hasta cinco códigos próximos sin otros datos. |

## Comportamiento

- Mostrar máximo cinco elementos en el orden recibido del backend.
- No derivar ni recalcular orden, posición o tiempo en frontend.
- Al cargar, reconectar, volver a la pestaña o recibir invalidación de cola,
  refrescar el snapshot; descartar respuestas anteriores a cambios de sede.
- Cuando el turno pase a llamado, permitir que el snapshot/evento vigente lo quite
  de próximos y la pantalla lo destaque sin duplicarlo.
- Conservar estado vacío, indicador de conexión/desactualización y audio actuales.

## Verificación

- Validar lista vacía, parcial y con cinco elementos.
- Validar llamado, retiro, evento de invalidación, reconexión y cambio de pestaña.
- Confirmar que los elementos muestran únicamente códigos.
- Ejecutar lint focalizado, `pnpm lint` y `pnpm build`; no añadir framework de tests.
