//*Funciones y Hooks
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
//*Icons
import { ShieldCheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const CookieConsent: React.FC = () => {
  const [consent, setConsent] = useState<boolean>(() => {
    return Cookies.get("cookieConsent") === "true";
  });
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [isAccepting, setIsAccepting] = useState<boolean>(false);

  const handleAccept = () => {
    setIsAccepting(true);
    setTimeout(() => {
      Cookies.set("cookieConsent", "true", { expires: 30, secure: true, sameSite: "Strict" });
      setConsent(true);
    }, 300);
  };

  const handleIconClick = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    if (!consent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [consent]);

  if (consent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-300">
      {/* Tarjeta con efecto modal estilo iOS (iPhone Alert) */}
      <div className="w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 p-6 sm:p-7 flex flex-col items-center text-center transform transition-all animate-in fade-in zoom-in-90 duration-300 ease-out">
        
        {/* Contenedor del ícono interactivo */}
        <div 
          onClick={handleIconClick}
          title="Toca para más información de seguridad"
          className="w-16 h-16 mb-4 flex items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm cursor-pointer hover:bg-emerald-100 active:scale-95 transition-all duration-200 group relative"
        >
          <ShieldCheckIcon className="w-8 h-8 text-[#0d6559] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0d6559]"></span>
          </span>
        </div>

        {/* Panel informativo desplegable */}
        {showInfo && (
          <div className="w-full mb-4 p-3 bg-emerald-50/90 border border-emerald-200/60 rounded-2xl text-xs text-slate-700 animate-in fade-in slide-in-from-top-2 duration-200 text-left shadow-xs">
            <p className="font-semibold text-[#0d6559] mb-1 flex items-center gap-1">
              <InformationCircleIcon className="w-4 h-4 flex-shrink-0" /> Protección de Datos
            </p>
            Cumplimos con estrictos estándares de seguridad para garantizar que tus preferencias estén cifradas y protegidas.
          </div>
        )}

        {/* Título */}
        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
          Privacidad y Cookies
        </h2>

        {/* Descripción */}
        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
          Este sitio web utiliza cookies para optimizar tu experiencia de navegación, garantizar la seguridad y analizar el tráfico de forma anónima.
        </p>

        {/* Botones y enlaces estilo iOS */}
        <div className="w-full mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleAccept}
            disabled={isAccepting}
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0d6559] hover:bg-[#08483f] active:scale-[0.97] rounded-2xl shadow-md transition-all duration-200 cursor-pointer focus:outline-none disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isAccepting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </>
            ) : (
              "Aceptar y continuar"
            )}
          </button>

          <a
            href="/politicas-cookies.html"
            className="text-xs font-medium text-slate-400 hover:text-[#0d6559] transition-colors py-1 focus:outline-none"
          >
            Leer políticas de cookies
          </a>
        </div>

        {/* Pie corporativo interno */}
        <div className="mt-5 pt-3 border-t border-slate-100/80 w-full flex items-center justify-center">
          <span className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase">
            VITAL TECH © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;