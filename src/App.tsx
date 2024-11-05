import { Route, Routes, Navigate } from "react-router-dom";

//*Componentes
import Footer from "./components/footer";
import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Login from "./components/pages/login";
import Inicio from "./components/pages/inicio";
import Perfil from "./components/pages/perfil";
import SideBar from "./components/pages/sidebar";
import Usuarios from "./components/pages/usuarios";
import CookieConsent from "./components/PopCookie";
import TablaCirugias from "./components/pages/TablaCirugia";
import TablaAuditoria from "./components/pages/TablaAuditoria";
import TablaRadicacion from "./components/pages/TablaRadicacion";
import RegistrarUsuarios from "./components/pages/RegistrarUsuarios";
import TablaCups from "./components/pages/tablas-radicacion/TablaCups";
import Cucuta from "./components/pages/SistemaDeInventario/Sedes/Cucuta";
import Amazonas from "./components/pages/SistemaDeInventario/Sedes/Amazonas";
import TablaConvenios from "./components/pages/tablas-radicacion/TablaConvenio";
import TablaPacientes from "./components/pages/tablas-radicacion/TablaPacientes";
import TablaIpsRemite from "./components/pages/tablas-radicacion/TablaIpsRemite";
import TablaMunicipios from "./components/pages/tablas-radicacion/TablaMunicipios";
import TablaRadicadores from "./components/pages/tablas-radicacion/TablaRadicadores";
import TablaIpsPrimaria from "./components/pages/tablas-radicacion/TablaIpsPrimaria";
import Cundinamarca from "./components/pages/SistemaDeInventario/Sedes/Cundinamarca";
import TablaEspecialidad from "./components/pages/tablas-radicacion/TablaEspecialidad";
import TablaTipoServicio from "./components/pages/tablas-radicacion/TablaTipoServicio";
import TablaTipoDocumento from "./components/pages/tablas-radicacion/TablaTipoDocumento";
import TablaLugarRadicacion from "./components/pages/tablas-radicacion/TablaLugarRadicacion";
import SistemaDeInventario from "./components/pages/SistemaDeInventario/SistemaDeInventario";
import TablaRegistrosAuditados from "./components/pages/tablas-radicacion/TablaRegistrosAuditados";
import TablaAutorizarServicios from "./components/pages/tablas-radicacion/TablaAutorizarServicios";

//*Sede Cucuta (Gestion De Inventario -Cucuta)
import Sede01 from "./components/pages/SistemaDeInventario/Sedes/Cucuta/sede01";
import Sede03 from "./components/pages/SistemaDeInventario/Sedes/Cucuta/sede03";
import Sede04 from "./components/pages/SistemaDeInventario/Sedes/Cucuta/sede04";
import Sede05 from "./components/pages/SistemaDeInventario/Sedes/Cucuta/sede05";
import Sede06 from "./components/pages/SistemaDeInventario/Sedes/Cucuta/sede06";
import Sede07 from "./components/pages/SistemaDeInventario/Sedes/Cucuta/sede07";

//*Sede Cundinamarca (Gestion De Inventario - Cundinamarca)
import Sede01C from "./components/pages/SistemaDeInventario/Sedes/Cundinamarca/sede01.tsx";
import Sede03C from "./components/pages/SistemaDeInventario/Sedes/Cundinamarca/sede03.tsx";
import Sede04C from "./components/pages/SistemaDeInventario/Sedes/Cundinamarca/sede04.tsx";
import Sede05C from "./components/pages/SistemaDeInventario/Sedes/Cundinamarca/sede05.tsx";

//*Sede Amazonas (Gestion de Inventario - Amazonas)
import Sede01A from "./components/pages/SistemaDeInventario/Sedes/Amazonas/sede01.tsx";

//*Contextos
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authContext";
import { useTheme } from "./context/blackWhiteContext";
import { Bounce, ToastContainer } from "react-toastify";
import { SidebarProvider } from "./context/sidebarContext";
import { PrivateRoutes } from "./components/PrivateRoutes";
import FileManager from "./components/pages/SistemaArchivosSGC";
import { UserProfileProvider } from "./context/userProfileContext";

function AppRoutes() {
  const { theme } = useTheme();
  return (
    <div className={`font-semibold ${theme === "dark" ? "dark" : ""}`}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/*"
            element={
              <div className="grid min-h-screen grid-rows-layout">
                <Navbar />
                <div className="relative flex">
                  <SideBar />
                  <main className="flex-1 overflow-auto bg-slate-200 dark:bg-gray-900">
                    <Layout>
                      <Routes>
                        <Route path="/home" element={<Inicio />} />
                        <Route
                          path="/tabla-radicacion"
                          element={<TablaRadicacion />}
                        />
                        <Route
                          path="/tabla-auditoria"
                          element={<TablaAuditoria />}
                        />
                        <Route
                          path="/tabla-registros-auditados"
                          element={<TablaRegistrosAuditados />}
                        />
                        <Route
                          path="/tabla-cirugias"
                          element={<TablaCirugias />}
                        />
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
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route
                          path="/registrar-usuarios"
                          element={<RegistrarUsuarios />}
                        />
                        <Route
                          path="/tabla-autorizar-servicios"
                          element={<TablaAutorizarServicios />}
                        />
                        <Route
                          path="/SistemGestionCalidad"
                          element={<FileManager />}
                        />

                        <Route
                          path="/SistemaDeInventario"
                          element={<SistemaDeInventario />}
                        />

                        <Route
                          path="/SistemaDeInventario/cucuta"
                          element={<Cucuta />}
                        />

                        <Route
                          path="/SistemaDeInventario/cundinamarca"
                          element={<Cundinamarca />}
                        />

                        <Route
                          path="/SistemaDeInventario/amazonas"
                          element={<Amazonas />}
                        />
                        {/* SEDE CUCUTA */}
                        <Route
                          path="/SistemaDeInventario/Cucuta/Sede01"
                          element={<Sede01 />}
                        />

                        <Route
                          path="/SistemaDeInventario/Cucuta/Sede03"
                          element={<Sede03 />}
                        />

                        <Route
                          path="/SistemaDeInventario/Cucuta/Sede04"
                          element={<Sede04 />}
                        />

                        <Route
                          path="/SistemaDeInventario/Cucuta/Sede05"
                          element={<Sede05 />}
                        />

                        <Route
                          path="/SistemaDeInventario/Cucuta/Sede06"
                          element={<Sede06 />}
                        />
                        <Route
                          path="/SistemaDeInventario/Cucuta/Sede07"
                          element={<Sede07 />}
                        />

                        {/* SEDE CUNDINAMARCA */}
                        <Route
                          path="/SistemaDeInventario/Cundinamarca/Sede01C"
                          element={<Sede01C />}
                        />

                        <Route
                          path="/SistemaDeInventario/Cundinamarca/Sede03C"
                          element={<Sede03C />}
                        />

                        <Route
                          path="/SistemaDeInventario/Cundinamarca/Sede04C"
                          element={<Sede04C />}
                        />

                        <Route
                          path="/SistemaDeInventario/Cundinamarca/Sede05C"
                          element={<Sede05C />}
                        />

                        {/* SEDE AMAZONAS */}
                        <Route
                          path="/SistemaDeInventario/Amazonas/Sede01A"
                          element={<Sede01A />}
                        />

                        <Route path="*" element={<Navigate to="/home" />} />
                      </Routes>
                    </Layout>
                  </main>
                </div>
                <Footer />
              </div>
            }
          />
        </Route>

        {/* Ruta por defecto para redirigir a la página de inicio */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <SidebarProvider>
          <CookieConsent />
          <AppRoutes />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </SidebarProvider>
      </UserProfileProvider>
    </AuthProvider>
  );
}
