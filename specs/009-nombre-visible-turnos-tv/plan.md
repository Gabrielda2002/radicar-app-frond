# Plan técnico — Nombre visible en la TV

**Spec:** [spec.md](spec.md).

- Consumir `patientDisplayName` de `activeTurns` y `recentCalls` como única fuente del nombre visible. Omitir valores ausentes, nulos o en blanco. No derivar el nombre de otros campos.
- En la TV normal, usar el estado de la sede que ya se refresca al llamar o rellamar. Los eventos parciales conservan el nombre disponible y la siguiente respuesta del servicio lo actualiza.
- En TV Lite, usar la consulta actual e insertar el nombre como texto. Omitirlo si el turno destacado ya no está en estado `LLAMADO`.
- Validar con llamados, rellamados, nombres largos y ausentes. Verificar que próximos turnos y locución no cambien.
