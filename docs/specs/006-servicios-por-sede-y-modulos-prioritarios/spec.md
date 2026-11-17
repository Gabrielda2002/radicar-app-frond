# Spec frontend 006 — Servicios por sede y módulos prioritarios

**Estado:** Aprobada por el usuario.

## Objetivo

Permitir que el Administrador defina qué servicios de turnos ofrece cada sede y qué módulos atienden turnos generales o prioritarios, para que pacientes y asesores solo seleccionen servicios habilitados en la sede correspondiente y comprendan la separación de las colas.

## Alcance

- Configurar manualmente los servicios de cada sede desde Administración de turnos, dentro de Configuración.
- Mostrar las asignaciones actuales y permitir agregar o retirar servicios del catálogo activo.
- Consultar y definir el tipo exclusivo de atención de cada módulo: general o prioritario.
- Adaptar la selección de servicios de la solicitud pública, del inicio de atención y de las transferencias a la sede correspondiente.
- Identificar el tipo de módulo durante la selección y la sesión de atención.
- Reflejar los rechazos de cambios de configuración o de operaciones de turnos sin presentar cambios rechazados como guardados.
- Conservar la emisión de turnos prioritarios aunque no haya un módulo prioritario configurado o con sesión activa.

## Criterios de aceptación (EARS)

### Administración de servicios por sede

- **RF-1:** CUANDO un Administrador consulte una sede configurada en Administración de turnos, EL SISTEMA ofrecerá la gestión de sus servicios de turnos.
- **RF-2:** SI un usuario no tiene el rol Administrador, ENTONCES EL SISTEMA impedirá que administre las asignaciones de servicios o el tipo de los módulos.
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

### Tipo de módulo

- **RF-17:** CUANDO el Administrador consulte los módulos de una sede, EL SISTEMA mostrará el tipo general o prioritario de cada módulo, incluidos los inactivos.
- **RF-18:** CUANDO el Administrador cree o edite un módulo, EL SISTEMA exigirá elegir explícitamente un único tipo de atención entre general y prioritario, sin preselección.
- **RF-19:** CUANDO se muestre la elección del tipo de módulo, EL SISTEMA explicará que un módulo general atiende exclusivamente turnos generales y uno prioritario exclusivamente turnos prioritarios.
- **RF-20:** CUANDO el Administrador consulte o edite un módulo existente, EL SISTEMA mostrará el tipo vigente informado para ese módulo.
- **RF-21:** SI se rechaza un cambio de tipo porque el módulo tiene una sesión activa, ENTONCES EL SISTEMA informará que debe cerrarse esa sesión antes de cambiar el tipo.
- **RF-22:** SI se rechaza el cambio de tipo de un módulo, ENTONCES EL SISTEMA conservará el tipo confirmado como vigente.
- **RF-23:** CUANDO el Administrador configure los módulos de una sede, EL SISTEMA permitirá que más de uno sea prioritario.

### Solicitud pública de turnos

- **RF-24:** CUANDO el paciente seleccione un servicio para solicitar turno, EL SISTEMA ofrecerá únicamente los servicios activos asignados a la sede de la solicitud.
- **RF-25:** SI la sede no tiene servicios habilitados disponibles, ENTONCES EL SISTEMA informará que no es posible emitir un nuevo turno en esa sede.
- **RF-26:** MIENTRAS la sede no tenga servicios habilitados disponibles, EL SISTEMA impedirá confirmar una nueva solicitud de turno.
- **RF-27:** SI se rechaza una emisión porque el servicio seleccionado dejó de estar activo o asignado a la sede, ENTONCES EL SISTEMA informará que el servicio ya no está disponible para esa solicitud.
- **RF-28:** CUANDO el paciente actualice las opciones tras un rechazo por servicio no disponible, EL SISTEMA permitirá seleccionar entre los servicios vigentes de la sede.
- **RF-29:** SI no hay módulos prioritarios configurados o con sesión activa, ENTONCES EL SISTEMA permitirá solicitar un turno prioritario sujeto a las demás condiciones de emisión vigentes.
- **RF-30:** CUANDO se confirme la emisión de un turno prioritario sin un módulo compatible disponible, EL SISTEMA mostrará su ticket en el estado pendiente informado.

### Inicio y operación de atención

- **RF-31:** CUANDO un Administrador o Radicador seleccione un módulo para iniciar atención, EL SISTEMA mostrará la sede y el tipo de atención del módulo.
- **RF-32:** CUANDO el asesor seleccione un módulo, EL SISTEMA ofrecerá para la sesión únicamente servicios activos asignados a la sede de ese módulo.
- **RF-33:** CUANDO el asesor cambie el módulo seleccionado antes de iniciar la sesión, EL SISTEMA descartará de su selección los servicios que no estén habilitados en la sede del nuevo módulo.
- **RF-34:** SI la sede del módulo no tiene servicios disponibles, ENTONCES EL SISTEMA informará que no puede iniciarse atención hasta que se configure al menos uno.
- **RF-35:** SI falta seleccionar un módulo disponible o al menos un servicio válido, ENTONCES EL SISTEMA impedirá iniciar la sesión de atención.
- **RF-36:** SI se rechaza el inicio de sesión por servicios que dejaron de estar habilitados, ENTONCES EL SISTEMA informará el motivo sin mostrar la sesión como iniciada.
- **RF-37:** MIENTRAS exista una sesión activa, EL SISTEMA mostrará el tipo exclusivo de atención del módulo.
- **RF-38:** CUANDO el asesor solicite llamar al siguiente turno, EL SISTEMA mostrará el turno confirmado para los servicios de su sesión y el tipo de su módulo, según el orden de llegada dentro de la cola compatible.
- **RF-39:** SI la operación de llamado informa que no hay turnos elegibles, ENTONCES EL SISTEMA informará que no hay turnos disponibles para los servicios y el tipo de módulo de esa sesión.
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

## Restricciones

- Interfaz y mensajes en español.
- Solo el Administrador configura servicios por sede y tipos de módulo; Administrador y Radicador conservan el acceso a la operación de atención.
- La configuración inicial de servicios por sede es vacía y manual; no se copia ni se selecciona automáticamente el catálogo global.
- Ninguna selección operativa puede utilizar el catálogo global como sustituto de una sede sin servicios asignados.
- El tipo de módulo no cambia durante una sesión activa; los bloqueos de retiro de servicios y cambio de tipo se rigen por la validación vigente del servicio de turnos.
- La prioridad continúa siendo la indicada por el paciente al emitir el turno; no se adapta al módulo disponible.
- Se conservan la selección pública explícita sin preselección, sus controles de al menos 48 × 48 píxeles CSS y las reglas vigentes de identificación, ubicación y turno activo único.
- Se conservan las acciones y restricciones de atención existentes fuera de la selección de servicios y de la separación por tipo de módulo descritas aquí.
- La posición, la espera estimada y el orden informado de los turnos no se recalculan en la interfaz.
- El tipo de atención de un módulo nuevo no tendrá un valor inicial; el Administrador deberá escogerlo antes de guardar.

## Fuera de alcance

- Crear, editar o desactivar servicios del catálogo global.
- Asignar automáticamente servicios a sedes o transformar automáticamente módulos existentes.
- Crear un tipo de módulo mixto o permitir atender la otra prioridad cuando la cola propia esté vacía.
- Elegir un módulo concreto al emitir el turno o asignar manualmente un turno a un módulo.
- Cambiar criterios clínicos de prioridad, geolocalización, identificación o datos de pacientes.
- Cambiar las reglas de cierre de sesión, cancelación, inasistencia o finalización.
- Rediseñar el ticket digital o la pantalla de sala, separar visualmente sus colas o agregar nuevas estimaciones.
- Reportes, estadísticas, notificaciones adicionales o administración masiva entre sedes.
- Modificar el servicio backend, preparar el diseño técnico o elaborar tareas de implementación.

## Dependencias y decisiones de alcance

- Depende del contrato funcional aprobado «Spec backend 005 — Servicios por sede y colas prioritarias», en particular las restricciones de retiro de servicios, la exclusividad de los módulos y la emisión prioritaria sin cobertura activa.
- Amplía la administración descrita en la spec frontend 004 con asignaciones de servicios y tipo de módulo; mantiene el resto de su alcance.
- Precisa la selección de servicios de las specs frontend 001 y 003 para limitarla a las asignaciones de la sede.
- Actualiza la regla de llamado de la spec frontend 005: la prioridad define colas exclusivas por tipo de módulo, con orden de llegada dentro de cada cola; no existe alternancia entre prioridades en un mismo módulo.
- Restringe la transferencia de la spec frontend 005 a servicios activos efectivamente asignados a la sede del turno, aunque no estén seleccionados para la sesión del asesor.
- El Administrador elegirá explícitamente el tipo de cada módulo; el formulario no preseleccionará «General» ni «Prioritario».
- La lista de próximos turnos conservará su carácter informativo y mostrará la prioridad de cada turno. El llamado seguirá limitado por el tipo del módulo y lo decidirá el backend; no se agrega selección manual de turnos.
- El ticket seguirá mostrando el estado pendiente habitual cuando no haya un módulo prioritario compatible activo. No se agrega un aviso especial al paciente.
