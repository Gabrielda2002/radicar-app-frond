//*Funciones y Hooks
import { useState, lazy, Suspense, useCallback } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import { CupsRadicadosRelation, IRadicados } from "../../models/IRadicados.ts";
import { useFetchDocumentoRadicado } from "../../hooks/useFetchUsers";

//? Using lazy load functions for modals
const ModalGestionAuxiliar = lazy(
  () => import("./modals/ModalGestionAuxiliar.tsx")
);
const ModalMostrarDatos = lazy(
  () => import("./modals/ModalDatosRadicacion.tsx")
);
const ModalRadicacion = lazy(() => import("./modals/ModalRadicacion.tsx"));

//*Props
import ModalSection from "../ModalSection.tsx";

//*Iconos
import gestion from "/assets/gestion.svg";
import mostrar from "/assets/mostrar.svg";
import soporte from "/assets/soporte.svg";

// const ITEMS_PER_PAGE = 8;

const TablaRadicacion = () => {

  // estado para el numero de documento del paciente
  const [documento, setDocumento] = useState<string>("");

  // hook para buscar radicado por numero documento paciente
  const { radicados, loading, errorRadicados, getData } = useFetchDocumentoRadicado();

  // estado para controlar la apertura del modal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGestionAuxiliar, setIsOpenGestionAuxiliar] = useState(false);
  const [selectedRadicacion, setSelectedRadicacion] =
    useState<CupsRadicadosRelation | IRadicados | null>(null);

  const handleShowData = useCallback((radicacion: IRadicados) => {
    setSelectedRadicacion(radicacion);
    setIsOpen(true);
  }, []);

  const handleShowGestionAuxiliar = useCallback((radicacion: CupsRadicadosRelation) => {
    setSelectedRadicacion(radicacion);
    setIsOpenGestionAuxiliar(true);
  }, []);

  const handleOpenSoporte = useCallback((nombreSoporte: string | null) => {
    if (!nombreSoporte) {
      alert("No hay soporte para mostrar.");
      return;
    }

    window.open(
      `https://api.nordvitalips.com/api/v1/uploads/Soportes/${nombreSoporte}`,
      "_blank"
    );
    return;
  }, []);

  //PRUEBA
  // Estado para mostrar el alerta de cookies
  const [showCookieAlert, setShowCookieAlert] = useState(false);
  const [cookieDescription, setCookieDescription] = useState("");

  // Función para abrir la alerta de cookies
  const handleShowCookieAlert = useCallback((description: string) => {
    setCookieDescription(description);
    setShowCookieAlert(true);
  }, []);

  // Función para cerrar la alerta de cookies
  const handleCloseCookieAlert = () => {
    setShowCookieAlert(false);
  };

  if (loading) return <LoadingSpinner duration={100000} />;

  // * funcion para formatear la fecha
  const formatDate = (date: Date | null) => {
    return date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
  };

  return (
    <>
      <ModalSection
        title="Módulo Radicación"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Radicación", path: "" },
        ]}
      />

      <section className="p-5 mb-8 bg-white rounded-md shadow-lg dark:bg-gray-800 container-tabla shadow-indigo-500/40">
        {/* header-table */}
        <section className="flex items-end justify-between w-full mb-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar radicado :
            </label>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)} // Escuchar eventos de teclado
              placeholder="Documento Paciente"
              className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            /> 
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
              onClick={() => getData(documento)}
            >
              Buscar
            </button>
            {errorRadicados && (
              <h2 className="text-center text-red-500 dark:text-red-400">
                {errorRadicados}
              </h2>
            )}
          </div>
          

          <div className="flex items-center space-x-4">
            <Suspense fallback={<LoadingSpinner />}>
              <ModalRadicacion />
            </Suspense>
          </div>
        </section>

        {radicados && radicados?.length > 0 && (
          <>
            {/* Contenedor para la tabla con overflow-x-auto */}
            <div className="overflow-x-auto">
              <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr className="shadow-md dark:text-gray-300 rounded-t-md">
                    <th>Fecha - Hora</th>
                    <th>N.º Radicado</th>
                    <th>Documento</th>
                    <th>Convenio</th>
                    <th>N.º Documento</th>
                    <th>Paciente</th>
                    <th>Fecha Auditoría</th>
                    <th>Gestión del servicio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {radicados?.map((radicacion) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={radicacion.id}
                    >
                      <td className="border-b dark:border-gray-700">
                        {formatDate(radicacion.createdAt)}
                      </td>
                      <td className="border-b dark:border-gray-700">
                        {radicacion.id}
                      </td>
                      <td className="border-b dark:border-gray-700">
                        {radicacion.patientRelation.documentNumber}
                      </td>
                      <td className="border-b dark:border-gray-700">
                        {radicacion.patientRelation.convenioRelation.name}
                      </td>
                      <td className="border-b dark:border-gray-700">
                        {radicacion.patientRelation.documentRelation.name}
                      </td>
                      <td className="border-b dark:border-gray-700">
                        {radicacion.patientRelation.name}
                      </td>
                      <td className="border-b dark:border-gray-700">
                        {formatDate(radicacion.auditDate)}
                      </td>
                      <td className="border-b dark:border-gray-700">
                        <div className="">
                          {radicacion.cupsRadicadosRelation.length > 0 ? (
                            <div
                              className={` ${
                                radicacion.cupsRadicadosRelation.length > 0
                                  ? "max-h-[200px] overflow-y-auto"
                                  : ""
                              }`}
                            >
                              <table className="w-full text-left bg-gray-100 border border-separate rounded-md dark:bg-gray-800 dark:border-gray-900">
                                <thead className="text-sm font-medium text-center text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                                  <tr>
                                    <th className="border-b dark:border-gray-700">
                                      CUPS
                                    </th>
                                    <th className="border-b dark:border-gray-700">
                                      Descripción
                                    </th>
                                    <th className="border-b dark:border-gray-700">
                                      Auditoría
                                    </th>
                                    <th className="border-b dark:border-gray-700">
                                      Gestión
                                    </th>
                                    <th className="border-b dark:border-gray-700">
                                      Auxiliar
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {radicacion.cupsRadicadosRelation.map(
                                    (cup, index) => (
                                      <tr
                                        key={cup.id}
                                        className={`transition text-center duration-200 ease-in-out ${
                                          index % 2 === 0
                                            ? "bg-gray-50 dark:bg-gray-700"
                                            : "bg-gray-200 dark:bg-gray-700"
                                        } hover:bg-gray-300 dark:hover:bg-gray-500`}
                                      >
                                        <td className="border-b dark:border-gray-700">
                                          {cup.code}
                                        </td>
                                        <td className="border-b dark:border-gray-700">
                                          <span
                                            className="block max-w-[290px] max-h-[] truncate cursor-pointer"
                                            title={cup.DescriptionCode}
                                            onClick={() =>
                                              handleShowCookieAlert(
                                                cup.DescriptionCode
                                              )
                                            }
                                          >
                                            {cup.DescriptionCode}
                                          </span>
                                        </td>
                                        <td
                                          className="border-b dark:border-gray-700"
                                          style={{
                                            backgroundColor:
                                              cup.statusRelation.name ===
                                              "AUTORIZADO"
                                                ? "rgba(34, 197, 94, 0.2)" // Verde suave
                                                : "transparent",
                                          }}
                                        >
                                          {cup.statusRelation.name}
                                        </td>
                                        <td
                                          className="border-b dark:border-gray-700"
                                          style={{
                                            backgroundColor:
                                              cup.seguimientoAuxiliarRelation
                                                .length > 0 &&
                                              cup.seguimientoAuxiliarRelation[0]
                                                .estadoSeguimientoRelation
                                                .name === "Asignado"
                                                ? "rgba(34, 197, 94, 0.2)" // Verde suave
                                                : "transparent",
                                          }}
                                        >
                                          {cup.seguimientoAuxiliarRelation
                                            .length > 0 &&
                                          cup.seguimientoAuxiliarRelation[0]
                                            .estadoSeguimientoRelation.name
                                        : "N/A"}
                                    </td>
                                      <button
                                        onClick={() =>
                                        }
                                      >
                                        <img
                                          className="w-8 h-8 dark:invert"
                                          src={gestion}
                                          alt=""
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                                    <td className="p-3 border-b dark:border-gray-700">
                                          handleShowGestionAuxiliar(cup)
                      </td>

                      <td className="border-b dark:border-gray-700">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                          <button
                            title="Ver Soporte"
                            onClick={() =>
                              radicacion.soportesRelation &&
                              handleOpenSoporte(
                                radicacion.soportesRelation.nameSaved
                              )
                            }
                            className="p-1 duration-300 rounded-md dark:bg-gray-900 dark:hover:bg-gray-600"
                          >
                            <img
                              className="dark:invert"
                              src={soporte}
                              alt="Soporte"
                            />
                          </button>
                          <button
                            title="Ver Radicación"
                            onClick={() => handleShowData(radicacion)}
                            className="p-1 duration-300 rounded-md dark:bg-gray-900 dark:hover:bg-gray-600"
                          >
                            <img
                              className="dark:invert"
                              src={mostrar}
                              alt="Radicación"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {showCookieAlert && (
                    <motion.div
                      className="fixed flex items-center justify-center transition-opacity bg-black -inset-5 bg-opacity-10 backdrop-blur-sm"
                      initial={{ opacity: 0, y: -20 }} // Mover hacia arriba
                      animate={{ opacity: 1, y: 0 }} // Vuelve a su posición original
                      exit={{ opacity: 0, y: 20 }} // Mover hacia abajo al salir
                      transition={{ duration: 0.1 }} // Duración de la animación
                    >
                      <div className="fixed flex items-center justify-center transition-opacity bg-black bg-opacity-50 -inset-5 backdrop-blur-sm">
                        {" "}
                        {/* bg-opacity reducido a 30 */}
                        <div className="p-6 bg-white rounded-md dark:bg-gray-700">
                          <div className="flex justify-between pb-4 border-b">
                            <h2 className="text-2xl font-bold text-left text-color dark:text-white">
                              Descripción Completa:
                            </h2>
                            <button
                              onClick={handleCloseCookieAlert}
                              className="flex items-center justify-center text-xl duration-200 rounded-md w-7 h-7 hover:bg-gray-400 hover:text-black dark:hover:bg-gray-300"
                            >
                              &times;
                            </button>
                          </div>
                          <p className="mt-4 mb-4 text-sm text-justify text-gray-700 dark:text-gray-100">
                            {cookieDescription}
                          </p>
                          <div className="flex justify-end border-t">
                            <button
                              onClick={handleCloseCookieAlert}
                              className="w-20 h-12 mt-4 text-white duration-200 rounded-md bg-color dark:hover:bg-teal-600 hover:bg-teal-600"
                            >
                              <span className="text-base">Cerrar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </tbody>
              </table>
            </div>

            {/* modal mostrar datos */}

            <Suspense fallback={<LoadingSpinner />}>
              <ModalMostrarDatos
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                radicacion={selectedRadicacion as IRadicados | null} // Se asegura que sea IRadicados
              />

              <ModalGestionAuxiliar
                isOpen={isOpenGestionAuxiliar}
                onClose={() => setIsOpenGestionAuxiliar(false)}
                radicacion={selectedRadicacion as CupsRadicadosRelation | null} // Se asegura que sea CupsRadicadosRelation
                cirugias={null}
              />
            </Suspense>

            {/* Controles de la Paginacion */}
            {/* <div>‎ </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            /> */}
          </>
        )}
      </section>
    </>
  );
};
export default TablaRadicacion;
