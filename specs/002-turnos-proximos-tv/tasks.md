# Tareas frontend: próximos turnos en pantalla de sala

- [x] Incorporar tipo `upcomingTurns` al contrato de estado TV.
- [x] Validar el campo nuevo en el servicio que consulta el snapshot TV.
- [x] Guardar y reemplazar próximos turnos junto al snapshot, descartando respuestas obsoletas.
- [x] Escuchar `cola:actualizada` en la sala TV y refrescar el snapshot; retirar el listener al desmontar.
- [x] Mostrar el turno llamado destacado usando únicamente su código.
- [x] Mostrar hasta cinco próximos turnos usando únicamente sus códigos.
- [x] Conservar empty state, audio de llamados, conexión y recuperación de snapshot.
- [x] Verificar visualmente estado con llamado y cinco próximos; confirmar que los códigos se muestran y módulo/servicio permanecen ocultos.
- [x] Ejecutar lint focalizado, `pnpm lint` y `pnpm build`; registrar resultados.

### Evidencia

- `pnpm exec eslint src/featuures/Turnos src/models/ITurnos.ts`: aprobado.
- `pnpm build`: aprobado; conserva advertencias previas de Vite/Rollup y chunks grandes.
- `pnpm lint`: continúa fallando con 367 errores y 51 advertencias preexistentes fuera del módulo Turnos.
- Playwright en `/turnos/tv/casa-gabriel-07` con snapshot simulado: muestra el llamado destacado y cinco próximos, no expone módulo/servicio y no registra errores de página.
- La conexión a una API/Socket.IO real no se verificó en este entorno.
