import React, { Suspense, lazy } from "react";
import { UsersProvider } from "@/featuures/Usuarios/Context/UsersContext.tsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { TicketProvider } from "@/context/ticketContext.tsx";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.tsx";

//*Lazy Components
const Inicio = lazy(() => import("@/featuures/home/page/Home"));
const Perfil = lazy(() => import("@/featuures/profile/page/PerfilPage.tsx"));
const Usuarios = lazy(
  () => import("@/featuures/Usuarios/Pages/TableUsers.tsx")
);
import RecoverLetterPage from "@/featuures/RecoverLetter/Pages/RecoverLetterPage.tsx";
import RecoverLastPage from "@/featuures/AuditRecoveryLetter/Pages/AuditRecoveryLetterPage.tsx";
import TablaRegistrosAuditados from "@/featuures/Auditados/Pages/TableCUPSAuthorized";
import TablaCups from "@/featuures/CUPS/Pages/TablaCups";
import TablaPacientes from "@/featuures/Patient/Pages/TablaPatient";
import TablaDiagnostico from "@/featuures/Diagnostico/Pages/TablaDiagnostico";
import TablaMunicipios from "@/featuures/Municipality/Pages/TablaMunicipios";
import TablaConvenios from "@/featuures/Convenio/Pages/TablaConvenio";
import TablaTipoDocumento from "@/featuures/DocumentType/Pages/TablaTipoDocumento";
import TablaIpsPrimaria from "@/featuures/IpsPrimaria/Pages/TablaIpsPrimaria";
import TablaLugarRadicacion from "@/featuures/Sede/Pages/TablaLugarRadicacion";
import TablaIpsRemite from "@/featuures/IpsRemite/Pages/TablaIpsRemite";
import TablaEspecialidad from "@/featuures/Especialidad/Pages/TablaEspecialidad";
import TablaTipoServicio from "@/featuures/TypeService/Pages/TablaTipoServicio";
import DemandInduce from "@/featuures/DemandInduce/Page/DemandInduce";
import Area from "@/featuures/Areas/Page/Area";
import Position from "@/featuures/Position/Page/Position";
import Permission from "@/featuures/Permission/page/Permission";
import NotFound from "@/featuures/NotFound/Page/NotFound";
import TableBalancesVacations from "@/featuures/ConfigurationVacations/Page/TableBalancesVacations";
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
  () => import("@/featuures/Radicacion/Page/TableServiceRequestSubmission")
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
  () => import("@/featuures/UserRegister/Page/TableRegisterBiometric")
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
        <Route path="*" element={<NotFound />} />
        {/* Rutas generales sin contextos específicos */}
        <Route path="/home" element={<Inicio />} />
        <Route path="/tabla-radicacion" element={<TablaRadicacion />} />
        <Route path="/tabla-auditoria" element={<TablaAuditoria />} />
        <Route path="/tabla-cirugias" element={<TablaCirugias />} />
        <Route path="/tabla-cups" element={<TablaCups />} />
        <Route path="/tabla-pacientes" element={<TablaPacientes />}></Route>
        <Route path="/tabla-diagnostico" element={<TablaDiagnostico />} />
        <Route path="/tabla-municipios" element={<TablaMunicipios />} />
        <Route path="/tabla-convenios" element={<TablaConvenios />} />
        <Route path="/tabla-tipo-documento" element={<TablaTipoDocumento />} />
        <Route path="/tabla-ips-primaria" element={<TablaIpsPrimaria />} />
        <Route path="/tabla-lugar-radicacion" element={<TablaLugarRadicacion />} />
        <Route path="/tabla-ips-remite" element={<TablaIpsRemite />} />
        <Route path="/tabla-especialidad" element={<TablaEspecialidad />} />
        <Route path="/tabla-tipo-servicio" element={<TablaTipoServicio />} />
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
        <Route path="/demanda/inducida" element={<DemandInduce />}/>
        <Route path="/area" element={<Area />} />
        <Route path="/cargo" element={<Position />} />
        <Route path="/permissions" element={<Permission />} />
        <Route path="/configuration-vacations" element={<TableBalancesVacations />} />


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
