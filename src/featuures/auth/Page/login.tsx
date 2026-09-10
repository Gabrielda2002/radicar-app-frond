import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  ClipboardCheck,
  Hash,
  Hospital,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import { useAuth } from "@/context/authContext";
import { api } from "@/utils/api-config";

const loginSpheres = [
  { id: "top-left", top: "12%", left: "18%", size: 86, duration: 9, delay: 0, opacity: 0.78 },
  { id: "bottom-left", top: "68%", left: "8%", size: 52, duration: 7, delay: 0.6, opacity: 0.7 },
  { id: "top-right", top: "22%", left: "82%", size: 68, duration: 11, delay: 1.2, opacity: 0.74 },
  { id: "bottom-right", top: "78%", left: "72%", size: 96, duration: 13, delay: 0.3, opacity: 0.64 },
  { id: "center", top: "45%", left: "48%", size: 34, duration: 6, delay: 0.9, opacity: 0.78 },
  { id: "top-center", top: "8%", left: "55%", size: 44, duration: 8, delay: 1.6, opacity: 0.7 },
];

const FloatingSpheres: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
    {loginSpheres.map((sphere) => (
      <span
        key={sphere.id}
        className="login-sphere"
        style={{
          top: sphere.top,
          left: sphere.left,
          width: sphere.size,
          height: sphere.size,
          opacity: sphere.opacity,
          animationDuration: `${sphere.duration}s`,
          animationDelay: `${sphere.delay}s`,
        }}
      />
    ))}
  </div>
);

const Login: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [dniNumber, setDniNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/login", { dniNumber, password });
      const { accessToken, rol, user, Municipio, message } = response.data;

      login(accessToken, rol, Municipio, user);

      if (rememberUser) {
        localStorage.setItem("rememberedUser", dniNumber);
      } else {
        localStorage.removeItem("rememberedUser");
      }

      toast.success(message || "¡Bienvenido! Has iniciado sesión correctamente.", {
        position: "top-center",
        autoClose: 3000,
      });

      const redirectPath = sessionStorage.getItem("redirectPath");
      if (redirectPath) {
        sessionStorage.removeItem("redirectPath");
        navigate(redirectPath);
      } else {
        navigate("/home");
      }
    } catch (error: unknown) {
      console.error("Error en login:", error);
      const apiError = error as {
        response?: {
          status?: number;
          data?: { message?: string };
        };
      };

      if (apiError.response?.status === 401) {
        const errorMessage = apiError.response.data?.message || "Credenciales incorrectas";
        setError(errorMessage);
        toast.error(errorMessage, { position: "top-center", autoClose: 5000 });
      } else if ((apiError.response?.status || 0) >= 500) {
        const serverError = "Error del servidor. Inténtalo más tarde.";
        setError(serverError);
        toast.error(serverError, { position: "top-center", autoClose: 5000 });
      } else {
        const genericError = "Error al iniciar sesión. Verifica tu conexión e inténtalo nuevamente.";
        setError(genericError);
        toast.error(genericError, { position: "top-center", autoClose: 5000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ? mentener el check de recordar usuario si el usuario ya lo había seleccionado previamente
  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      setDniNumber(rememberedUser);
      setRememberUser(true);
    }
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-sans text-gray-900 dark:bg-gray-900 dark:text-gray-200">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* left panel */}
        <section className="z-10 flex min-h-screen w-full flex-col justify-between bg-white px-6 py-8 shadow-xl sm:px-12 md:px-16 lg:w-[48%] lg:px-12 lg:py-12 lg:shadow-none xl:w-[45%] xl:px-20 dark:bg-gray-800">
          <div className="mb-8">
            <motion.div
              className="mb-6 flex items-center gap-3.5"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-color text-white shadow-lg shadow-color/30 ring-4 ring-color/10 transition-transform duration-300 hover:scale-105 dark:ring-gray-700">
                <Hospital className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold leading-none tracking-tight text-gray-900 dark:text-gray-200">
                  Nordvital <span className="text-color dark:text-color2">IPS</span>
                </span>
                <span className="hidden rounded-full border border-color/20 bg-color/10 px-1.5 py-1 text-[12px] tracking-wider text-color sm:inline-block dark:border-color2/30 dark:bg-color2/20 dark:text-color2">
                  Generamos confianza para tu salud
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.1 }}
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200">
                Bienvenido de nuevo
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
                Accede al portal institucional para el personal asistencial y administrativo de Nordvital IPS.
              </p>
            </motion.div>
          </div>

          <div className="my-auto py-2">
            <motion.form
              className="space-y-5"
              onSubmit={handleSubmit}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.18 }}
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    role="alert"
                    aria-live="polite"
                    className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-900/30 dark:text-red-300"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <Input
                id="number-document"
                label="Número de Documento"
                type="text"
                name="dniNumber"
                value={dniNumber}
                onChange={(event) => setDniNumber(event.target.value)}
                placeholder="Ingresa tu documento"
                icon={<Hash className="w-4 h-4" aria-hidden="true" />}
                required
                disabled={isLoading}
                autoComplete="username"
              />

              <Input
                id="password-login"
                label="Contraseña"
                variant="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Ingresa tu contraseña"
                icon={<LockKeyhole className="w-4 h-4" aria-hidden="true" />}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />

              <Input
                type="checkbox"
                variant="checkbox"
                label="Recordar usuario"
                checked={rememberUser}
                onChange={(event) => setRememberUser(event.target.checked)}
                disabled={isLoading}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={!dniNumber || !password}
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                iconPosition="right"
              >
                Iniciar Sesión
              </Button>

              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <p className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-center text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  Si no tiene una cuenta, solicítela en Sistemas.
                </p>
              </div>
            </motion.form>
          </div>

          <footer className="mt-6 border-t border-gray-200 pt-3 text-center text-xs leading-relaxed text-gray-500 dark:border-gray-700 dark:text-gray-400">
            © 2026 Nordvital IPS - Todos los derechos reservados. Desarrollado y administrado por el Área de Sistemas de Nordvital IPS
          </footer>
        </section>

        {/* right panel */}
        <section
          aria-hidden="true"
          className="login-animated-gradient-bg relative hidden w-full flex-col justify-between overflow-hidden p-8 text-white lg:flex sm:p-12 xl:w-[55%] xl:p-16"
        >
          <div className="login-tide-layer z-0" />
          <FloatingSpheres />
          <div className="login-light-sweep z-0" />
          <div className="login-floating-glow-1 absolute -right-24 -top-24 z-0 h-96 w-96 rounded-full bg-[#8bf3f9]/45 blur-3xl" />
          <div className="login-floating-glow-2 absolute -bottom-32 -left-32 z-0 h-96 w-96 rounded-full bg-[#5ee8c8]/35 blur-3xl" />

          <motion.div
            className="relative z-10 flex items-center justify-between gap-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />
              SOMOS NORDVITAL IPS
            </span>
          </motion.div>

          <motion.div
            className="relative z-10 my-auto max-w-2xl py-8"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.1 }}
          >
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl xl:text-5xl">
              Un solo sistema para administrar tu{" "}
              <span className="login-animated-wave-underline text-[#8bf3f9]">
                operación administrativa y de control
              </span>.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-[#e6f8f9]/90 sm:text-base">
              El sistema de Nordvital IPS centraliza la gestión operativa, trámites de usuarios, auditorías de servicios y control de inventarios en un solo entorno seguro y eficiente.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, title: "Gestión de Calidad", text: "Control documental, medición de indicadores de gestión y garantía de cumplimiento de la normatividad vigente del sector salud." },
                { icon: Boxes, title: "Gestión de Inventarios", text: "Monitoreo en tiempo real de activos fijos. Trazabilidad completa por sede." },
                { icon: ClipboardCheck, title: "Gestión Operativa", text: "PQRSDF, Tutelas y Auditoría de Servicios." },
              ].map(({ icon: Icon, title, text }, index) => (
                <motion.div
                  className="login-spotlight-card group select-none rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                  key={title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: 0.2 + index * 0.08 }
                  }
                >
                  <div className="relative mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#8bf3f9]/30 bg-[#8bf3f9]/20 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#8bf3f9]/40">
                    <span className="login-icon-ping" />
                    <Icon className="login-icon-float relative h-5 w-5 text-[#8bf3f9] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-white">{title}</h3>
                  <p className="text-sm leading-snug text-[#e6f8f9]/90">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default Login;
