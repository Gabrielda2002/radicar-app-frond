# Tareas — Diagnóstico de audio en la TV normal

- [x] Instrumentar la cola y la síntesis de voz.
- [x] Agregar el panel y las pruebas de tono y voz.
- [x] Verificar los resultados simulados y ejecutar compilación y lint.
- [ ] Probar con el control remoto y los parlantes de la TV afectada.

## Evidencia

- Ejecución simulada: tono solicitado, inicio y fin de voz manual, llamado silenciado, síntesis no disponible, error `not-allowed` y espera agotada.
- `pnpm build` y ESLint de los archivos modificados: aprobados.
- `pnpm lint`: conserva 365 errores y 51 advertencias preexistentes.
