//*Componentes
import { lazy, Suspense } from "react";
import Footer from "./components/layout/footer/page/Footer.tsx";
import Layout from "./components/layout/layout.tsx";
import Navbar from "./components/layout/navbar/page/NavBar.tsx";
import Login from "./featuures/auth/Page/login.tsx";
import SideBar from "./components/layout/sidebar/page/SideBar.tsx";
import { Route, Routes, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner/LoadingSpinner.tsx";

//*Lazy Components
const Inicio = lazy(() => import("./featuures/home/page/Inicio.tsx"));
const Perfil = lazy(() => import("./featuures/profile/page/PerfilPage.tsx"));
const Usuarios = lazy(() => import("./featuures/Usuarios/Pages/TableUsers.tsx"));
const CookieConsent = lazy(() => import("./components/common/CookieConsent/PopCookie.tsx"));
const RegistrarUsuarios = lazy(
  () => import("./featuures/RegisterUser/Page/RegisterUser.tsx")
);

//*Lazy Principale Tables
const TableRoutes = lazy(() => import("./components/Routes/TablesRoutes.tsx"));
const TablaCirugias = lazy(() => import("./featuures/Cirugia/Pages/TablaCirugia.tsx"));

const TablaAuditoria = lazy(
  () => import("./featuures/Auditoria/Pages/TablaAuditoria.tsx")
);

const TablaRadicacion = lazy(
  () => import("./featuures/Radicacion/Page/TablaRadicacion.tsx")
);

const TablaAutorizarServicios = lazy(
  () =>
    import("./featuures/AuthorizeService/Pages/TablaAutorizarServicios.tsx")
);

const FileManager = lazy(
  () => import("./featuures/SystemGC/Page/SistemaArchivosSGC.tsx")
);

const SistemaInventario = lazy(
  () => import("./featuures/SystemInventory/Pages/InventorySystem.tsx")
);
const GestionTickets = lazy(
  () => import("./featuures/HelpDesk/Pages/ProcessHelpDesk.tsx")
);

//*Contextos
import "react-toastify/dist/ReactToastify.css"; 
import { AuthProvider } from "./context/authContext";
import { useTheme } from "./context/blackWhiteContext";
import { Bounce, ToastContainer } from "react-toastify";
import { SidebarProvider } from "./context/sidebarContext";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { UserProfileProvider } from "./context/userProfileContext";
import RecoverLetterPage from "./featuures/RecoverLetter/Pages/RecoverLetterPage.tsx";
import RecoverLastPage from "./featuures/AuditRecoveryLetter/Pages/AuditRecoveryLetterPage.tsx";

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
                            path="/carta-recobro"
                            element={<RecoverLetterPage />}
                          />
                          <Route
                            path="/auditoria"
                            element={<RecoverLastPage />}
                          />
                          {/* rutas de las tablas radicacion */}
                          <Route path="*" element={<TableRoutes />} />
                          <Route
                            path="/SistemaInventario"
                            element={<SistemaInventario />}
                          />
                          <Route path="*" element={<Navigate to="/home" />} />
                          <Route
                            path="/GestionTickets"
                            element={<GestionTickets />}
                          />
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
