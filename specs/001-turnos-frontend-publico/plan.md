# Plan técnico — Frontend público de Turnos

**Estado:** Aprobado por el usuario. **Spec:** [spec.md](spec.md).

Construir desde cero solicitud/recuperación, ticket y pantalla TV, por entregas
revisables. Se incluye el formulario de pacientes nuevos; el usuario realizará
el ajuste de backend necesario para completar esa alta.

## 1. Alcance y límites

- Implementar RF-1 a RF-46 de la spec aprobada.
- Mantener fuera de alcance asesor, administración, edición de pacientes e impresión.
- Usar las dependencias existentes; no agregar frameworks de pruebas.
- No modificar el backend ni ampliar el formulario para suplir sus campos faltantes.
- No persistir documentos, datos personales ni tickets en almacenamiento del navegador.
- No reutilizar como base la implementación descartada.

## 2. Integración y organización

| Ubicación | Responsabilidad |
|---|---|
| `src/App.tsx` | Registrar las tres rutas públicas fuera de `PrivateRoutes`, con `lazy` y `Suspense`. |
| `src/featuures/Turnos/Pages/` | `TurnoRequestPage`, `TurnoTicketPage` y `TurnoTvPage`; composición de las vistas. |
| `src/featuures/Turnos/Components/` | Pasos del formulario, ticket, confirmación de cancelación, encuesta y panel TV. |
| `src/featuures/Turnos/store/` | Un store por vista con `data`, `error`, `isLoading` y acciones; sin persistencia. |
| `src/featuures/Turnos/services/turnos.service.ts` | Peticiones con `api` y adaptación explícita de contratos. |
| `src/featuures/Turnos/hooks/` | Geolocalización, suscripciones y avisos; sin reglas de dominio en presentación. |
| `src/models/ITurnos.ts` | Interfaces con prefijo `I` y uniones de estados, prioridades, solicitudes y eventos. |
| `src/utils/api-config.ts` | Corrección puntual de accesos a `error.response` cuando no hay respuesta de red. |

Reutilizar `Input`, `Select`, `Button`, `Textarea`, `Modal` y sus secciones desde
`@/components/common/Ui`, Formik/Yup y react-toastify. No introducir tablas CRUD,
otra instancia Axios, un nuevo contexto global ni refactorizaciones del layout
institucional. Los hooks del catálogo privado de documentos no sirven para este flujo.

## 3. Contrato a consumir

Referencia detallada del backend:
[`frontend-handoff.md`](../../../../API/docs/specs/002-gestion-turnos/frontend-handoff.md).
Los endpoints de la tabla se agregan al prefijo existente `/api/v1` de `api`.

| Operación | Endpoint y particularidad |
|---|---|
| Configuración | `GET /turnos/sedes/:slug/config`: sede, radio, servicios y `documentTypes`. |
| Identificación | `POST /turnos/pacientes/verificar`: `{ documentNumber, documentType }`; `documentType` es el ID numérico. |
| Recuperación | Si viene `activeTurn`, abrir su `ticketToken` sin pedir ubicación ni emitir otro turno. |
| Paciente existente | La verificación devuelve `patient.fullName`; mostrarlo sin permitir cambios. |
| Emisión | `POST /turnos/ticket`: `slug`, `serviceId`, `documentNumber`, `documentTypeId`, `name`, `phoneNumber`, `priority` y coordenadas. |
| Resultado de emisión | 201 devuelve `token`; no asumir que devuelve `ticketToken`, paciente completo ni ID interno. |
| Conflicto de emisión | 409 con `activeTicket.ticketToken`: recuperar ese ticket; no tratar todos los 409 como recuperación. |
| Consulta | `GET /turnos/ticket/:token`: estado completo, módulo, cola y `hasSurvey`. |
| Cancelación | `POST /turnos/ticket/:token/cancelar`: sin motivo obligatorio; solo pendiente o llamado. |
| Encuesta | `POST /turnos/ticket/:token/encuesta`: `rating` de 1 a 5 y `comment` opcional. |
| TV | `GET /turnos/tv/:slug/estado`: sede y hasta 10 turnos llamados/en atención. |

Adaptar nombres de campos conocidos, no inventar IDs, valores cero ni objetos
vacíos para ocultar un contrato inválido. Las reglas de turno único diario,
priorización, fecha operativa y espera estimada corresponden al backend.

## 4. Solicitud y registro mínimo — RF-1 a RF-19

**Ruta:** `/turnos/sede/:slug`.

1. Cargar configuración y mostrar sede; un 404 bloquea la solicitud con explicación.
2. Solicitar tipo y número de documento como identificación.
3. Consultar al paciente: recuperar turno activo si existe; en caso contrario,
   mostrar nombre/teléfono de solo lectura o habilitar esos campos para paciente nuevo.
4. Seleccionar servicio y prioridad, inicialmente general.
5. Mostrar resumen, obtener ubicación al confirmar y emitir una única solicitud.
6. Abrir el ticket solo tras emisión confirmada o recuperación de conflicto.

El registro nuevo se completa como parte de la emisión; no crear un endpoint de
alta independiente ni añadir correo, dirección, convenio o IPS al formulario.
Formik conservará los datos entre pasos y validará los campos de cada paso.
Cambiar la identificación invalidará la verificación anterior; descartar respuestas
obsoletas cuando cambie la sede o el documento. Los datos existentes se enviarán
desde la respuesta verificada, no desde campos editables.

Geolocalización: manejar permiso denegado, falta de soporte y tiempo agotado con
mensajes y reintento. Validación definitiva del radio en backend. Con
`import.meta.env.DEV`, ofrecer «Omitir validación de ubicación» y enviar
`skipGeolocation: true` sin coordenadas ficticias; fuera de desarrollo no habrá
botón ni envío de esa excepción. El backend también debe estar en desarrollo.

## 5. Ticket, cancelación y encuesta — RF-20 a RF-40

**Ruta:** `/turnos/ticket/:token`.

- Cargar por token y mostrar datos de estado, sede, servicio y prioridad.
- Mostrar posición/espera únicamente cuando esté pendiente; no recalcularlas localmente.
- Destacar módulo cuando sea llamado; audio/vibración solo si están disponibles.
- Derivar las acciones del estado: cancelar solo `PENDIENTE`/`LLAMADO`; encuesta
  solo `FINALIZADO` sin respuesta previa.
- Pedir confirmación antes de cancelar, con opción de conservar el turno. Evitar
  doble envío y no anticipar el éxito. Ante 409, informar y consultar estado actual.
- Guardar encuesta únicamente con respuesta confirmada; manejar la encuesta
  respondida desde otra pestaña sin ofrecer envíos repetidos.
- Si se pierde una respuesta de emisión o mutación, consultar el estado antes de
  repetir automáticamente la operación; nunca reintentar una mutación en bucle.

La recuperación será por token en URL o por identificación desde la sede, sin
guardar tickets ni datos personales en `localStorage` o `sessionStorage`.

## 6. Tiempo real y pantalla TV — RF-23 a RF-29 y RF-41 a RF-46

**Ruta TV:** `/turnos/tv/:slug`. Conectar al origen `VITE_URL_BACKEND`, sin `/api/v1`.
Usar un ciclo de conexión local de Turnos, independiente del socket de notificaciones
institucionales que depende del usuario autenticado.

| Vista/sala | Eventos |
|---|---|
| Ticket: `ticket_${token}` | `ticket:llamado`, `ticket:rellamado`, `ticket:actualizado`. |
| TV: `sede_${id}_tv` | `turno:llamado`, `turno:rellamado`, `turno:actualizado`, `turno:retirado`. |

- Unirse de nuevo en cada conexión; registrar listeners fuera del callback `connect`.
- Cargar snapshot HTTP inicial y al reconectar o volver a la pestaña; agrupar
  refrescos coincidentes y descartar respuestas de un token/sede anterior.
- Conservar campos ausentes en eventos parciales; consultar ticket completo
  cuando una transferencia cambie servicio o asignación.
- Identificar turnos por ID en la TV; actualizar estado sin repetir anuncio y
  retirar cierres. Mantener el máximo del contrato, no inventar una lista de cinco.
- Reproducir anuncios secuencialmente; deduplicar un llamado por turno y contador,
  conservando los rellamados legítimos.
- Desconectar y retirar listeners propios al desmontar, también en desarrollo;
  limpiar temporizadores y anuncios pendientes para no duplicarlos con StrictMode.
- Mostrar desconexión/desactualización y permitir reintento; no usar polling constante.

El servidor actual no confirma `join` ni ofrece replay durable. No prometer entrega
garantizada: recuperar mediante snapshots, sin borrar eventos más recientes con una
respuesta HTTP anterior. La prueba de reconexión verificará también esta limitación.

## 7. Interfaz

Dirección visual: minimalismo institucional, con marca/colores y tipografía existentes,
sin dependencias, fuentes externas ni animaciones decorativas ajenas al flujo.
Solicitud y ticket en una columna móvil; TV con jerarquía de código/módulo para
lectura a distancia. No mostrar documento ni nombre del paciente en la TV.

Estados de carga, error, vacío y reintento explícitos; etiquetas y mensajes en español.
Controles con nombre accesible, foco visible y modal utilizable con teclado. Los
avisos visuales funcionarán aunque el navegador bloquee audio; ofrecer activación de
sonido mediante interacción cuando sea necesaria. Respetar reducción de movimiento.

## 8. Entregas y verificación

| Entrega | Resultado revisable | RF |
|---|---|---|
| 1. Solicitud/recuperación | Ruta pública, identificación, registro mínimo, ubicación y navegación al ticket. | 1–19 |
| 2. Ticket completo | Consulta, cancelación confirmada y encuesta, sin depender todavía del tiempo real. | 20–22, 27, 30–40 |
| 3. Ticket en vivo | Llamados, cola, avisos y recuperación de conexión. | 23–29 |
| 4. Pantalla TV | Snapshot, eventos, anuncios, retiros y estados de conexión. | 41–46 |
| 5. Cierre integrado | Recorridos de la spec, producción y regresión de login/rutas protegidas. | 1–46 |

Cada entrega incluye contratos utilizados, comprobación manual y evidencia de lint/build.
La entrega 1 requiere la vista de ticket de la entrega 2 para verificar el recorrido
completo; no crear pantallas o servicios ficticios para simularlo. Las primeras
entregas parciales no se considerarán listas para producción por separado.

La suma previsiblemente supera 400 líneas: mantener unidades de revisión por flujo,
no separar commits por modelos/servicios/UI. Si se solicitan PRs, organizar PRs
encadenados antes de publicarlos; no crear commits ni PRs sin autorización.

### Comprobaciones por entrega

- Ejecutar lint de archivos modificados, `pnpm lint` y `pnpm build`; no corregir
  errores ajenos para hacer pasar el lint global.
- Registrar escenario manual y resultado exacto; no agregar tests sin aprobación.
- Verificar paciente existente/nuevo, recuperación, 409, 403, 404 y fallo de red;
  cancelación desistida/confirmada y conflicto con atención; encuesta duplicada.
- Verificar recarga directa de rutas, móvil, TV, reconexión, cambio de pestaña,
  rellamados sin duplicados y ausencia de omisión de ubicación en producción.
- Reversión por unidad: retirar únicamente archivos de esa entrega y sus registros
  en `App.tsx`, respetando dependencias y cambios previos del usuario.

## 9. Dependencias y siguiente paso

- **Backend a cargo del usuario:** permitir alta mínima con los campos aprobados.
  No bloquea construir ni revisar el formulario; sí su verificación real de punta
  a punta. Si devuelve error, mostrarlo sin simular un registro o turno exitoso.
- **Entorno:** se necesitan una sede habilitada y servicios para probar contra API.
- **Base existente:** el último lint global falló con 367 errores y 51 advertencias;
  el último build pasó. Revalidar durante implementación y separar fallos nuevos.
- **Siguiente paso:** aprobar este plan, desglosar tareas por entrega y comenzar por
  solicitud/recuperación, incluido el formulario de pacientes nuevos.
