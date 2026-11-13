# Tareas frontend — Spec 005: Gestión operativa de turnos

## Unidad A — Acceso y sesión

- [x] Incorporar el acceso protegido a la pantalla operativa para Administrador y Radicador.
- [x] Crear el flujo para iniciar sesión seleccionando módulo activo y uno o varios servicios.
- [x] Mostrar conflictos de módulo ocupado y errores de inicio sin perder la selección.
- [x] Recuperar y mostrar la sesión activa y el turno en curso al volver a la pantalla.
- [x] Permitir cerrar sesión solo cuando no exista turno llamado ni en atención.

## Unidad B — Cola y atención

- [x] Mostrar la cola de pendientes de la sede y los servicios seleccionados con código, paciente, servicio, prioridad y tiempo de espera.
- [x] Implementar «Llamar siguiente» sin selección manual de turnos.
- [x] Mostrar las acciones disponibles según el estado del turno: rellamar, iniciar, finalizar y no asistió.
- [x] Permitir transferir el turno actual seleccionando un servicio activo de la sede.
- [x] Permitir cancelar el turno actual con motivo obligatorio.
- [x] Mostrar estados vacíos, carga y errores sin perder el turno ni los datos ingresados.

## Verificación

- [x] Ejecutar ESLint focalizado y `pnpm build`.
- [x] Verificar las reglas de inicio/cierre, cola y acciones con pruebas de API controladas.
- [x] Comprobar que no se agregaron mocks de frontend ni credenciales temporales.
- [x] No agregar dependencias ni framework de pruebas sin aprobación.

### Evidencia

- `pnpm build`: aprobado.
- ESLint focalizado de los archivos del flujo: aprobado. `pnpm lint` completo sigue reportando errores preexistentes en otras funcionalidades.
- No se agregó framework de pruebas al frontend, conforme a la constitución.
