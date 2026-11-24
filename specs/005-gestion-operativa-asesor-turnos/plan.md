# Plan técnico frontend 005 — Gestión operativa de turnos

## Alcance

Cambios exclusivos de `radicar-app-frond`. El contrato y las tareas del backend se documentan únicamente en `api-nordvital`.

## Enfoque

1. Añadir una página protegida para atención de turnos y una entrada en el menú lateral con permisos de rol `1` (Administrador) y `10` (Radicador). La página validará también el rol antes de mostrar contenido operativo; la autorización efectiva corresponde al backend.
2. Mantener la funcionalidad dentro de `src/featuures/Turnos/`, separando página, componentes, servicios, modelos y store Zustand.
3. Extender el servicio existente `src/featuures/Turnos/services/turnos.service.ts` usando exclusivamente la instancia `api` de `@/utils/api-config` para iniciar/cerrar sesión, recuperar estado, consultar opciones y ejecutar acciones.
4. Usar un store Zustand con `data`, `error`, `isLoading` y estados de mutación diferenciados para sesión, turno actual y cola. Conservar los datos vigentes ante fallos de mutación.
5. Para iniciar sesión, consumir las opciones operativas de módulos activos y servicios activos que exponga la API; requerir un módulo y al menos un servicio antes de enviar.
6. Para la vista activa, consumir el estado de sesión con cola filtrada por sede y servicios asignados. La cola es informativa; la acción «Llamar siguiente» no envía un turno seleccionado.
7. Mostrar acciones de acuerdo con el estado actual: llamado (rellamar, iniciar, no asistió, cancelar) y en atención (finalizar, transferir, cancelar). El motivo de cancelación será obligatorio; la transferencia ofrecerá servicios activos.
8. Mostrar errores devueltos por la API, incluidos conflictos de módulo y cierre, sin limpiar selecciones ni motivos ingresados.
9. No agregar dependencias ni framework de pruebas. Verificar con lint focalizado, build y respuestas de API controladas, retirando interceptores y credenciales temporales al terminar.

## Contrato requerido del backend

- Opciones disponibles para iniciar sesión: módulos activos y servicios activos para los roles Administrador y Radicador.
- Estado actual de sesión: turno actual y pendientes de la sede/servicios configurados, con código, nombre, servicio, prioridad y tiempo de espera.
- Acciones: iniciar/cerrar sesión, llamada siguiente, rellamada, inicio/finalización, inasistencia, transferencia y cancelación con motivo.
- La API debe validar roles y transiciones; el control visual del frontend no es una frontera de seguridad.

## Verificación

- Acceso al menú y ruta para los dos roles autorizados y bloqueo visual para otros roles.
- Inicio con módulo y uno o varios servicios; manejo de módulo ocupado y restauración de sesión.
- Lista vacía y lista con pendientes, llamada siguiente y transiciones disponibles por estado.
- Transferencia, cancelación con motivo, errores de mutación y bloqueo de cierre con turno activo.
- Ejecutar `pnpm exec eslint` sobre los archivos modificados y `pnpm build`.

## Reversión

Retirar la ruta, la entrada del menú y los componentes/store/servicios nuevos de la pantalla operativa; no retirar ni alterar los flujos públicos o de administración existentes.
