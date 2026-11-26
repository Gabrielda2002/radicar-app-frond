# Plan técnico — Flujo de turnos para celular y atril

**Spec:** [spec.md](spec.md).

- Pasar el `slug` de origen al navegar al ticket, tanto para turnos nuevos como recuperados. Si el ticket abierto directamente trae un `headquarter.slug`, usarlo como respaldo. No usar el historial como destino.
- Aplicar una variante compacta del layout público solo al ticket. Agrupar nuevo turno, actualización, sonido y cancelación; mantener las acciones condicionadas por estado y la confirmación de cancelación.
- Reutilizar un campo con teclado desplegable para documento, celular y nombre. Actualizar Formik en el mismo campo; invalidar la verificación anterior al editar el documento. El teclado táctil no sustituye la entrada nativa.
- Verificar ambos tamaños de pantalla y el recorrido de un paciente nuevo con datos simulados. Validar posteriormente en un atril táctil y un celular físicos.
