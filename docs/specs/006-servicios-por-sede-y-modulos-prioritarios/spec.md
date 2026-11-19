# Spec frontend 006 — Servicios por sede, prioridad por turno y clasificación

**Estado:** Aprobada por el usuario.

## Objetivo

Permitir que el Administrador defina qué servicios de turnos ofrece cada sede. Cualquier módulo que atienda un servicio atenderá generales y prioritarios, con prioritarios primero. El paciente elegirá una clasificación de trámite que se guardará con el turno.

## Alcance

- Configurar manualmente los servicios de cada sede desde Administración de turnos, dentro de Configuración.
- Mostrar las asignaciones actuales y permitir agregar o retirar servicios del catálogo activo.
- Administrar módulos sin tipo exclusivo de prioridad.
- Adaptar la selección de servicios de la solicitud pública, del inicio de atención y de las transferencias a la sede correspondiente.
- Incorporar Clasificación entre Tus datos y Servicio, sin filtrar servicios según la clasificación.
- Reflejar los rechazos de cambios de configuración o de operaciones de turnos sin presentar cambios rechazados como guardados.
- Conservar la emisión de turnos sin asesores activos para el servicio.

## Criterios de aceptación (EARS)

### Administración de servicios por sede

- **RF-1:** CUANDO un Administrador consulte una sede configurada en Administración de turnos, EL SISTEMA ofrecerá la gestión de sus servicios de turnos.
- **RF-2:** SI un usuario no tiene el rol Administrador, ENTONCES EL SISTEMA impedirá que administre las asignaciones de servicios o los módulos.
- **RF-3:** CUANDO el Administrador abra la gestión de servicios, EL SISTEMA identificará la sede que está configurando.
- **RF-4:** CUANDO se cargue la configuración de servicios de una sede, EL SISTEMA mostrará el catálogo activo disponible para asignación.
- **RF-5:** CUANDO se cargue la configuración de servicios de una sede, EL SISTEMA distinguirá sus asignaciones actuales de los servicios no asignados.
- **RF-6:** SI una sede no tiene servicios asignados, ENTONCES EL SISTEMA informará que requiere configuración manual para permitir nuevas solicitudes de turno.
- **RF-7:** MIENTRAS una sede no tenga asignaciones, EL SISTEMA mantendrá vacía la selección de servicios hasta que el Administrador la modifique.
- **RF-8:** CUANDO el Administrador edite las asignaciones de una sede, EL SISTEMA permitirá seleccionar o retirar servicios individualmente.
- **RF-9:** CUANDO el Administrador solicite guardar una selección vacía, EL SISTEMA permitirá solicitar el retiro de todas las asignaciones sujeto a las restricciones vigentes.
- **RF-10:** CUANDO se confirme el guardado de las asignaciones, EL SISTEMA mostrará la selección confirmada como configuración vigente de la sede.
- **RF-11:** CUANDO se confirme el guardado de las asignaciones, EL SISTEMA informará que los cambios fueron guardados.
- **RF-12:** SI se rechaza el retiro de un servicio por una sesión activa que lo atiende, ENTONCES EL SISTEMA informará ese motivo de bloqueo.
- **RF-13:** SI se rechaza el retiro de un servicio por turnos pendientes, llamados o en atención, ENTONCES EL SISTEMA informará que deben resolverse antes de retirarlo.
- **RF-14:** SI se rechaza una asignación por servicios repetidos, inexistentes o inactivos, ENTONCES EL SISTEMA mostrará el motivo del rechazo.
- **RF-15:** SI falla el guardado de asignaciones, ENTONCES EL SISTEMA conservará como vigente la última configuración confirmada.
- **RF-16:** SI el catálogo activo está vacío, ENTONCES EL SISTEMA informará que no hay servicios disponibles para asignar.

### Módulos sin exclusividad de prioridad

- **RF-17:** CUANDO el Administrador consulte los módulos de una sede, EL SISTEMA mostrará su código, nombre y estado sin tipo exclusivo de prioridad.
- **RF-18:** CUANDO el Administrador cree o edite un módulo, EL SISTEMA no solicitará un tipo general o prioritario.
- **RF-19:** EL SISTEMA conservará la prioridad como atributo del turno, no del módulo.
- **RF-20:** CUANDO el Administrador edite un módulo, EL SISTEMA conservará los datos confirmados mientras no se confirme el guardado.
- **RF-21:** SI falla el guardado de un módulo, ENTONCES EL SISTEMA informará el error.
- **RF-22:** SI falla el guardado de un módulo, ENTONCES EL SISTEMA no mostrará el cambio como confirmado.
- **RF-23:** EL SISTEMA permitirá que todos los módulos atiendan ambas prioridades para los servicios de su sesión.

### Solicitud pública de turnos

- **RF-24:** CUANDO el paciente seleccione un servicio para solicitar turno, EL SISTEMA ofrecerá únicamente los servicios activos asignados a la sede de la solicitud.
- **RF-25:** SI la sede no tiene servicios habilitados disponibles, ENTONCES EL SISTEMA informará que no es posible emitir un nuevo turno en esa sede.
- **RF-26:** MIENTRAS la sede no tenga servicios habilitados disponibles, EL SISTEMA impedirá confirmar una nueva solicitud de turno.
- **RF-27:** SI se rechaza una emisión porque el servicio seleccionado dejó de estar activo o asignado a la sede, ENTONCES EL SISTEMA informará que el servicio ya no está disponible para esa solicitud.
- **RF-28:** CUANDO el paciente actualice las opciones tras un rechazo por servicio no disponible, EL SISTEMA permitirá seleccionar entre los servicios vigentes de la sede.
- **RF-29:** SI no hay asesores activos para el servicio, ENTONCES EL SISTEMA permitirá solicitar un turno sujeto a las demás condiciones de emisión vigentes.
- **RF-30:** CUANDO se confirme la emisión de un turno sin asesor disponible, EL SISTEMA mostrará su ticket en el estado pendiente informado.

### Inicio y operación de atención

- **RF-31:** CUANDO un Administrador o Radicador seleccione un módulo para iniciar atención, EL SISTEMA mostrará la sede del módulo sin etiquetarlo como general o prioritario.
- **RF-32:** CUANDO el asesor seleccione un módulo, EL SISTEMA ofrecerá para la sesión únicamente servicios activos asignados a la sede de ese módulo.
- **RF-33:** CUANDO el asesor cambie el módulo seleccionado antes de iniciar la sesión, EL SISTEMA descartará de su selección los servicios que no estén habilitados en la sede del nuevo módulo.
- **RF-34:** SI la sede del módulo no tiene servicios disponibles, ENTONCES EL SISTEMA informará que no puede iniciarse atención hasta que se configure al menos uno.
- **RF-35:** SI falta seleccionar un módulo disponible o al menos un servicio válido, ENTONCES EL SISTEMA impedirá iniciar la sesión de atención.
- **RF-36:** SI se rechaza el inicio de sesión por servicios que dejaron de estar habilitados, ENTONCES EL SISTEMA informará el motivo sin mostrar la sesión como iniciada.
- **RF-37:** MIENTRAS exista una sesión activa, EL SISTEMA mostrará los turnos elegibles generales y prioritarios en el orden recibido del backend.
- **RF-38:** CUANDO el asesor solicite llamar al siguiente turno, EL SISTEMA mostrará el turno confirmado para sus servicios con prioritarios primero y FIFO dentro de cada prioridad.
- **RF-39:** SI la operación de llamado informa que no hay turnos elegibles, ENTONCES EL SISTEMA informará que no hay turnos disponibles para los servicios de esa sesión.
- **RF-40:** EL SISTEMA mantendrá el llamado mediante la acción de siguiente turno sin permitir seleccionar manualmente una persona de la lista.
- **RF-41:** CUANDO el asesor elija un destino para transferir un turno en atención, EL SISTEMA ofrecerá únicamente otros servicios activos asignados a la sede del turno.
- **RF-42:** SI no hay otro servicio habilitado como destino, ENTONCES EL SISTEMA informará que no hay servicios disponibles para transferir.
- **RF-43:** MIENTRAS no exista un destino válido seleccionado, EL SISTEMA impedirá confirmar la transferencia.
- **RF-44:** SI se rechaza una transferencia porque el destino está inactivo o no está asignado a la sede, ENTONCES EL SISTEMA conservará el servicio y el estado confirmados del turno actual.

### Carga, errores y coherencia de la información

- **RF-45:** MIENTRAS se carguen los servicios o módulos necesarios para una selección, EL SISTEMA mostrará un estado de carga diferenciado de una lista vacía.
- **RF-46:** SI falla la consulta de servicios o módulos, ENTONCES EL SISTEMA ofrecerá reintentar la consulta junto al mensaje de error.
- **RF-47:** MIENTRAS se procese un guardado o una operación de turno, EL SISTEMA impedirá repetir el envío de esa operación.
- **RF-48:** SI una operación no obtiene confirmación de éxito, ENTONCES EL SISTEMA mostrará el error sin presentar el cambio como confirmado.
- **RF-49:** CUANDO el usuario cambie de sede en la administración, EL SISTEMA mostrará únicamente las asignaciones y los módulos correspondientes a la sede seleccionada.

### Clasificación del trámite

- **RF-50:** CUANDO el paciente avance desde Tus datos, EL SISTEMA mostrará Clasificación antes de Servicio.
- **RF-51:** CUANDO se muestre Clasificación, EL SISTEMA ofrecerá Asignación de Citas, Confirmación de Citas y Trámites Administrativos sin preselección.
- **RF-52:** SI el paciente no elige una clasificación, ENTONCES EL SISTEMA impedirá avanzar e informará que debe seleccionarla.
- **RF-53:** CUANDO el paciente seleccione cualquiera de las tres clasificaciones, EL SISTEMA mostrará el mismo catálogo habilitado para la sede.
- **RF-54:** CUANDO el paciente revise su solicitud, EL SISTEMA mostrará la clasificación elegida.
- **RF-55:** CUANDO el paciente edite la clasificación desde el resumen, EL SISTEMA conservará los demás datos de la solicitud.
- **RF-56:** CUANDO el paciente solicite su turno, EL SISTEMA enviará la clasificación seleccionada para guardarla con el turno.
- **RF-57:** CUANDO se consulte un ticket con clasificación, EL SISTEMA mostrará su etiqueta en español.
- **RF-58:** CUANDO se consulte un ticket histórico sin clasificación, EL SISTEMA no inventará una clasificación.
- **RF-59:** CUANDO se muestre un paso de la solicitud pública, EL SISTEMA presentará un único título visible sin repetir la instrucción en el selector.
- **RF-60:** CUANDO se solicite la prioridad, EL SISTEMA conservará visibles las condiciones de atención prioritaria.

## Restricciones

- Interfaz y mensajes en español.
- Solo el Administrador configura servicios por sede y módulos; Administrador y Radicador conservan el acceso a la operación de atención.
- La configuración inicial de servicios por sede es vacía y manual; no se copia ni se selecciona automáticamente el catálogo global.
- Ninguna selección operativa puede utilizar el catálogo global como sustituto de una sede sin servicios asignados.
- Los bloqueos de retiro de servicios se rigen por la validación vigente del servicio de turnos.
- La prioridad continúa siendo la indicada por el paciente al emitir el turno; no se adapta al módulo disponible.
- Se conservan la selección pública explícita sin preselección, sus controles de al menos 48 × 48 píxeles CSS y las reglas vigentes de identificación, ubicación y turno activo único.
- Se conservan las acciones y restricciones de atención existentes fuera de la selección de servicios y del orden de prioridad descritos aquí.
- La posición, la espera estimada y el orden informado de los turnos no se recalculan en la interfaz.
- El flujo será Identificación → Tus datos → Clasificación → Servicio → Prioridad → Confirmación.

## Fuera de alcance

- Crear, editar o desactivar servicios del catálogo global.
- Asignar automáticamente servicios a sedes o transformar automáticamente módulos existentes.
- Elegir un módulo concreto al emitir el turno o asignar manualmente un turno a un módulo.
- Cambiar criterios clínicos de prioridad, geolocalización, identificación o datos de pacientes.
- Cambiar las reglas de cierre de sesión, cancelación, inasistencia o finalización.
- Rediseñar el ticket digital o la pantalla de sala, separar visualmente sus colas o agregar nuevas estimaciones.
- Reportes, estadísticas, notificaciones adicionales o administración masiva entre sedes.

## Dependencias y decisiones de alcance

- Depende del contrato funcional actualizado «Spec backend 005 — Servicios por sede y colas prioritarias», con prioridad por turno y clasificación persistente.
- Amplía la administración descrita en la spec frontend 004 con asignaciones de servicios; mantiene el resto de su alcance.
- Precisa la selección de servicios de las specs frontend 001 y 003 para limitarla a las asignaciones de la sede.
- Restaura la regla de llamado con prioritarios primero en cualquier módulo que atienda el servicio.
- Restringe la transferencia de la spec frontend 005 a servicios activos efectivamente asignados a la sede del turno, aunque no estén seleccionados para la sesión del asesor.
- La lista de próximos turnos conservará su carácter informativo y mostrará la prioridad de cada turno; el backend decidirá el llamado, sin selección manual.
- El ticket seguirá mostrando el estado pendiente habitual sin un aviso especial por ausencia de asesores.
