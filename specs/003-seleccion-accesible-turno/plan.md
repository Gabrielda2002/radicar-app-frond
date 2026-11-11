# Plan técnico: 003 — Selección accesible de servicio y prioridad

## Alcance

Implementar los requisitos aprobados de `spec.md` en el formulario público de
solicitud de turnos. No se modificarán la API, el módulo administrativo de sedes
y módulos ni las reglas de geolocalización.

## Decisiones de implementación

1. Convertir el flujo del formulario en cinco pasos: identificación, datos del
   paciente, servicio, prioridad y revisión.
2. Mantener la consulta de identidad existente. Si el paciente ya existe, sus
   datos se mostrarán como solo lectura; si no existe, se solicitarán nombre y
   celular.
3. Mostrar los servicios como opciones individuales accesibles, con controles de
   al menos 48 × 48 píxeles CSS, selección única y sin valor inicial.
4. Mostrar la pregunta de prioridad en una pantalla propia, con opciones “Sí” y
   “No” del mismo tamaño mínimo y ninguna respuesta inicial. Convertir las
   respuestas a `PRIORITARIO` y `GENERAL`, respectivamente.
5. En la revisión, ofrecer acciones para cambiar directamente servicio o
   prioridad. No permitir editar los datos personales desde esa pantalla.
6. Conservar el resumen, la solicitud de ubicación, la opción de desarrollo ya
   existente, el bloqueo de envíos duplicados y la navegación al ticket.
7. Reutilizar Formik y Yup; no agregar dependencias ni framework de pruebas.

## Verificación

- Ejecutar ESLint focalizado sobre los archivos del formulario de turnos.
- Ejecutar `pnpm build`.
- Verificar manualmente el flujo con servicios disponibles y sin servicios,
  selección obligatoria de servicio y prioridad, retorno desde revisión,
  paciente existente/nuevo y confirmación de ubicación.
- No agregar pruebas automatizadas sin autorización adicional, conforme a las
  instrucciones del repositorio.

## Reversión

Revertir los cambios de la spec 003 y del flujo de solicitud pública; no afecta
el ticket existente, la pantalla de sala ni las configuraciones administrativas.
