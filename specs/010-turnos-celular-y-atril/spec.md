# Spec 010 — Solicitud y consulta de turnos en celular y atril

## Objetivo

Permitir que una persona solicite y consulte su turno desde el celular o desde un atril táctil sin teclado físico.

## Criterios de aceptación

- **RF-1:** CUANDO se pulse «Crear nuevo turno», EL SISTEMA abrirá el formulario vacío de la sede de origen sin modificar el ticket actual.
- **RF-2:** SI no se conoce la sede de origen al abrir un ticket directamente, ENTONCES EL SISTEMA ocultará «Crear nuevo turno».
- **RF-3:** MIENTRAS el ticket esté pendiente o llamado y no existan alertas adicionales, EL SISTEMA mostrará su código, estado y acciones principales sin desplazamiento a 360×640 y 390×844 con tamaño de texto predeterminado.
- **RF-4:** MIENTRAS un campo de documento, celular o nombre sea editable, EL SISTEMA ofrecerá un control con ícono de teclado y flecha para desplegar la entrada táctil.
- **RF-5:** CUANDO se use la entrada táctil, EL SISTEMA admitirá dígitos para documento y celular, y para nombre insertará solo letras mayúsculas, incluidas Ñ y vocales con tilde, y espacios.
- **RF-6:** CUANDO se pulse «Listo», EL SISTEMA cerrará el teclado táctil sin enviar el formulario.
- **RF-7:** CUANDO se abra un teclado táctil, EL SISTEMA mantendrá cerrado cualquier otro teclado táctil del formulario.
- **RF-8:** MIENTRAS se use la entrada táctil, EL SISTEMA aplicará las mismas validaciones y límites que al escribir directamente en el campo.

## Fuera de alcance

- Cambiar la validación de identidad, geolocalización, cancelación, avisos, encuesta o prioridad.
- Impedir el desplazamiento cuando sea necesario para mostrar alertas, formularios de encuesta o texto ampliado.
