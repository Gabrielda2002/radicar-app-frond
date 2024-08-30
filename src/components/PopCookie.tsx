import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import cookie from "/assets/cookie.svg";

const CookieConsent: React.FC = () => {
  const [consent, setConsent] = useState<boolean>(() => {
    return Cookies.get("cookieConsent") === "true";
  });

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 30 }); // Cookie expira en 30 días
    setConsent(true);
  };

  useEffect(() => {
    if (!consent) {
      // Bloquea la interacción con el contenido
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [consent]);

  if (consent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 text-center bg-white rounded-md shadow-md">
        <img src={cookie} alt="cookie" className="w-10 h-10 animate-spin" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Alerta de Cookies
        </h2>
        <p>
          Este sitio utiliza cookies para mejorar la experiencia del usuario.
          <p className="font-semibold">Atte: Vital TECH 🔬💊</p>
        </p>
        <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
          <button
            onClick={handleAccept}
            className="px-4 py-2 mt-4 text-white transition duration-100 ease-in-out bg-blue-500 rounded delay-250 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
          >
            Aceptar
          </button>
          <p className="mt-4 text-sm">
            <a
              href="/politicas-cookies.html"
              className="text-sm text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-color focus:outline-none"
            >
              Leer políticas de cookies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
