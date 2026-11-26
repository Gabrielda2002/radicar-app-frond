# Spec 009 — Nombre visible en el llamado de TV

## Objetivo

Ayudar a las personas en sala a reconocer su llamado sin publicar su nombre completo.

## Criterios de aceptación

- **RF-1:** MIENTRAS haya un llamado vigente, EL SISTEMA mostrará el nombre abreviado debajo del código en ambas pantallas.
- **RF-2:** MIENTRAS un turno figure en el historial, EL SISTEMA mostrará el nombre abreviado junto al código sin ocultar el módulo ni el tiempo transcurrido de la TV normal.
- **RF-3:** SI no hay nombre abreviado para un turno, ENTONCES EL SISTEMA omitirá el nombre.
- **RF-4:** EL SISTEMA conservará únicamente el código para los próximos turnos.
- **RF-5:** EL SISTEMA no incluirá el nombre en los anuncios de voz.

## Restricciones y dependencias

- El servicio de estado entrega un nombre abreviado apto para una pantalla pública. No se muestran nombres completos, documentos, asesores ni servicios.
- Esta es una excepción a la [Spec 007](../007-historial-llamados-tv/spec.md), limitada al llamado vigente y al historial.

## Fuera de alcance

- Cambiar el encabezado, la política de abreviación del backend o la locución.
