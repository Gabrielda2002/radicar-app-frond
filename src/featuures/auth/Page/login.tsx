import React, { useEffect, useState } from "react";
import { api } from "@/utils/api-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  ClipboardCheck,
  Eye,
  EyeOff,
  Hash,
  Hospital,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Animaciones globales (wave underline, ripple del botón, glows pulsantes).
// Si prefieres, mueve este bloque a tu index.css / globals.css; se deja aquí
// para que el componente sea autocontenido y no toques otros archivos.
// ---------------------------------------------------------------------------
const AnimationStyles = () => (
  <style>{`
    @keyframes waveMove {
      0% { background-position-x: 0; }
      100% { background-position-x: 36px; }
    }
    .animated-wave-underline {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 6'%3E%3Cpath d='M0 3 Q 5 0, 10 3 T 20 3' fill='none' stroke='%238bf3f9' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: repeat-x;
      background-size: 18px 6px;
      background-position: 0 bottom;
      padding-bottom: 7px;
      animation: waveMove 1.8s linear infinite;
    }

    @keyframes pulseGlow {
      0%, 100% { opacity: 0.25; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.25); }
    }
    .floating-glow-1 { animation: pulseGlow 6s ease-in-out infinite alternate; }
    .floating-glow-2 { animation: pulseGlow 8s ease-in-out 1.5s infinite alternate; }

    @keyframes gradientDrift {
      0%   { background-position: 0% 20%; }
      50%  { background-position: 100% 80%; }
      100% { background-position: 0% 20%; }
    }
    .animated-gradient-bg {
      background-image: linear-gradient(135deg, #021c1a 0%, #07534d 25%, #087c73 50%, #119b89 75%, #3bc9ae 100%);
      background-size: 400% 400%;
      animation: gradientDrift 9s ease-in-out infinite;
    }

    @keyframes tideDrift {
      0%   { background-position: 100% 80%; }
      50%  { background-position: 0% 20%; }
      100% { background-position: 100% 80%; }
    }
    @keyframes tideWash {
      0%, 100% { opacity: 0; }
      50%      { opacity: 0.62; }
    }
    .tide-layer {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(135deg, #012521 0%, #075f57 35%, #13a58f 65%, #75e6ca 100%);
      background-size: 300% 300%;
      animation: tideDrift 11s ease-in-out infinite, tideWash 7s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes lightSweep {
      0%   { transform: translate(-25%, -15%) scale(1); opacity: 0.3; }
      50%  { transform: translate(25%, 20%) scale(1.35); opacity: 0.6; }
      100% { transform: translate(-25%, -15%) scale(1); opacity: 0.3; }
    }
    .light-sweep {
      position: absolute;
      inset: -25%;
      background: radial-gradient(circle at 30% 30%, rgba(139,243,249,0.42), transparent 58%);
      animation: lightSweep 9s ease-in-out infinite;
      pointer-events: none;
      mix-blend-mode: screen;
    }

    @keyframes floatSphere {
      0%   { transform: translate(0, 0) scale(1); }
      33%  { transform: translate(24px, -34px) scale(1.1); }
      66%  { transform: translate(-18px, 18px) scale(0.92); }
      100% { transform: translate(0, 0) scale(1); }
    }
    .sphere {
      position: absolute;
      border-radius: 50%;
      filter: blur(0.5px);
      background: radial-gradient(circle at 32% 30%, rgba(255,255,255,0.98), rgba(139,243,249,0.78) 42%, rgba(8,124,115,0.3) 72%, transparent 100%);
      box-shadow: 0 0 24px rgba(139,243,249,0.42), inset -5px -7px 12px rgba(2,28,26,0.18);
      animation: floatSphere ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes rippleAnimation {
      to { transform: scale(4); opacity: 0; }
    }
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.45);
      transform: scale(0);
      animation: rippleAnimation 0.6s linear;
      pointer-events: none;
    }

    .spotlight-card {
      transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease, border-color 0.3s ease;
      will-change: transform;
    }
    .spotlight-card:hover {
      border-color: rgba(139, 243, 249, 0.45);
      box-shadow: 0 16px 32px -8px rgba(0, 40, 40, 0.45), 0 0 20px rgba(114, 224, 212, 0.2);
    }

    @keyframes iconFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-4px) rotate(4deg); }
    }
    .icon-float {
      animation: iconFloat 3s ease-in-out infinite;
    }
    .spotlight-card:nth-child(2) .icon-float { animation-delay: 0.4s; }
    .spotlight-card:nth-child(3) .icon-float { animation-delay: 0.8s; }

    @keyframes iconPing {
      0% { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    .icon-ping {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: rgba(139, 243, 249, 0.5);
      opacity: 0;
    }
    .spotlight-card:hover .icon-ping {
      animation: iconPing 0.9s ease-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .animated-wave-underline,
      .floating-glow-1,
      .floating-glow-2,
      .spotlight-card,
      .animated-gradient-bg,
      .tide-layer,
      .light-sweep,
      .sphere,
      .icon-float,
      .icon-ping {
        animation: none !important;
        transition: none !important;
        transform: none !important;
      }
    }
  `}</style>
);

// Esferas translúcidas flotando lentamente por el panel derecho.
const FloatingSpheres: React.FC = () => {
  const spheres = [
    { top: "12%", left: "18%", size: 86, duration: 9, delay: 0, opacity: 0.78 },
    { top: "68%", left: "8%", size: 52, duration: 7, delay: 0.6, opacity: 0.7 },
    { top: "22%", left: "82%", size: 68, duration: 11, delay: 1.2, opacity: 0.74 },
    { top: "78%", left: "72%", size: 96, duration: 13, delay: 0.3, opacity: 0.64 },
    { top: "45%", left: "48%", size: 34, duration: 6, delay: 0.9, opacity: 0.78 },
    { top: "8%", left: "55%", size: 44, duration: 8, delay: 1.6, opacity: 0.7 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {spheres.map((s, i) => (
        <span
          key={i}
          className="sphere"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const Login: React.FC = () => {
  const [dniNumber, setDniNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      setDniNumber(rememberedUser);
      setRememberUser(true);
    }
  }, []);

  // --- Efecto ripple en el botón de submit (puramente visual, no toca la lógica de envío) ---
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add("ripple-effect");
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  // --- Tilt/spotlight 3D en las tarjetas del panel derecho ---
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -5;
    const tiltY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.22), rgba(255,255,255,0.08) 70%)`;
  };
  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    card.style.background = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        sessionStorage.removeItem('redirectPath');
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
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
      } else if ((apiError.response?.status || 0) >= 500) {
        const serverError = "Error del servidor. Inténtalo más tarde.";
        setError(serverError);
        toast.error(serverError, {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        const genericError = "Error al iniciar sesión. Verifica tu conexión e inténtalo nuevamente.";
        setError(genericError);
        toast.error(genericError, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-800">
      <AnimationStyles />
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <section className="z-10 flex min-h-screen w-full flex-col justify-between bg-white px-6 py-8 shadow-xl sm:px-12 md:px-16 lg:w-[48%] lg:px-12 lg:py-12 lg:shadow-none xl:w-[45%] xl:px-20">
          <div className="mb-8">
            <motion.div
              className="mb-6 flex items-center gap-3.5"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008d93] text-white shadow-lg shadow-[#008d93]/30 ring-4 ring-[#e6f8f9] transition-transform duration-300 hover:scale-105">
                <Hospital className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold leading-none tracking-tight text-slate-900">
                  Nordvital <span className="text-[#008d93]">IPS</span>
                </span>
                <span className="hidden rounded-full border border-[#8bf3f9] bg-[#e6f8f9] px-1.5 py-1 text-[12px] tracking-wider text-[#00666b] sm:inline-block">
                  Generamos confianza para tu salud
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Bienvenido de nuevo
              </h1>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
                Accede al portal institucional para el personal asistencial y administrativo de Nordvital IPS.
              </p>
            </motion.div>
          </div>

          <div className="my-auto py-2">
            <motion.form
              className="space-y-5"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700" htmlFor="number-document">
                  Número de Documento <span className="text-red-500">*</span>
                </label>
                <div className="relative transition duration-200 focus-within:-translate-y-0.5 focus-within:shadow-md">
                  <Hash className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-[#008d93] focus:ring-2 focus:ring-[#008d93]/20 disabled:cursor-not-allowed disabled:opacity-50"
                    id="number-document"
                    name="dniNumber"
                    placeholder="Ingresa tu documento"
                    value={dniNumber}
                    onChange={(event) => setDniNumber(event.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700" htmlFor="password-login">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <div className="relative transition duration-200 focus-within:-translate-y-0.5 focus-within:shadow-md">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-12 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-[#008d93] focus:ring-2 focus:ring-[#008d93]/20 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password-login"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-[#008d93] transition focus:ring-[#008d93]"
                    type="checkbox"
                    checked={rememberUser}
                    onChange={(event) => setRememberUser(event.target.checked)}
                  />
                  Recordar usuario
                </label>
                <button className="text-sm font-semibold text-[#008d93] transition hover:text-[#00666b] hover:underline" onClick={() => toast.info("Solicita el restablecimiento de contraseña al área de Sistemas.")} type="button">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#008d93] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#008d93]/40 transition duration-200 hover:-translate-y-0.5 hover:bg-[#00666b] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                type="submit"
                onClick={createRipple}
                disabled={isLoading || !dniNumber || !password}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                {!isLoading && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />}
              </button>

              <div className="border-t border-slate-100 pt-4">
                <p className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center text-sm text-slate-600">
                  Si no tiene una cuenta, solicítela en Sistemas.
                </p>
              </div>
            </motion.form>
          </div>

          <footer className="mt-6 border-t border-slate-100 pt-3 text-center text-xs leading-relaxed text-slate-500">
            © 2026 Nordvital IPS - Todos los derechos reservados. Desarrollado y administrado por el Área de Sistemas de Nordvital IPS
          </footer>
        </section>

        <section className="animated-gradient-bg relative hidden w-full flex-col justify-between overflow-hidden p-8 text-white lg:flex sm:p-12 xl:w-[55%] xl:p-16">
          <div className="tide-layer z-0" />
          <FloatingSpheres />
          <div className="light-sweep z-0" />
          <div className="floating-glow-1 absolute -right-24 -top-24 z-0 h-96 w-96 rounded-full bg-[#8bf3f9]/45 blur-3xl" />
          <div className="floating-glow-2 absolute -bottom-32 -left-32 z-0 h-96 w-96 rounded-full bg-[#5ee8c8]/35 blur-3xl" />

          <motion.div
            className="relative z-10 flex items-center justify-between gap-4"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide backdrop-blur-md"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> SOMOS NORDVITAL IPS</span>
          </motion.div>

          <motion.div
            className="relative z-10 my-auto max-w-2xl py-8"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl xl:text-5xl">
              Un solo sistema para administrar tu{" "}
              <span className="animated-wave-underline text-[#8bf3f9]">operación administrativa y de control</span>.
            </h2>
            <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-[#e6f8f9]/90 sm:text-base">El sistema de Nordvital IPS centraliza la gestion operativa, trámites de usuarios, auditorias de servicios y control de inventarios en un solo entorno seguro y eficiente.</p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, title: "Gestión de Calidad", text: "Control documental, medicion de indicadores de gestion y garantia de cumplimiento de la normatividad vigente del sector salud." },
                { icon: Boxes, title: "Gestion de Inventarios", text: "Monitoreo en tiempo real de activos fijos. Trazabilidad completa por sede." },
                { icon: ClipboardCheck, title: "Gestión Operativa", text: "PQRSDF, Tutelas y Auditoria de Servicios." },
              ].map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  className="spotlight-card group cursor-pointer select-none rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                  key={title}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <div className="relative mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#8bf3f9]/30 bg-[#8bf3f9]/20 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#8bf3f9]/40">
                    <span className="icon-ping" />
                    <Icon className="icon-float relative h-5 w-5 text-[#8bf3f9] transition-colors duration-300 group-hover:text-white" />
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