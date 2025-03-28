
import { lazy } from "react";
//*Componentes
import Footer from "./components/layout/footer/page/Footer.tsx";
import Layout from "./components/layout/layout.tsx";
import Navbar from "./components/layout/navbar/page/NavBar.tsx";
import Login from "./featuures/auth/Page/login.tsx";
import SideBar from "./components/layout/sidebar/page/SideBar.tsx";
import { Route, Routes, Navigate } from "react-router-dom";
import ContextualizedRoutes from "./components/Routes/ContextualizedRoutes.tsx";
const CookieConsent = lazy(() => import("./components/common/CookieConsent/PopCookie.tsx"));


//*Contextos
import "react-toastify/dist/ReactToastify.css"; 
import { AuthProvider } from "./context/authContext";
import { useTheme } from "./context/blackWhiteContext";
import { Bounce, ToastContainer } from "react-toastify";
import { SidebarProvider } from "./context/sidebarContext";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { UserProfileProvider } from "./context/userProfileContext";
import {NotificationProvider} from "@/context/notificationContext.tsx";
import { TicketProvider } from "./context/ticketContext.tsx";

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
                      <ContextualizedRoutes />
                      {/* <Suspense
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
                          {/* <Route path="*" element={<TableRoutes />} />
                          <Route
                            path="/SistemaInventario"
                            element={<SistemaInventario />}
                          />
                          <Route path="*" element={<Navigate to="/home" />} />
                          <Route
                            path="/RegistroUsuarios"
                            element={<RegistroUsuarios />}
                          />
                          <Route
                            path="/GestionTickets"
                            element={<GestionTickets />}
                          />
                        </Routes>
                      </Suspense> */} 
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
          <NotificationProvider>
          <TicketProvider>
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
          </TicketProvider>
          </NotificationProvider>
        </UserProfileProvider>
      </AuthProvider>
    </div>
  );
}
