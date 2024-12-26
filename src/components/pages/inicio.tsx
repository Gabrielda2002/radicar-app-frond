//*Fuctions and Hooks
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useState, lazy, Suspense } from "react";
import {AnimatePresence} from 'framer-motion'

// TODO: Importar componentes y hooks necesarios
//*Icons
import cookieX from "/assets/cookie-X.svg";
import { useFetchServicioContratado } from "../../hooks/useFetchUsers";

// const IndicadoresSalud = lazy(() => import("./HealthIndicators"));
const Calendario = lazy(() => import("./Calendario"));

const Inicio = () => {
  const [isLoading, setisLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertFadeOut, setAlertFadeOut] = useState(false);
  const [codigo, setCodigo] = useState("");

  // hook consultar servicios
  const { servicios, errorServicios, getData } =
    useFetchServicioContratado();

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
                  <h1 className="p-2 text-5xl font-bold border-black rounded-lg dark:border-color box-decoration-clone title-font dark:text-gray-200 text-color">
                    Bienvenidos a Nordvital IPS
                  </h1>
                </div>
                <p className="p-2 text-lg font-light text-gray-700 dark:text-gray-300">
                  Nuestra misión es brindar servicios de salud de alta calidad,
                  asegurando el bienestar de nuestros pacientes con tecnología
                  avanzada y un equipo humano altamente capacitado.
                </p>
              </div>
            </div>
            {/* Sección de bienvenida */}
            <div className="flex flex-col w-full pb-10 mb-10 border-2 rounded-lg shadow-md dark:border-color bg-gray-50 dark:bg-gray-700 dark:shadow-indigo-800">
              <div className="p-4">
                <h2 className="pb-6 pl-10 mt-4 text-5xl font-bold dark:text-white">
                  Consultar Servicios Contratados:
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <label htmlFor="">
                    Ingrese codigo del servicio:
                    <input
                      type="text"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      className="border-2 border-gray-300 p-2 w-full rounded-lg"
                      placeholder="Codigo del servicio"
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => getData(codigo)}
                    >
                      Consultar
                    </button>
                    {servicios?.map((servicio) => (
                      <table>
                        <thead>
                          <tr>
                            <td>Codigo</td>
                            <td>Descripcion Servicio</td>
                            <td></td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{servicio.code}</td>
                            <td>{servicio.description}</td>
                            <table>
                              <thead>
                                <tr>
                                  <td>Eps</td>
                                  <td>Sede</td>
                                  <td>Estado</td>
                                </tr>
                              </thead>
                              {servicio.Relations.map((r) => (
                                <tbody>
                                  <tr>
                                    <td>{r.nameConvenio}</td>
                                    <td>{r.nameSede}</td>
                                    <td>
                                      {r.isContrated
                                        ? "Contratado"
                                        : "No Contratado"}
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                    <AnimatePresence>
                      {
                        errorServicios && (
                          <div className="text-red-500">
                            {errorServicios}
                          </div>
                        )
                      }
                    </AnimatePresence>
                  </label>
                </div>
              </div>

              {/*
              <div className="mb-5">
                <h2 className="pb-6 pl-10 mt-4 text-5xl font-bold dark:text-white">
                  Estadísticas:
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="estado" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="cantidad" fill="#00776f" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            */}

              <div className="px-12">
                <hr className="border-gray-600 dark:border-color" />
              </div>

              <div className="mt-5">
                {/* Calendario de actividades */}
                <h1 className="pl-10 text-5xl font-bold dark:text-white">
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
