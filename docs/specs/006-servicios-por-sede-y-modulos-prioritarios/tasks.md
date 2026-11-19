# Implementación frontend 006

Unidades revisables independientes; no se crearán commits en esta tarea.

## Asignaciones de sede — RF-1–16, RF-45–49
- [x] Contrato HTTP tipado y estado Zustand por sede con carga, error y mutación independientes.
- [x] Selección manual completa, configuración vigente separada, vacíos, reintento y rechazo.
- [x] Integración en administración de la sede seleccionada.

## Módulos sin exclusividad — RF-17–23
- [x] Retirar tipo de modelos, validadores de respuesta, tabla y formulario.
- [x] Conservar código, nombre, estado y errores de guardado.

## Solicitud pública — RF-24–30
- [x] Diferenciar servicios vacíos y documentos vacíos; bloquear emisión y permitir recarga.
- [x] Recuperar opciones tras rechazo sin éxito falso; conservar ticket pendiente habitual.

## Atención — RF-31–44
- [x] Validar contrato agrupado sin tipo; seleccionar servicios de la sede y depurar cambios de módulo.
- [x] Mostrar sede sin exclusividad antes y durante sesión; bloquear inicio inválido.
- [x] Transferir solo a otros servicios de la sede, preservando turno ante rechazo.
- [x] Conservar cola informativa con prioridades y llamado decidido por backend.

## Clasificación — RF-50–58
- [x] Agregar tipo y etiquetas compartidas de las tres clasificaciones.
- [x] Insertar selección obligatoria entre Tus datos y Servicio, sin preselección ni filtro del catálogo.
- [x] Actualizar índices, progreso, validación final, edición del resumen y envío.
- [x] Mostrar clasificación en resumen y ticket; admitir tickets históricos sin clasificación.
- [x] Separar inicio de sesión y detalles de ticket para conservar los componentes modificados por debajo de 450 líneas.

## Verificación
- [x] Simplificar encabezados públicos: un título visible por paso, sin subtítulos redundantes; conservar nombres accesibles de los grupos y condiciones de prioridad.
- [x] Revisar criterios por flujo en código; comprobar foco y tamaño del nuevo control público en navegador.
- [ ] Completar recorrido manual autenticado de administración/atención y teclado de extremo a extremo con API y datos de prueba.
- [x] Ejecutar pnpm lint y pnpm build; registrar resultados exactos.
- [x] Ejecutar git diff --check y revisar estado final; preservar AGENTS.md y tsbuildinfo originales.

## Límites de reversión
Cada unidad se puede retirar en sus modelos, servicios, store y componentes de Turnos correspondientes; la unidad de atención comparte el servicio HTTP público, por lo que deben retirarse únicamente sus cambios. No hay migraciones, dependencias ni cambios de API.

## Evidencia de verificación

### Revisión del 19 de noviembre de 2026

- `pnpm build`: salida 0 tras implementar clasificación y retirar exclusividad. Se mantienen las advertencias preexistentes descritas abajo.
- `pnpm lint`: salida 1; 418 problemas (367 errores, 51 advertencias) en áreas ajenas.
- ESLint de archivos TypeScript modificados y nuevos: salida 0, sin diagnósticos.
- Navegador con API simulada, sin escrituras reales: seis pasos; clasificación inicial vacía; intento de avanzar muestra error; las tres clasificaciones muestran servicios `[2, 3]`; resumen y ticket muestran etiqueta.
- Al editar la clasificación se conservaron servicio `2` y prioridad `PRIORITARIO`; el payload incluyó `classification: CONFIRMACION_CITAS`. El ticket histórico sin clasificación no muestra una etiqueta inventada.
- Radios de clasificación: 558 × 92 CSS px en el tamaño de ventana usado. La activación se hizo mediante DOM porque el click nativo de Playwright agotó el tiempo; no acredita recorrido completo por teclado.
- No se agregaron dependencias ni archivos de pruebas frontend. Pendiente integración contra API y MySQL autorizados.

### Evidencia previa (antes de la revisión de prioridad y clasificación)

- `pnpm lint`: salida 1; 418 problemas (367 errores, 51 advertencias), todos fuera de Turnos y de los modelos modificados. Archivos ajenos sin cambios, por ejemplo `RegisterUser.tsx` (`no-unused-vars`), stores (`no-explicit-any`) y `Reports.tsx` (`set-state-in-effect`).
- `pnpm exec eslint src/featuures/Turnos src/models/ITurnoAdmin.ts src/models/ITurnoAtencion.ts`: salida 0, sin diagnósticos.
- `pnpm build`: salida 0; TypeScript y Vite compilan. Advertencias de chunks circulares de Recharts, imports estáticos/dinámicos, chunk vendor vacío y tamaño de bundle en áreas existentes.
- Navegador con `pnpm dev --host 127.0.0.1 --port 5178` y respuesta pública simulada: sede sin servicios muestra bloqueo y no ofrece emitir; botón de recarga mide 254.17 × 48 px y recibe foco. Recarga con catálogo disponible/documentos vacíos muestra el mensaje distinto y devuelve foco al encabezado.
- La recarga se comprobó mediante activación DOM; el recorrido de teclado quedó pendiente porque las acciones Playwright de teclado/click no completaron con el aviso de cookies visible. No se agregaron archivos de pruebas ni framework.
- Administración y atención: revisión estática de vacíos, errores, envío único, alcance por sede y conservación del estado confirmado. Pendiente ejercicio autenticado contra API de prueba para comprobar restricciones de sesiones/turnos reales. No se ejecutaron escrituras reales en el backend.
- `git diff --check`: salida 0, sin errores de espacios; solo avisos de normalización LF/CRLF. `AGENTS.md` conserva su contenido inicial; se repuso el archivo incremental exacto previo al build (no la versión de Git). Ambos mantienen sus modificaciones preexistentes.
