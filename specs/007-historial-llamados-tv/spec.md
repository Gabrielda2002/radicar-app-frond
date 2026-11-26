# Spec 007 — Historial de llamados en la pantalla de sala

## Objetivo

Permitir que las personas en sala identifiquen los últimos turnos llamados de su sede y sepan a qué módulo dirigirse, aunque el llamado ya no esté destacado.

## Alcance

- Historial de hasta cinco turnos en la TV normal y en la Lite.
- Tiempo transcurrido y nueva distribución de pantalla solo en la TV normal.

## Criterios de aceptación

- **RF-1:** MIENTRAS existan llamados recientes en la sede, EL SISTEMA mostrará hasta cinco turnos distintos del más reciente al más antiguo en ambas pantallas.
- **RF-2:** MIENTRAS un turno figure en el historial, EL SISTEMA mostrará el código del turno y el módulo de destino.
- **RF-3:** CUANDO se vuelva a llamar un turno del historial, EL SISTEMA lo mostrará al inicio sin duplicarlo.
- **RF-4:** MIENTRAS haya historial, EL SISTEMA lo mantendrá visible aunque no haya turnos activos ni próximos.
- **RF-5:** SI la sede no tiene llamados recientes, ENTONCES EL SISTEMA mostrará «No hay llamados recientes».
- **RF-6:** CUANDO se cargue o actualice el historial, EL SISTEMA no reproducirá anuncios de voz por las entradas del historial.
- **RF-7:** MIENTRAS haya llamados recientes en la TV normal, EL SISTEMA actualizará cada minuto el tiempo transcurrido mostrado por turno.
- **RF-8:** MIENTRAS la TV normal se muestre en formato panorámico, EL SISTEMA ubicará el llamado en el panel izquierdo (60 %), el historial a la derecha (40 %) y los próximos turnos en una franja inferior.
- **RF-9:** SI no hay un llamado vigente en la TV normal, ENTONCES EL SISTEMA mostrará el estado de espera en el panel principal.
- **RF-10:** MIENTRAS haya un llamado vigente en la TV normal, EL SISTEMA mostrará de forma destacada el código del turno y el módulo de destino.

## Restricciones

- Los próximos turnos siguen mostrando solo sus códigos. La [Spec 009](../009-nombre-visible-turnos-tv/spec.md) permite el nombre abreviado únicamente en el llamado vigente y el historial. No se muestran nombres completos, asesores ni servicios.
- Esta spec amplía la [Spec 002](../002-turnos-proximos-tv/spec.md) únicamente para permitir el módulo en el historial y en el llamado vigente de la TV normal.
- La TV Lite conserva su distribución previa salvo por la incorporación del historial, sin tiempo transcurrido.

## Fuera de alcance

- Reproducción, carga o administración de videos institucionales.
- Cambios en la asignación de turnos, el orden de la cola o los anuncios de voz existentes.

## Dependencias

- El servicio de estado de la sede entrega el historial ordenado y sin duplicar un turno por rellamados.
