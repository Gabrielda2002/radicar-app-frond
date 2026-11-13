# Spec 005 — Gestión operativa de turnos

**Estado:** Borrador para aprobación.

## Objetivo

Permitir que Administrador y Radicador inicien una sesión de atención y gestionen los turnos de los servicios que tienen asignados.

## Alcance

- Acceder a una pantalla operativa de atención de turnos.
- Iniciar y cerrar una sesión en un módulo activo, asociando uno o varios servicios.
- Consultar la lista de turnos pendientes de esos servicios y llamar siempre al siguiente según el orden de la cola.
- Rellamar, iniciar, finalizar, marcar inasistencia, transferir y cancelar el turno actual.
- Transferir a cualquier servicio activo de la misma sede.
- Cancelar el turno actual llamado o en atención indicando un motivo obligatorio.

## Criterios de aceptación (EARS)

- **RF-1:** CUANDO un usuario con rol Administrador o Radicador acceda a la operación de turnos, EL SISTEMA le permitirá abrir la pantalla de atención.
- **RF-2:** SI un usuario con otro rol intenta abrir la pantalla, ENTONCES EL SISTEMA denegará el acceso.
- **RF-3:** CUANDO el usuario inicie una sesión, EL SISTEMA solicitará un módulo activo y al menos un servicio.
- **RF-4:** SI el módulo está ocupado por otro usuario, ENTONCES EL SISTEMA impedirá iniciar la sesión e informará el conflicto.
- **RF-5:** CUANDO el usuario abra la pantalla y tenga una sesión activa, EL SISTEMA recuperará la sesión y el turno actual.
- **RF-6:** MIENTRAS haya una sesión activa, EL SISTEMA mostrará los turnos pendientes de la sede correspondientes a los servicios seleccionados.
- **RF-7:** MIENTRAS se muestre un turno pendiente, EL SISTEMA mostrará su código, nombre del paciente, servicio, prioridad y tiempo de espera.
- **RF-8:** CUANDO el usuario solicite llamar, EL SISTEMA llamará al siguiente turno de acuerdo con la prioridad y el orden de cola vigentes.
- **RF-9:** EL SISTEMA no permitirá seleccionar manualmente un turno de la lista para llamarlo.
- **RF-10:** SI no hay turnos pendientes, ENTONCES EL SISTEMA informará que no hay turnos para llamar.
- **RF-11:** MIENTRAS el turno actual esté llamado, EL SISTEMA permitirá rellamarlo, iniciar su atención, marcarlo como «No asistió» o cancelarlo.
- **RF-12:** MIENTRAS el turno actual esté en atención, EL SISTEMA permitirá finalizarlo, transferirlo o cancelarlo.
- **RF-13:** CUANDO el usuario transfiera el turno actual, EL SISTEMA permitirá elegir cualquier servicio activo de la misma sede.
- **RF-14:** CUANDO el usuario cancele el turno actual, EL SISTEMA exigirá un motivo.
- **RF-15:** SI el usuario intenta cerrar la sesión mientras tiene un turno llamado o en atención, ENTONCES EL SISTEMA impedirá el cierre e informará que debe resolver ese turno.
- **RF-16:** SI una operación falla, ENTONCES EL SISTEMA informará el error y conservará el estado visible sin presentarlo como exitoso.

## Restricciones

- La interfaz y los mensajes estarán en español.
- Solo Administrador y Radicador podrán operar turnos.
- El usuario solo podrá llamar el siguiente turno según el orden de cola; no podrá escoger uno de la lista.
- Los turnos mostrados corresponderán a la sede y a los servicios de la sesión activa.
- No se podrá cerrar la sesión con un turno llamado o en atención.

## Fuera de alcance

- Reordenar turnos o cambiar manualmente su prioridad.
- Administrar sedes, módulos o servicios desde la pantalla de atención.
- Crear nuevos estados del turno o modificar las reglas de priorización existentes.
- Reportes operativos.
