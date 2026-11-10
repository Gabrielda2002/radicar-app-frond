# Spec 002 — Próximos turnos en la pantalla de sala

## Objetivo

Permitir que las personas en sala vean cuáles turnos están próximos a ser
llamados, destacando claramente el turno llamado y evitando mostrar información
de módulo, asesor, paciente o servicio en los turnos de pantalla.

## Alcance

- Mostrar el turno llamado en un espacio visual destacado.
- Mostrar hasta cinco turnos pendientes próximos en la cola.
- Mostrar únicamente el código visible de cada turno en pantalla.
- Actualizar la lista cuando cambie la cola y al recuperar conexión.
- Mantener los anuncios de voz existentes.

## Criterios de aceptación

- **RF-1:** CUANDO se abra la pantalla de una sede válida, EL SISTEMA destacará el turno llamado vigente mostrando su código.
- **RF-2:** MIENTRAS haya turnos pendientes próximos, EL SISTEMA mostrará hasta cinco códigos en el orden proporcionado por el servicio.
- **RF-3:** MIENTRAS un turno se muestre en la pantalla de sala, EL SISTEMA ocultará módulo, asesor, paciente y servicio.
- **RF-4:** CUANDO cambie la cola de la sede, EL SISTEMA actualizará los turnos próximos sin recarga manual.
- **RF-5:** CUANDO uno de los próximos turnos sea llamado, EL SISTEMA lo moverá al espacio destacado y mostrará el siguiente turno disponible en la lista.
- **RF-6:** CUANDO un turno próximo deje de estar pendiente, EL SISTEMA lo retirará de la lista.
- **RF-7:** SI hay menos de cinco turnos próximos, ENTONCES EL SISTEMA mostrará únicamente los recibidos.
- **RF-8:** SI no hay turnos llamados ni próximos, ENTONCES EL SISTEMA mostrará el estado de espera existente.
- **RF-9:** CUANDO se restablezca la conexión, EL SISTEMA solicitará el estado vigente de la pantalla y reemplazará la lista anterior.
- **RF-10:** CUANDO ocurra un llamado o rellamado, EL SISTEMA conservará los anuncios de voz existentes.

## Restricciones

- Interfaz y mensajes en español.
- No agregar dependencias ni persistir estado de cola en almacenamiento del navegador.
- No mostrar módulo ni otra información adicional junto a los códigos en TV.
- El orden de la lista proviene del servicio; el frontend no recalcula prioridad ni espera.

## Fuera de alcance

- Cambiar el cálculo backend de posición o espera.
- Cambiar el orden de despacho o las asignaciones de módulos.
- Cambiar el contenido de los tickets móviles o del panel de asesores.
- Cambiar la locución del anuncio más allá de mantener el comportamiento actual.

## Dependencias

- Requiere que la API publique `upcomingTurns` y notifique cambios de cola a la
  sala TV, conforme a [spec backend](../../../../API/docs/specs/003-turnos-proximos-tv/spec.md).
