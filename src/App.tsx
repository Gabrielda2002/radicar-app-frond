//*Componentes
import { lazy, Suspense } from "react";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Login from "./components/pages/login.tsx";
import SideBar from "./components/pages/sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner.tsx";

//*Lazy Components
const Inicio = lazy(() => import("./components/pages/inicio.tsx"));
const Perfil = lazy(() => import("./components/pages/perfil.tsx"));
const Usuarios = lazy(() => import("./components/pages/usuarios.tsx"));
const CookieConsent = lazy(() => import("./components/PopCookie.tsx"));
const RegistrarUsuarios = lazy(
  () => import("./components/pages/RegistrarUsuarios.tsx")
);
const SistemaDeInventario = lazy(
  () => import("./components/pages/SistemaDeInventario/SistemaDeInventario.tsx")
);

//*Lazy Principale Tables
const TableRoutes = lazy(() => import("./components/Routes/TablesRoutes.tsx"));
const TablaCirugias = lazy(() => import("./components/pages/TablaCirugia.tsx"));

const TableInventory = lazy(
  () => import("./components/Routes/TablesInventory.tsx")
);

const TablaAuditoria = lazy(
  () => import("./components/pages/TablaAuditoria.tsx")
);

const TablaRadicacion = lazy(
  () => import("./components/pages/TablaRadicacion.tsx")
);

const TablaAutorizarServicios = lazy(
  () =>
    import("./components/pages/tablas-radicacion/TablaAutorizarServicios.tsx")
);

const FileManager = lazy(
  () => import("./components/pages/SistemaArchivosSGC.tsx")
);

//*Contextos
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authContext";
import { useTheme } from "./context/blackWhiteContext";
import { Bounce, ToastContainer } from "react-toastify";
import { SidebarProvider } from "./context/sidebarContext";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { UserProfileProvider } from "./context/userProfileContext";
import SistemaInventario from "./components/pages/SistemaDeInventario/SistemaInventario.tsx";

function AppRoutes() {
  return (
    <div>
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
                      <Suspense
                        fallback={
                          <div className="flex items-center justify-center">
                            <LoadingSpinner />
                          </div>
                        }
                      >
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
                            path="/tabla-cirugias"
                            element={<TablaCirugias />}
                          />
                          <Route path="/perfil" element={<Perfil />} />
                          <Route
                            path="/registrar-usuarios"
                            element={<RegistrarUsuarios />}
                          />
                          <Route path="/usuarios" element={<Usuarios />} />
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
                          {/* rutas de las tablas radicacion */}
                          <Route path="*" element={<TableRoutes />} />
                          <Route
                            path="/SistemaDeInventario/*"
                            element={<TableInventory />}
                          />
                          <Route
                            path="/SistemaInventario"
                            element={<SistemaInventario />}
                          />
                          <Route path="*" element={<Navigate to="/home" />} />
                        </Routes>
                      </Suspense>
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
  const { theme } = useTheme();
  return (
    <div className={`font-semibold ${theme === "dark" ? "dark" : ""}`}>
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
    </div>
  );
}
