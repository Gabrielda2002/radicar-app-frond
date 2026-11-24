# Tareas — Frontend público de Turnos

Plan aprobado. Implementación por entregas; no crear commits ni PRs automáticamente.
El usuario ajustará el backend del alta mínima de pacientes nuevos.

## Entrega 1 — Solicitud y recuperación

- [x] Tipar contratos usados, servicio con `api` y stores con control de respuestas obsoletas.
- [x] Corregir únicamente el acceso a respuesta inexistente en el interceptor de red.
- [x] Crear ruta pública de solicitud y formulario por pasos con Formik/Yup/UI compartida.
- [x] Recuperar ticket activo; mostrar datos existentes sin edición.
- [x] Incluir nombre y teléfono editables para pacientes nuevos, sin ampliar campos.
- [x] Solicitar ubicación, explicar errores y permitir omisión explícita solo en desarrollo.
- [x] Emitir sin doble envío y recuperar el ticket ante conflicto o respuesta incierta.
- [x] Adelantar consulta real de ticket de la entrega 2 para cerrar navegación, sin pantalla ficticia.
- [x] Validar móvil/escritorio, errores, navegación directa, lint focalizado y build.

## Entrega 2 — Ticket completo

- [x] Añadir cancelación pendiente/llamado con confirmación y manejo de conflictos.
- [x] Incorporar encuesta de finalizado, con comentario opcional y una respuesta por turno.
- [x] Verificar fallos de red, encuesta duplicada y cancelación concurrente con atención.

## Entrega 3 — Ticket en vivo

- [x] Suscribir ticket a eventos reales, sin duplicar listeners ni avisos.
- [x] Incorporar audio/vibración opcionales y actualización de datos parciales.
- [x] Recuperar snapshot al reconectar/volver a la pestaña y mostrar desactualización.

## Entrega 4 — TV

- [x] Crear ruta pública, snapshot, estados de conexión y lista sin datos personales.
- [x] Procesar llamados/rellamados, inicio y retiro de turno.
- [x] Activar audio con interacción y encolar anuncios sin duplicados.

## Entrega 5 — Cierre

- [x] Recorrer RF-1 a RF-46 y comprobar login/rutas protegidas sin regresiones.
- [x] Confirmar ausencia de omisión de ubicación en producción y de persistencia personal.
- [x] Verificar alta nueva contra backend ajustado por el usuario; no simular éxito.
- [x] Registrar comandos, escenarios, resultados y límites de validación.

## Unidades de revisión y reversión

Se prevé un cambio total superior a 400 líneas. Las entregas serán unidades de
revisión por flujo (incluyendo sus contratos y documentación), no por tipo de archivo.
Si se solicitan PRs, subdividirlas antes de publicar. No hay tests automatizados
nuevos autorizados en este frontend; la verificación será por lint/build y navegador.
Revertir solo archivos/registros propios de cada entrega, respetando sus dependencias
y el trabajo preexistente del usuario.
