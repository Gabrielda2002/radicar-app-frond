# Spec 001 — Turnos: experiencia pública

**Estado:** Aprobada, incluida la cancelación por el paciente.

## Objetivo

Permitir que los pacientes soliciten, recuperen, consulten y cancelen su turno digital, además de calificar la atención. Mostrar los llamados en la pantalla de sala de espera.

## Alcance

- Solicitud de turno por sede con identificación, selección de servicio, prioridad y ubicación.
- Ticket digital con seguimiento, recuperación, cancelación y encuesta.
- Pantalla de sala de espera con turnos llamados y anuncios de voz.
- Acceso público sin inicio de sesión institucional.

## Criterios de aceptación

### Identificación del paciente

- **RF-1:** CUANDO el paciente acceda mediante el enlace de una sede, EL SISTEMA mostrará la sede correspondiente.
- **RF-2:** SI la sede no existe o está deshabilitada, ENTONCES EL SISTEMA impedirá solicitar turnos e informará el motivo.
- **RF-3:** CUANDO el paciente ingrese su tipo y número de documento, EL SISTEMA consultará si está registrado.
- **RF-4:** SI el paciente existe, ENTONCES EL SISTEMA mostrará sus datos sin permitir su edición.
- **RF-5:** SI el paciente no existe, ENTONCES EL SISTEMA solicitará nombre y teléfono para completar su registro.

### Recuperación y turno único

Para esta funcionalidad se consideran activos los turnos pendientes, llamados o en atención.

- **RF-6:** SI el paciente tiene un turno activo del día actual, ENTONCES EL SISTEMA abrirá ese ticket en lugar de continuar con una nueva solicitud.
- **RF-7:** EL SISTEMA impedirá solicitar un segundo turno activo del día, independientemente del servicio o la sede.
- **RF-8:** EL SISTEMA excluirá los turnos de días anteriores del bloqueo de nuevas solicitudes.
- **RF-9:** SI al confirmar la solicitud se detecta un turno activo existente, ENTONCES EL SISTEMA permitirá recuperar ese ticket.

### Solicitud y ubicación

- **RF-10:** CUANDO el paciente continúe sin turno activo del día, EL SISTEMA permitirá seleccionar un servicio disponible.
- **RF-11:** EL SISTEMA ofrecerá las prioridades general y prioritaria, con general seleccionada inicialmente.
- **RF-12:** CUANDO el paciente confirme una nueva solicitud, EL SISTEMA solicitará su ubicación.
- **RF-13:** SI no se obtiene la ubicación, ENTONCES EL SISTEMA impedirá emitir el turno e informará cómo reintentar.
- **RF-14:** SI la ubicación está fuera del radio permitido, ENTONCES EL SISTEMA informará que el paciente debe encontrarse en la sede para solicitar el turno.
- **RF-15:** DONDE el entorno sea de desarrollo, EL SISTEMA mostrará un botón para omitir la validación de ubicación.
- **RF-16:** CUANDO se active la omisión de ubicación en desarrollo, EL SISTEMA permitirá continuar sin completar esa validación.
- **RF-17:** DONDE el entorno sea de producción, EL SISTEMA impedirá omitir la validación de ubicación.
- **RF-18:** MIENTRAS una solicitud esté siendo procesada, EL SISTEMA impedirá repetir su envío.
- **RF-19:** CUANDO se confirme la emisión, EL SISTEMA abrirá el ticket generado.

### Ticket digital

- **RF-20:** CUANDO se abra un ticket válido, EL SISTEMA mostrará código, sede, servicio, prioridad y estado.
- **RF-21:** MIENTRAS el turno esté pendiente, EL SISTEMA mostrará la cantidad de turnos por delante informada por el servicio.
- **RF-22:** MIENTRAS el turno esté pendiente, EL SISTEMA mostrará la espera estimada informada por el servicio.
- **RF-23:** CUANDO cambie la información del turno, EL SISTEMA actualizará el ticket sin exigir recargar la página.
- **RF-24:** CUANDO el turno sea llamado o rellamado, EL SISTEMA mostrará un aviso destacado con el módulo de atención.
- **RF-25:** DONDE el dispositivo permita avisos sonoros, EL SISTEMA los activará al recibir un llamado.
- **RF-26:** DONDE el dispositivo permita vibración, EL SISTEMA la activará al recibir un llamado.
- **RF-27:** SI el ticket no existe, ENTONCES EL SISTEMA mostrará un mensaje de ticket no encontrado.
- **RF-28:** SI se pierde la conexión de actualizaciones, ENTONCES EL SISTEMA indicará que la información puede estar desactualizada.
- **RF-29:** CUANDO se restablezca la conexión, EL SISTEMA recuperará el estado vigente del ticket.

### Cancelación del turno

- **RF-30:** MIENTRAS el turno esté pendiente o llamado, EL SISTEMA ofrecerá al paciente la opción de cancelarlo desde su ticket.
- **RF-31:** CUANDO el paciente seleccione cancelar el turno, EL SISTEMA solicitará confirmación antes de enviarla.
- **RF-32:** SI el paciente rechaza la confirmación, ENTONCES EL SISTEMA conservará el turno sin solicitar su cancelación.
- **RF-33:** CUANDO se confirme la cancelación, EL SISTEMA solicitará la cancelación del turno.
- **RF-34:** CUANDO se confirme que el turno fue cancelado, EL SISTEMA mostrará su estado cancelado.
- **RF-35:** SI la cancelación falla o el turno ya no admite cancelación, ENTONCES EL SISTEMA informará el resultado sin mostrar el turno como cancelado.
- **RF-36:** MIENTRAS el turno esté en atención o cerrado, EL SISTEMA no ofrecerá la cancelación al paciente.

### Encuesta

- **RF-37:** CUANDO el turno esté finalizado sin encuesta registrada, EL SISTEMA ofrecerá una calificación de una a cinco estrellas con comentario opcional.
- **RF-38:** MIENTRAS no haya una calificación seleccionada, EL SISTEMA impedirá enviar la encuesta.
- **RF-39:** CUANDO se confirme el registro de la encuesta, EL SISTEMA mostrará un agradecimiento.
- **RF-40:** SI el turno ya tiene una encuesta registrada, ENTONCES EL SISTEMA impedirá responderla nuevamente.

### Pantalla de sala de espera

La ampliación para mostrar próximos turnos se especifica por separado en
[`002-turnos-proximos-tv`](../002-turnos-proximos-tv/spec.md).

- **RF-41:** CUANDO se abra la pantalla de una sede válida, EL SISTEMA mostrará sus turnos llamados y en atención.
- **RF-42:** CUANDO llegue un llamado o rellamado, EL SISTEMA destacará el código del turno y el módulo correspondiente.
- **RF-43:** DONDE el navegador permita reproducción de voz, EL SISTEMA anunciará en español el turno y su módulo.
- **RF-44:** SI no hay turnos para mostrar, ENTONCES EL SISTEMA presentará un estado de espera.
- **RF-45:** SI la pantalla pierde la conexión de actualizaciones, ENTONCES EL SISTEMA mostrará un indicador de desconexión.
- **RF-46:** CUANDO se restablezca la conexión, EL SISTEMA recuperará los turnos vigentes de la sede.

## Restricciones

- Interfaz y mensajes en español.
- Solicitud y ticket utilizables desde dispositivos móviles.
- La recuperación del ticket no dependerá de conservar datos de negocio en el navegador.
- La omisión de ubicación se identificará visualmente como una función de desarrollo.
- Los errores de comunicación permitirán reintentar sin presentar como exitosa una operación no confirmada.

## Fuera de alcance

- Panel del asesor y acciones de atención.
- Administración de sedes, módulos e indicadores.
- Actualización de datos de pacientes existentes.
- Impresión de tickets.
- Transferencia solicitada por el paciente.
- Modificación automática del estado de turnos históricos.

## Dependencias y aclaraciones

- La emisión debe aplicar la regla de un único turno activo diario por paciente, sin restringir la validación a una sede o servicio.
- La omisión de ubicación en desarrollo requiere soporte compatible con el servicio actual, que exige coordenadas.
- La recuperación y la emisión deben utilizar el mismo criterio de fecha operativa.
- La cancelación pública está disponible en el servicio actual y debe respetar los estados permitidos para el paciente.
