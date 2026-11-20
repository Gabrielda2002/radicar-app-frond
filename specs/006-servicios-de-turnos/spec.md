# Spec 006 — Administración de servicios de turnos

**Estado:** Aprobada.

## Objetivo

Permitir al administrador mantener el catálogo de servicios de turnos desde Configuración sin interrumpir la atención en curso ni cambiar las asignaciones por sede.

## Alcance

- Consultar el catálogo de servicios activos e inactivos en **Configuración → Turnos → Servicios de turnos**.
- Crear servicios, editar sus nombres y activar o desactivar servicios existentes.
- Impedir la desactivación de servicios con sesiones activas o turnos sin resolver en cualquier sede.

## Criterios de aceptación

### Acceso y consulta

- **RF-1:** CUANDO un usuario con rol Administrador (rol 1) abra Turnos en Configuración, EL SISTEMA mostrará la sección «Servicios de turnos».
- **RF-2:** SI un usuario no tiene el rol Administrador, ENTONCES EL SISTEMA no mostrará la sección «Servicios de turnos».
- **RF-3:** SI se intenta consultar o modificar el catálogo desde administración sin el rol Administrador, ENTONCES EL SISTEMA rechazará el acceso.
- **RF-4:** CUANDO el administrador abra «Servicios de turnos», EL SISTEMA mostrará el nombre y el estado de cada servicio activo e inactivo.
- **RF-5:** SI el catálogo está vacío, ENTONCES EL SISTEMA mostrará un mensaje de estado vacío.
- **RF-6:** SI no se puede consultar el catálogo, ENTONCES EL SISTEMA informará que no pudo cargar los servicios.

### Creación y edición

- **RF-7:** CUANDO el administrador guarde un servicio nuevo con un nombre válido, EL SISTEMA lo registrará como activo.
- **RF-8:** CUANDO el administrador guarde un nombre válido para un servicio existente, EL SISTEMA actualizará el nombre del mismo servicio.
- **RF-9:** SI el nombre tiene menos de 3 o más de 150 caracteres después de quitar los espacios de los extremos, ENTONCES EL SISTEMA rechazará el guardado.
- **RF-10:** CUANDO el administrador reactive un servicio inactivo, EL SISTEMA cambiará su estado a activo.
- **RF-11:** CUANDO el administrador desactive un servicio sin sesiones activas que lo utilicen ni turnos sin resolver, EL SISTEMA cambiará su estado a inactivo.
- **RF-12:** SI el servicio está asignado a una sesión activa en cualquier sede, ENTONCES EL SISTEMA rechazará la desactivación e informará el motivo.
- **RF-13:** SI el servicio tiene un turno pendiente, llamado o en atención en cualquier sede, ENTONCES EL SISTEMA rechazará la desactivación e informará el motivo.
- **RF-14:** MIENTRAS un servicio esté inactivo, EL SISTEMA no permitirá solicitar nuevos turnos para ese servicio.
- **RF-15:** EL SISTEMA conservará las asignaciones por sede al editar, activar o desactivar un servicio.
- **RF-16:** EL SISTEMA no asignará automáticamente a ninguna sede los servicios nuevos.

### Resultados del guardado

- **RF-17:** CUANDO una operación de guardado finalice correctamente, EL SISTEMA mostrará una confirmación.
- **RF-18:** CUANDO una operación de guardado finalice correctamente, EL SISTEMA reflejará el cambio en el listado sin requerir una recarga manual.
- **RF-19:** SI el guardado falla, ENTONCES EL SISTEMA conservará los datos previamente guardados.
- **RF-20:** SI el guardado falla, ENTONCES EL SISTEMA informará el error.

## Restricciones

- Los textos de interfaz y los mensajes estarán en español.
- El permiso de administración aplica tanto a la pantalla como a las operaciones de consulta y modificación del catálogo administrativo.

## Fuera de alcance

- Eliminar servicios del catálogo.
- Agregar, retirar o editar asignaciones de servicios por sede desde la nueva sección.
- Cancelar o reasignar turnos para permitir una desactivación.
- Cerrar sesiones de atención para permitir una desactivación.

## Dependencias

- El catálogo vigente de servicios de atención.
- La configuración de servicios asignados a sedes.
- La información vigente de sesiones de atención y estados de turnos.
