//*Fuctions and Hooks
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useState, lazy, Suspense } from "react";

// TODO: Importar componentes y hooks necesarios
//*Icons
import cookieX from "/assets/cookie-X.svg";

// const IndicadoresSalud = lazy(() => import("./HealthIndicators"));
const Calendario = lazy(() => import("./Calendario"));

const Inicio = () => {
  const [isLoading, setisLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertFadeOut, setAlertFadeOut] = useState(false);

  useEffect(() => {
    const alertClosed = localStorage.getItem("alertClosed");
    if (!alertClosed) {
      setShowAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    setAlertFadeOut(true);
    setTimeout(() => {
      setShowAlert(false);
      localStorage.setItem("alertClosed", "true");
    }, 300);
  };

  const handleFinishLoading = () => {
    setisLoading(false);
    setShowContent(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner duration={200} onFinish={handleFinishLoading} />
      ) : (
        <section
          className={`text-gray-600 body-font transition-opacity duration-1000 ease-in-out ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto">
            {/* Sección de bienvenida */}
            <div className="flex flex-col items-center w-full pb-10 mb-10 text-center border-2 border-black rounded-lg dark:border-color bg-gray-50 dark:bg-gray-700">
              <h1 className="px-2 mt-10 mb-6 text-5xl font-extrabold border-2 border-black rounded-lg dark:border-color box-decoration-clone bg-gradient-to-r from-color to-color2 title-font dark:text-gray-200 text-gray-50">
                Bienvenidos a Nordvital IPS
              </h1>
              <p className="mb-8 text-lg font-medium text-gray-700 dark:text-gray-300">
                Nuestra misión es brindar servicios de salud de alta calidad,
                asegurando el bienestar de nuestros pacientes con tecnología
                avanzada y un equipo humano altamente capacitado.
              </p>

              {/* Alerta de contraseña */}
              {showAlert && (
                <section
                  className={`absolute z-50 flex items-center justify-between max-w-4xl p-4 mx-auto border border-gray-200 shadow-md bg-amber-500 dark:bg-gray-900 left-12 bottom-16 dark:shadow-gray-900 shadow-gray-100 md:gap-x-4 dark:border-gray-700 rounded-2xl transition-opacity duration-300 ${
                    alertFadeOut ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <p className="text-sm text-gray-50 dark:text-gray-300">
                    Recuerde actualizar su contraseña cada 3 meses para mantener
                    la seguridad de su cuenta.
                  </p>
                  <button
                    className="flex items-center justify-center text-gray-700 transition-colors duration-300 rounded-full shrink-0 dark:text-gray-200 dark:hover:bg-red-500 w-7 h-7 focus:outline-none hover:bg-gray-100"
                    onClick={handleCloseAlert}
                  >
                    <img src={cookieX} alt="" className="w-5 h-5 dark:invert" />
                  </button>
                </section>
              )}

              {/* Calendario de actividades */}
              <h1 className="pb-6 font-extrabold text-center text-7xl dark:text-white">
                Calendario de Actividades
              </h1>
              <Suspense fallback={<LoadingSpinner />}>
                <Calendario />
              </Suspense>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Inicio;
