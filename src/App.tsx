import { Route, Routes, Navigate } from "react-router-dom";

import SideBar from "./components/pages/sidebar";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Inicio from "./components/pages/inicio";
import Modulos from "./components/pages/modulos";
import Perfil from "./components/pages/perfil";

// Importar los componentes de tablas
import Tabla from "./components/pages/tabla";
import TablaAuditoria from "./components/pages/tabla-auditoria";
import TablaCirugias from "./components/pages/tabla-cirugias";
import TablaCups from "./components/pages/tablas-radicacion/tabla-cups";
import TablaPacientes from "./components/pages/tablas-radicacion/tabla-pacientes";
import TablaRadicadores from "./components/pages/tablas-radicacion/tabla-radicadores";
import TablaMunicipios from "./components/pages/tablas-radicacion/tabla-municipios";
import TablaConvenios from "./components/pages/tablas-radicacion/tabla-convenios";
import TablaTipoDocumento from "./components/pages/tablas-radicacion/tabla-tipo-documento";
import TablaIpsPrimaria from "./components/pages/tablas-radicacion/tabla-ips-primaria";
import TablaLugarRadicacion from "./components/pages/tablas-radicacion/tabla-lugar-radicacion";
import TablaIpsRemite from "./components/pages/tablas-radicacion/tabla-ips-remite";
import TablaEspecialidad from "./components/pages/tablas-radicacion/tabla-especialidad";
import TablaTipoServicio from "./components/pages/tablas-radicacion/tabla-tipo-servicio";

import Login from "./components/pages/login";
import Navbar from "./components/navbar";
import { AuthProvider } from "./contexts/authContext";
import { PrivateRoutes } from "./components/privateRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoutes />}>
        <Route
          path="/*"
          element={
            <div className="flex flex-row h-full w-full">
              <SideBar />
              <div className="flex flex-col flex-grow bg-slate-200">
                <div className="flex-grow overflow-auto">
                  <Layout>
                    <Navbar />
                    <Routes>
                      <Route path="/home" element={<Inicio />} />
                      <Route path="/modulos" element={<Modulos />} />
                      <Route path="/tabla" element={<Tabla />} />
                      <Route
                        path="/tabla-auditoria"
                        element={<TablaAuditoria />}
                      />
                      <Route path="/tabla-cirugias" element={<TablaCirugias />} />
                      <Route path="/tabla-cups" element={<TablaCups />} />
                      <Route
                        path="/tabla-pacientes"
                        element={<TablaPacientes />}
                      />
                      <Route
                        path="/tabla-radicadores"
                        element={<TablaRadicadores />}
                      />
                      <Route
                        path="/tabla-municipios"
                        element={<TablaMunicipios />}
                      />
                      <Route
                        path="/tabla-convenios"
                        element={<TablaConvenios />}
                      />
                      <Route
                        path="/tabla-tipo-documento"
                        element={<TablaTipoDocumento />}
                      />
                      <Route
                        path="/tabla-ips-primaria"
                        element={<TablaIpsPrimaria />}
                      />
                      <Route
                        path="/tabla-lugar-radicacion"
                        element={<TablaLugarRadicacion />}
                      />
                      <Route
                        path="/tabla-ips-remite"
                        element={<TablaIpsRemite />}
                      />
                      <Route
                        path="/tabla-especialidad"
                        element={<TablaEspecialidad />}
                      />
                      <Route
                        path="/tabla-tipo-servicio"
                        element={<TablaTipoServicio />}
                      />
                      <Route path="/perfil" element={<Perfil />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Layout>
                  <Footer />
                </div>
              </div>
            </div>
          }
        />
      </Route>

      {/* Ruta por defecto para redirigir a la página de inicio */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
