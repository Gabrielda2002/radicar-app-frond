# Spec 008 — Diagnóstico de audio en la TV normal

## Objetivo

Permitir que el personal identifique en pantalla en qué etapa falla un anuncio, sin abrir la consola.

## Criterios de aceptación

- **RF-1:** EL SISTEMA mostrará un control «Diagnóstico de audio», cerrado por defecto y operable con teclado o con un control remoto que emule sus teclas.
- **RF-2:** CUANDO el personal pulse «Probar tono» o «Probar voz», EL SISTEMA ejecutará esa prueba sin esperar un llamado real.
- **RF-3:** CUANDO llegue un llamado o rellamado, EL SISTEMA registrará la hora de recepción y el progreso del último anuncio real.
- **RF-4:** SI el audio está desactivado, la síntesis no está disponible, devuelve un error o no finaliza en diez segundos, ENTONCES EL SISTEMA mostrará el resultado correspondiente y el código cuando esté disponible.
- **RF-5:** CUANDO el navegador notifique el fin de la voz, EL SISTEMA informará que el navegador notificó ese resultado, sin afirmar que el sonido fue audible.

## Fuera de alcance

- Cambios en TV Lite, backend, historial, locución o asignación de turnos.
- Detectar el volumen o la salida física del televisor.
- Guardar o enviar registros de diagnóstico fuera de la pantalla.
