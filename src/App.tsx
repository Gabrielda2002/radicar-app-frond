import { lazy, Suspense } from "react";
//*Componentes
import Footer from "./components/layout/footer/page/Footer.tsx";
import Layout from "./components/layout/layout.tsx";
import Navbar from "./components/layout/navbar/page/NavBar.tsx";
import Login from "./featuures/auth/Page/login.tsx";
import { Route, Routes, Navigate } from "react-router-dom";
import ContextualizedRoutes from "./components/Routes/ContextualizedRoutes.tsx";
const CookieConsent = lazy(
  () => import("./components/common/CookieConsent/PopCookie.tsx")
);

//*Contextos
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authContext";
import { useTheme } from "./context/blackWhiteContext";
import { Bounce, ToastContainer } from "react-toastify";
import { SidebarProvider } from "./context/sidebarContext";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { UserProfileProvider } from "./context/userProfileContext";
import { NotificationProvider } from "@/context/notificationContext.tsx";

import SideBar from "./components/layout/sidebar/page/SideBar.tsx";

const TurnoRequestPage = lazy(() => import("@/featuures/Turnos/Pages/TurnoRequestPage"));
const TurnoTicketPage = lazy(() => import("@/featuures/Turnos/Pages/TurnoTicketPage"));
const TurnoTvPage = lazy(() => import("@/featuures/Turnos/Pages/TurnoTvPage"));

function AppRoutes() {
  return (
    <div>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/turnos/sede/:slug" element={<Suspense fallback={<p role="status" className="p-8 text-center">Cargando solicitud de turno…</p>}><TurnoRequestPage /></Suspense>} />
        <Route path="/turnos/ticket/:token" element={<Suspense fallback={<p role="status" className="p-8 text-center">Cargando ticket…</p>}><TurnoTicketPage /></Suspense>} />
        <Route path="/turnos/tv/:slug" element={<Suspense fallback={<p role="status" className="p-8 text-center text-white bg-slate-900 min-h-screen">Cargando pantalla de turnos…</p>}><TurnoTvPage /></Suspense>} />
        {/* Rutas protegidas */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/*"
            element={
              <div className="flex h-dvh flex-col overflow-hidden">
                <Navbar />
                <div className="grid min-h-0 flex-1 grid-cols-[auto_1fr]">
                  <SideBar />
                  <main className="min-h-0 min-w-0 overflow-y-auto bg-slate-200 dark:bg-gray-900">
                    <Layout>
                      <ContextualizedRoutes />
                    </Layout>
                    <Footer />
                  </main>
                </div>
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
          </NotificationProvider>
        </UserProfileProvider>
      </AuthProvider>
    </div>
  );
}

