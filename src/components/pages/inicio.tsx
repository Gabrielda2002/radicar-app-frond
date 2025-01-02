//*Fuctions and Hooks
import LoadingSpinner from "../LoadingSpinner";
import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";

//*Icons
import cookieX from "/assets/cookie-X.svg";
import { useFetchServicioContratado } from "@/hooks/useFetchUsers";

// const IndicadoresSalud = lazy(() => import("./HealthIndicators"));
const Calendario = lazy(() => import("./Calendario"));

const Inicio = () => {
  const [isLoading, setisLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertFadeOut, setAlertFadeOut] = useState(false);
  const [codigo, setCodigo] = useState("");

  // hook consultar servicios
  const { servicios, errorServicios, getData } = useFetchServicioContratado();

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
              <div className="p-6">
                <h2 className="pb-2 pl-2 mt-2 text-5xl font-bold dark:text-white">
                  Consultar Servicios Contratados:
                </h2>
                <div className="p-2 m-5 rounded-lg ">
                  <label
                    htmlFor=""
                    className="w-5/6 dark:text-gray-200 text-[24px]"
                  >
                    Ingrese el código del servicio:
                    <div>
                      <input
                        type="text"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        className="p-2 mt-3 mr-4 border-2 border-gray-400 rounded-lg b-2 w-60 dark:text-gray-700 text-[17px]"
                        placeholder="Código del servicio"
                      />
                      <button
                        className="px-5 font-bold text-white bg-teal-500 rounded-md shadow-md mt-23 py-2 hover:bg-teal-600 hover:shadow-teal-600 dark:hover:shadow-teal-500 text-[16px]"
                        onClick={() => getData(codigo)}
                      >
                        Consultar
                      </button>
                    </div>
                  </label>
                  <div className="flex flex-col w-full mt-4 justify-items-center dark:text-gray-200">
                    {servicios?.map((servicio) => (
                      <div
                        key={servicio.code}
                        className="overflow-x-auto border rounded-lg"
                      >
                        <table className="w-full table-auto">
                          <thead>
                            <tr className="text-gray-700 bg-gray-400 dark:bg-gray-800 dark:text-gray-200">
                              <th className="px-2 py-3 text-center whitespace-nowrap">
                                Código
                              </th>
                              <th className="px-2 py-3 text-center">
                                Descripción Servicio
                              </th>
                              <th className="px-2 py-3 text-center"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-200 border-teal-700 dark:bg-gray-700">
                              <td className="px-6 py-3 font-medium text-center">
                                {servicio.code}
                              </td>
                              <td className="px-1 py-3 text-sm text-center">
                                {servicio.description}
                              </td>
                              {servicio.Relations.length > 0 ? (
                                <td colSpan={3} className="px-2 py-3">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="text-gray-700 bg-gray-400 dark:bg-gray-800 dark:text-gray-200">
                                        <th className="px-3 py-3 text-center whitespace-nowrap">
                                          Sede
                                        </th>
                                        <th className="py-3 text-center px-14 whitespace-nowrap">
                                          Eps
                                        </th>
                                        <th className="px-6 py-3 text-center whitespace-nowrap">
                                          Estado
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {servicio.Relations.map((r, index) => (
                                        <tr
                                          key={`${r.nameConvenio}-${r.nameSede}-${index}`}
                                          className="border-b border-gray-400 dark:border-gray-400"
                                        >
                                          <td className="px-2 py-2 text-center whitespace-nowrap">
                                            {r.nameConvenio || "N/A"}
                                          </td>
                                          <td className="px-2 py-2 text-center whitespace-nowrap">
                                            {r.nameSede || "N/A"}
                                          </td>
                                          <td className="px-2 py-2 text-center">
                                            <span
                                              className={`inline-flex rounded-full px-3
                                               py-1 text-xs font-semibold ${
                                                 r.isContrated
                                                   ? "bg-teal-500 text-gray-800 dark:bg-teal-600 dark:text-white"
                                                   : "bg-red-500 text-gray-800 dark:bg-red-600 dark:text-white"
                                               }`}
                                            >
                                              {r.isContrated
                                                ? "Contratado"
                                                : "No Contratado"}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </td>
                              ) : (
                                <td className="px-2 py-3 text-center">N/A</td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {errorServicios && (
                      <div className="text-red-500">{errorServicios}</div>
                    )}
                  </AnimatePresence>
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
