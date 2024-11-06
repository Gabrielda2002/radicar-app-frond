//*Componentes
import { lazy, Suspense } from "react";
import Footer from "./components/footer";
import Layout from "./components/layout";
import Navbar from "./components/navbar";
import Login from "./components/pages/login.tsx";
import Inicio from "./components/pages/inicio.tsx";
import SideBar from "./components/pages/sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner.tsx";

import TablaCirugias from "./components/pages/TablaCirugia";
import TablaAuditoria from "./components/pages/TablaAuditoria";
import TablaRadicacion from "./components/pages/TablaRadicacion";
import SistemaDeInventario from "./components/pages/SistemaDeInventario/SistemaDeInventario";
import TablaAutorizarServicios from "./components/pages/tablas-radicacion/TablaAutorizarServicios";

//*Lazy Components
const Perfil = lazy(() => import("./components/pages/perfil.tsx"));
const Usuarios = lazy(() => import("./components/pages/usuarios.tsx"));
const CookieConsent = lazy(() => import("./components/PopCookie.tsx"));
const RegistrarUsuarios = lazy(
  () => import("./components/pages/RegistrarUsuarios.tsx")
);

//*Lazy Principale Tables
const TableRoutes = lazy(() => import("./components/Routes/TablesRoutes.tsx"));
const TableInventory = lazy(
  () => import("./components/Routes/TablesInventory.tsx")
);

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
                          {/* TABLES ROUTES MAIN AND SECONDARY */}
                          <Route path="*" element={<TableRoutes />} />
                          <Route
                            path="/SistemaDeInventario/*"
                            element={<TableInventory />}
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
