//*Fuctions and Hooks
import LoadingSpinner from "../../../components/common/LoadingSpinner/LoadingSpinner";
import { useEffect, useState, lazy, Suspense } from "react";

//*Icons
import cookieX from "/assets/cookie-X.svg";
import FormPacientesCS from "../components/ConsultarPacientesCS";
import ConsultarSvContratados from "../components/ConsultarSvContratados";

// const IndicadoresSalud = lazy(() => import("./HealthIndicators"));
const Calendario = lazy(() => import("../components/Calendario"));

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
            {/* Contenido */}
            <div className="p-4 mb-8 border-2 rounded-lg shadow-md dark:shadow-indigo-800 bg-gray-50 dark:bg-gray-700 dark:border-color">
              <div>
                <div>
                  <h1 className="p-2 text-2xl font-bold border-black rounded-lg md:text-[42px] dark:border-color box-decoration-clone title-font dark:text-gray-200 text-color">
                    Bienvenidos a Nordvital IPS
                  </h1>
                </div>
                <p className="p-2 font-light text-gray-700 text-md md:text-lg dark:text-gray-300">
                  Nuestra misión es brindar servicios de salud de alta calidad,
                  asegurando el bienestar de nuestros pacientes con tecnología
                  avanzada y un equipo humano altamente capacitado.
                </p>
              </div>
            </div>
            {/* Sección de bienvenida */}
            <div className="flex flex-col w-full pb-10 mb-10 border-2 rounded-lg shadow-md dark:border-color bg-gray-50 dark:bg-gray-700 dark:shadow-indigo-800">
              <div>
                <ConsultarSvContratados/>
              </div>

              {/* consultar pacientes coosalud */}
              <div className="mt-5">
                <FormPacientesCS />
              </div>

              <div className="px-12">
                <hr className="border-gray-600 dark:border-color" />
              </div>

              <div className="mt-5">
                {/* Calendario de actividades */}
                <h1 className="pl-6 md:pl-10 mx-auto text-[28px] font-bold md:text-5xl dark:text-white">
                  Calendario de Actividades:
                </h1>
                <Suspense fallback={<LoadingSpinner />}>
                  <Calendario />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Alerta de contraseña */}
          {showAlert && (
            <section
              className={`absolute z-50 flex items-center justify-between max-w-4xl p-4 mx-auto border border-gray-200 shadow-md bg-amber-500 dark:bg-gray-900 left-12 bottom-16 dark:shadow-gray-900 shadow-gray-100 md:gap-x-4 dark:border-gray-700 rounded-2xl transition-opacity duration-300 ${
                alertFadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              <p className="text-sm text-gray-50 dark:text-gray-300">
                Recuerde actualizar su contraseña cada 3 meses para mantener la
                seguridad de su cuenta.
              </p>
              <button
                className="flex items-center justify-center text-gray-700 transition-colors duration-300 rounded-full shrink-0 dark:text-gray-200 dark:hover:bg-red-500 w-7 h-7 focus:outline-none hover:bg-gray-100"
                onClick={handleCloseAlert}
              >
                <img src={cookieX} alt="" className="w-5 h-5 dark:invert" />
              </button>
            </section>
          )}
        </section>
      )}
    </>
  );
};

export default Inicio;
