# Spec 003 — Selección accesible de servicio y prioridad

**Estado:** Aprobada.

## Objetivo

Facilitar que los pacientes, especialmente las personas adultas mayores,
seleccionen el servicio y la prioridad de su turno mediante opciones visibles y
fáciles de accionar.

## Alcance

- Ordenar la solicitud en pasos de identificación, datos del paciente, selección
  de servicio, selección de prioridad, revisión y emisión.
- Reemplazar las listas desplegables de servicio y prioridad por controles de
  selección explícitos.
- Permitir cambiar el servicio y la prioridad desde la revisión final.
- Conservar las reglas existentes de identificación, registro, geolocalización,
  emisión y recuperación del ticket.

## Criterios de aceptación

### Identificación y datos del paciente

- **RF-1:** CUANDO el paciente ingrese su tipo y número de documento, EL SISTEMA
  consultará si está registrado.
- **RF-2:** SI el paciente existe, ENTONCES EL SISTEMA mostrará sus datos sin
  permitir su edición.
- **RF-3:** SI el paciente no existe, ENTONCES EL SISTEMA permitirá completar su
  nombre y número de celular antes de continuar.

### Selección del servicio

- **RF-4:** CUANDO se hayan confirmado los datos del paciente, EL SISTEMA
  mostrará los servicios disponibles de la sede como opciones individuales de
  selección visible.
- **RF-5:** EL SISTEMA mostrará cada opción de servicio en un control con un área
  interactiva mínima de 48 × 48 píxeles CSS.
- **RF-6:** CUANDO se muestre la lista de servicios, EL SISTEMA no tendrá ningún
  servicio preseleccionado.
- **RF-7:** MIENTRAS no se haya seleccionado un servicio, EL SISTEMA impedirá
  continuar al paso de prioridad.
- **RF-8:** CUANDO el paciente seleccione un servicio, EL SISTEMA permitirá
  seleccionar solo un servicio a la vez.
- **RF-9:** SI la sede no ofrece servicios disponibles, ENTONCES EL SISTEMA
  informará que no es posible solicitar un turno en esa sede.

### Selección de prioridad

- **RF-10:** CUANDO el paciente seleccione un servicio, EL SISTEMA preguntará:
  “¿Requieres atención prioritaria por ser persona adulta mayor, estar en
  embarazo, tener un niño en brazos o tener discapacidad?”.
- **RF-11:** CUANDO se muestre la pregunta de prioridad, EL SISTEMA ofrecerá las
  opciones “Sí” y “No” sin preseleccionar ninguna.
- **RF-12:** EL SISTEMA mostrará cada opción de prioridad en un control con un
  área interactiva mínima de 48 × 48 píxeles CSS.
- **RF-13:** MIENTRAS no se haya respondido la pregunta de prioridad, EL SISTEMA
  impedirá continuar al paso de revisión.
- **RF-14:** CUANDO el paciente responda “Sí”, EL SISTEMA registrará la prioridad
  como `PRIORITARIO`.
- **RF-15:** CUANDO el paciente responda “No”, EL SISTEMA registrará la prioridad
  como `GENERAL`.

### Revisión y emisión

- **RF-16:** CUANDO el paciente llegue a la revisión, EL SISTEMA mostrará los
  datos del paciente, el servicio elegido y la prioridad seleccionada.
- **RF-17:** CUANDO el paciente elija cambiar el servicio desde la revisión, EL
  SISTEMA permitirá seleccionar otro servicio antes de solicitar el turno.
- **RF-18:** CUANDO el paciente elija cambiar la prioridad desde la revisión, EL
  SISTEMA permitirá responder nuevamente “Sí” o “No” antes de solicitar el
  turno.
- **RF-19:** MIENTRAS el paciente esté en la revisión, EL SISTEMA mantendrá los
  datos personales sin edición y permitirá modificar únicamente servicio y
  prioridad.
- **RF-20:** CUANDO el paciente confirme la solicitud, EL SISTEMA conservará la
  validación de ubicación vigente antes de emitir el turno.
- **RF-21:** SI la ubicación no se obtiene o está fuera del radio permitido,
  ENTONCES EL SISTEMA impedirá la emisión e informará cómo continuar.
- **RF-22:** MIENTRAS la solicitud esté siendo procesada, EL SISTEMA impedirá
  enviar otra solicitud.
- **RF-23:** CUANDO se confirme la emisión, EL SISTEMA abrirá el ticket generado.

## Restricciones

- La interfaz y sus mensajes estarán en español.
- No se preseleccionará un servicio ni una respuesta de prioridad.
- La selección de prioridad será una respuesta explícita de “Sí” o “No”.
- Los datos existentes del paciente conservarán su condición de solo lectura.
- La revisión final permitirá cambiar únicamente el servicio y la prioridad.
- La solicitud continuará usando los servicios y reglas de negocio actuales.

## Fuera de alcance

- Cambiar los criterios de elegibilidad para atención prioritaria.
- Cambiar los datos personales almacenados de pacientes existentes.
- Cambiar la geocerca, sus parámetros o el proceso de validación de ubicación.
- Cambiar la administración de slugs, sedes o módulos de atención.
- Cambiar el ticket digital, la pantalla de sala o las acciones del asesor.

## Dependencias

- Depende de los servicios y tipos de documento disponibles para la sede.
- La emisión requiere que la API actual acepte el servicio y la prioridad
  seleccionados.
- La validación de ubicación conserva las reglas descritas en
  [`001-turnos-frontend-publico`](../001-turnos-frontend-publico/spec.md).
