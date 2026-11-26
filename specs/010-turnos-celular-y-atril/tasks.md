# Tareas — Flujo de turnos para celular y atril

- [x] Agregar navegación de retorno a la misma sede sin alterar el ticket.
- [x] Compactar el ticket y agrupar las acciones.
- [x] Agregar teclado táctil numérico y de letras.
- [x] Verificar compilación, lint, tamaños de pantalla y recorrido simulado.
- [ ] Validar teclado nativo y táctil en un celular y en el atril físicos.

## Evidencia

- Playwright con API simulada: se corrigió un documento con cero inicial; se escribió «María Muñoz» y un celular solo con los teclados de la app; se obtuvo el ticket y se volvió a un formulario vacío sin cancelar el turno. Un ticket directo sin sede no mostró el enlace.
- Playwright: el ticket pendiente y el llamado no generaron desplazamiento horizontal ni vertical a 360×640 y 390×844.
- `pnpm build` y lint focalizado aprobados. `pnpm lint` conserva 365 errores y 51 advertencias preexistentes.
