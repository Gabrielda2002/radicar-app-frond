# Plan — Servicios de turnos

## Backend

Reutilizar el catálogo `ServicioAtencion`. Agregar listado, alta y edición bajo `/turnos/admin/servicios`, con autorización adicional para el rol Administrador. No se requiere migración.

Al desactivar, bloquear la fila del servicio durante la transacción y comprobar sesiones activas y turnos sin resolver en todas las sedes. Las operaciones que pueden incorporar un servicio a una sesión o a un turno deben leer su estado bajo un bloqueo compatible con esa comprobación.

## Frontend

Registrar «Servicios de turnos» en Configuración con `rols: [1]`. Reutilizar la tabla configurable y el formulario compartido. Volver a consultar el catálogo después de guardar.

## Verificación

Ejecutar la suite existente de la API, la comprobación de tipos del backend y los comandos `pnpm lint` y `pnpm build` del frontend.
