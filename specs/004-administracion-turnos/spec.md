# Spec 004 — Administración de sedes y módulos de turnos

**Estado:** Aprobada.

## Objetivo

Permitir que los usuarios autorizados configuren las sedes que ofrecen turnos y administren sus módulos de atención desde Configuración.

## Alcance

- Consultar y editar la configuración de turnos de las sedes configuradas.
- Agregar la configuración de una sede que todavía no tenga una.
- Definir slug, ubicación, radio de atención, tiempo promedio de servicio y estado de la sede.
- Seleccionar la ubicación de la sede en un mapa o ingresar sus coordenadas manualmente.
- Copiar los enlaces públicos de solicitud de turno y de pantalla de sala.
- Crear, editar, activar y desactivar módulos de atención asociados a una sede.

## Criterios de aceptación

### Acceso y sedes configuradas

- **RF-1:** CUANDO un usuario con rol Administrador acceda a Configuración, EL SISTEMA ofrecerá la sección “Administración de turnos”.
- **RF-2:** CUANDO el usuario abra “Administración de turnos”, EL SISTEMA mostrará únicamente las sedes que ya tienen configuración de turnos.
- **RF-3:** CUANDO existan sedes configuradas, EL SISTEMA mostrará para cada sede su nombre, slug, estado, ubicación, radio permitido y tiempo promedio de servicio.
- **RF-4:** CUANDO el usuario seleccione una sede configurada, EL SISTEMA permitirá editar su configuración.
- **RF-5:** CUANDO el usuario elija agregar una sede, EL SISTEMA permitirá seleccionar una sede del catálogo que todavía no tenga configuración de turnos.
- **RF-6:** SI no existen sedes configuradas, ENTONCES EL SISTEMA mostrará un estado vacío y permitirá agregar una sede.
- **RF-7:** SI no quedan sedes del catálogo sin configurar, ENTONCES EL SISTEMA informará que todas las sedes ya tienen configuración.

### Configuración de sede

- **RF-8:** CUANDO el usuario configure una sede, EL SISTEMA permitirá definir un slug único para sus enlaces públicos.
- **RF-9:** CUANDO el usuario edite el slug de una sede, EL SISTEMA mostrará debajo del campo una advertencia de que los enlaces anteriores dejarán de funcionar.
- **RF-10:** CUANDO el usuario guarde un slug editado, EL SISTEMA actualizará los enlaces públicos mostrados para esa sede.
- **RF-11:** SI el slug ingresado ya está asignado a otra sede, ENTONCES EL SISTEMA conservará la configuración actual e informará el conflicto.
- **RF-12:** CUANDO el usuario configure la ubicación de una sede, EL SISTEMA permitirá establecer un punto en el mapa.
- **RF-13:** CUANDO el usuario seleccione un punto en el mapa, EL SISTEMA actualizará las coordenadas de la sede.
- **RF-14:** CUANDO el usuario mueva el marcador de ubicación, EL SISTEMA actualizará las coordenadas de la sede.
- **RF-15:** CUANDO el usuario cambie las coordenadas manualmente, EL SISTEMA actualizará la ubicación representada en el mapa.
- **RF-16:** CUANDO el usuario defina el radio permitido, EL SISTEMA mostrará en el mapa el área correspondiente alrededor de la ubicación seleccionada.
- **RF-17:** CUANDO el usuario configure una sede, EL SISTEMA permitirá definir el tiempo promedio de servicio en minutos.
- **RF-18:** CUANDO el usuario configure una sede, EL SISTEMA permitirá habilitarla o deshabilitarla para la operación de turnos.
- **RF-19:** CUANDO el usuario guarde una configuración válida, EL SISTEMA confirmará que los cambios fueron guardados.
- **RF-20:** SI la configuración no se puede guardar, ENTONCES EL SISTEMA conservará los valores existentes e informará el error recibido.

### Enlaces públicos

- **RF-21:** CUANDO el usuario consulte una sede configurada, EL SISTEMA mostrará el enlace público para solicitar un turno usando el slug vigente.
- **RF-22:** CUANDO el usuario consulte una sede configurada, EL SISTEMA mostrará el enlace público de la pantalla de sala usando el slug vigente.
- **RF-23:** CUANDO el usuario copie uno de los enlaces, EL SISTEMA confirmará que fue copiado.
- **RF-24:** SI el enlace no se puede copiar, ENTONCES EL SISTEMA permitirá al usuario acceder y copiarlo manualmente.

### Módulos de atención

- **RF-25:** CUANDO el usuario seleccione una sede, EL SISTEMA mostrará los módulos asociados a esa sede.
- **RF-26:** CUANDO el usuario consulte los módulos de una sede, EL SISTEMA mostrará los módulos activos e inactivos.
- **RF-27:** CUANDO el usuario cree un módulo, EL SISTEMA solicitará un código y un nombre para asociarlo a la sede seleccionada.
- **RF-28:** CUANDO el usuario edite un módulo, EL SISTEMA permitirá modificar su código y nombre.
- **RF-29:** CUANDO el usuario cambie el estado de un módulo, EL SISTEMA permitirá activarlo o desactivarlo.
- **RF-30:** SI no hay módulos asociados a la sede seleccionada, ENTONCES EL SISTEMA mostrará un estado vacío y permitirá crear uno.
- **RF-31:** SI una operación de módulo falla, ENTONCES EL SISTEMA conservará la información vigente e informará el error recibido.

## Restricciones

- La interfaz y sus mensajes estarán en español.
- La administración estará disponible dentro de Configuración.
- Solo el rol Administrador podrá administrar esta configuración.
- Los enlaces públicos usarán el slug vigente de cada sede.
- La ubicación se podrá establecer tanto desde el mapa como mediante coordenadas manuales.
- Los módulos inactivos permanecerán visibles para permitir su reactivación.

## Fuera de alcance

- Llamar, atender, finalizar o cancelar turnos desde una pantalla de asesor.
- Eliminar físicamente sedes o módulos.
- Administrar servicios clínicos asociados a las sedes.
- Buscar direcciones o lugares para obtener coordenadas.
- Cambiar las reglas públicas de emisión, ubicación o recuperación de turnos.
- Crear o modificar endpoints del backend.

## Dependencias

- La API existente para consultar y guardar configuraciones de sedes y módulos.
- El catálogo de sedes disponible para elegir sedes todavía no configuradas.
- Las rutas públicas existentes de solicitud de turno y pantalla de sala.
- La disponibilidad del mapa base y de la función de copiado del navegador.
