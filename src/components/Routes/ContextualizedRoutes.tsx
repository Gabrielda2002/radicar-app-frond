import React, { Suspense, lazy } from "react";
import { UsersProvider } from "@/featuures/Usuarios/Context/UsersContext.tsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { TicketProvider } from "@/context/ticketContext.tsx";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.tsx";

//*Lazy Components
const Inicio = lazy(() => import("@/featuures/home/page/Inicio.tsx"));
const Perfil = lazy(() => import("@/featuures/profile/page/PerfilPage.tsx"));
const Usuarios = lazy(
  () => import("@/featuures/Usuarios/Pages/TableUsers.tsx")
);
import RecoverLetterPage from "@/featuures/RecoverLetter/Pages/RecoverLetterPage.tsx";
import RecoverLastPage from "@/featuures/AuditRecoveryLetter/Pages/AuditRecoveryLetterPage.tsx";
import TablaRegistrosAuditados from "@/featuures/Auditados/Pages/TablaRegistrosAuditados";
const RegistrarUsuarios = lazy(
  () => import("@/featuures/RegisterUser/Page/RegisterUser.tsx")
);

//*Lazy Principale Tables
const TableRoutes = lazy(() => import("@/components/Routes/TablesRoutes.tsx"));
const TablaCirugias = lazy(
  () => import("@/featuures/Cirugia/Pages/TablaCirugia.tsx")
);
const TablaAuditoria = lazy(
  () => import("@/featuures/Auditoria/Pages/TablaAuditoria.tsx")
);
const TablaRadicacion = lazy(
  () => import("@/featuures/Radicacion/Page/TablaRadicacion.tsx")
);
const TablaAutorizarServicios = lazy(
  () => import("@/featuures/AuthorizeService/Pages/TablaAutorizarServicios.tsx")
);
const FileManager = lazy(
  () => import("@/featuures/SystemGC/Page/SistemaArchivosSGC.tsx")
);
const SistemaInventario = lazy(
  () => import("@/featuures/SystemInventory/Pages/InventorySystem.tsx")
);
const RegistroUsuarios = lazy(
  () => import("@/featuures/UserRegister/Page/RegistroUsuario.tsx")
);
const GestionTickets = lazy(
  () => import("@/featuures/HelpDesk/Pages/ProcessHelpDesk.tsx")
);

// Componente para rutas envueltas en el contexto de usuarios
const UsersPage = () => (
  <UsersProvider>
    <Usuarios />
  </UsersProvider>
);

// Componente para rutas envueltas en el contexto de tickets
const TicketsPage = () => (
  <TicketProvider>
    <GestionTickets />
  </TicketProvider>
);

const ContextualizedRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        {/* Rutas generales sin contextos específicos */}
        <Route path="/home" element={<Inicio />} />
        <Route path="/tabla-radicacion" element={<TablaRadicacion />} />
        <Route path="/tabla-auditoria" element={<TablaAuditoria />} />
        <Route path="/tabla-cirugias" element={<TablaCirugias />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/registrar-usuarios" element={<RegistrarUsuarios />} />
        <Route
          path="/tabla-autorizar-servicios"
          element={<TablaAutorizarServicios />}
        />
        <Route
          path="/tabla-registros-auditados"
          element={<TablaRegistrosAuditados />}
        />
        <Route path="/SistemGestionCalidad" element={<FileManager />} />
        <Route path="/carta-recobro" element={<RecoverLetterPage />} />
        <Route path="/auditoria" element={<RecoverLastPage />} />
        <Route path="/SistemaInventario" element={<SistemaInventario />} />
        <Route path="/RegistroUsuarios" element={<RegistroUsuarios />} />

        {/* Rutas con contextos específicos */}
        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/GestionTickets" element={<TicketsPage />} />

        {/* Rutas de las tablas radicacion - asegurándose que no entre en conflicto */}
        <Route path="/tablas/*" element={<TableRoutes />} />

        {/* Fallback route - debe ser la última */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Suspense>
  );
};

export default ContextualizedRoutes;
