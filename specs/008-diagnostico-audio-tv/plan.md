# Plan técnico — Diagnóstico de audio en la TV normal

**Spec:** [spec.md](spec.md).

- Extraer la cola de anuncios del hook de conexión TV. Mantener el tono previo, el texto, el idioma y la deduplicación.
- Instrumentar la síntesis de voz: solicitud, inicio, fin, código de error y vencimiento. Limitar el diagnóstico al último llamado y a las últimas pruebas manuales en memoria.
- Iniciar la prueba de voz directamente desde el botón para conservar el gesto del usuario. No iniciar una prueba de voz simultánea con un anuncio.
- Mostrar las comprobaciones en un panel desplegable del encabezado con controles nativos y foco visible.
- Verificar una secuencia exitosa, API no disponible, error y silencio del motor con datos simulados. Validar con la TV real qué pruebas se oyen.
