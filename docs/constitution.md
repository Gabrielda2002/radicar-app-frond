# Constitución del proyecto
1. **Stack:** React, TypeScript, Vite, Tailwind, Zustand, Formik, Yup y React Router. prohibido agregues dependencias o codigo muerto sin autorización.
2. **Spec y código:** todo cambio funcional debe cumplir los criterios de aceptación de una spec aprobada.
3. **Lógica e interfaz:** mantén las reglas de negocio fuera de los componentes de presentación.
4. **Tests:** no incorpores un framework de tests sin aprobación; valida cambios con `pnpm lint` y `pnpm build`.
5. **Persistencia:** persiste datos de negocio en el backend; limita `localStorage` a las claves de sesión y autenticación existentes.
6. **Idioma:** usa inglés para identificadores técnicos y español para textos de interfaz y mensajes; conserva términos de dominio.
