import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const TablaCups = lazy(() => import("../../featuures/CUPS/Pages/TablaCups"));
const TablaConvenio = lazy(
  () => import("@/featuures/Convenio/Pages/TablaConvenio")
);
const TablaPacientes = lazy(
  () => import("../pages/tablas-radicacion/TablaPacientes")
);
const TablaIpsRemite = lazy(
  () => import("../pages/tablas-radicacion/TablaIpsRemite")
);
const TablaMunicipios = lazy(
  () => import("../../featuures/Municipality/Pages/TablaMunicipios")
);
const TablaIpsPrimaria = lazy(
  () => import("../../featuures/IpsPrimaria/Pages/TablaIpsPrimaria")
);
const TablaRadicadores = lazy(
  () => import("../pages/tablas-radicacion/TablaRadicadores")
);
const TablaEspecialidad = lazy(
  () => import("../../featuures/Especialidad/Pages/TablaEspecialidad")
);
const TablaTipoServicio = lazy(
  () => import("../pages/tablas-radicacion/TablaTipoServicio")
);
const TablaTipoDocumento = lazy(
  () => import("../pages/tablas-radicacion/TablaTipoDocumento")
);
const TablaLugarRadicacion = lazy(
  () => import("../pages/tablas-radicacion/TablaLugarRadicacion")
);
const TablaAutorizarServicios = lazy(
  () => import("../../featuures/AuthorizeService/Pages/TablaAutorizarServicios")
);
const TablaRegistrosAuditados = lazy(
  () => import("../pages/tablas-radicacion/TablaRegistrosAuditados")
);
const TablaDiagnostico = lazy(
  () => import("../../featuures/Diagnostico/Pages/TablaDiagnostico")
);

export default function TablaRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route path="/tabla-cups" element={<TablaCups />} />
        <Route
          path="/tabla-registros-auditados"
          element={<TablaRegistrosAuditados />}
        />
        <Route path="/tabla-pacientes" element={<TablaPacientes />} />
        <Route path="/tabla-radicadores" element={<TablaRadicadores />} />
        <Route path="/tabla-municipios" element={<TablaMunicipios />} />
        <Route path="/tabla-convenios" element={<TablaConvenio />} />
        <Route path="/tabla-tipo-documento" element={<TablaTipoDocumento />} />
        <Route path="/tabla-ips-primaria" element={<TablaIpsPrimaria />} />
        <Route
          path="/tabla-lugar-radicacion"
          element={<TablaLugarRadicacion />}
        />
        <Route
          path="/tabla-autorizar-servicios"
          element={<TablaAutorizarServicios />}
        />
        <Route path="/tabla-ips-remite" element={<TablaIpsRemite />} />
        <Route path="/tabla-especialidad" element={<TablaEspecialidad />} />
        <Route path="/tabla-tipo-servicio" element={<TablaTipoServicio />} />
        <Route path="/tabla-diagnostico" element={<TablaDiagnostico />} />
      </Routes>
    </Suspense>
  );
}
