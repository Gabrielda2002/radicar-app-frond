//*Funciones y Hooks
import { useState, lazy, Suspense, useCallback } from "react";
import { format } from "date-fns";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner.tsx";
import ErrorMessage from "@/components/common/ErrorMessageModal/ErrorMessageModals.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { CupsRadicadosRelation, IRadicados } from "@/models/IRadicados.ts";
import { useFetchDocumentoRadicado } from "../Hooks/UseFetchDocumentRadicado.ts";

//? Using lazy load functions for modals
const ModalGestionAuxiliar = lazy(
  () => import("@/components/common/Modals/GestionAuxiliar/ModalGestionAuxiliar.tsx")
);
const ModalMostrarDatos = lazy(
  () => import("@/components/common/Modals/ShowData/ModalDatosRadicacion.tsx")
);
const ModalRadicacion = lazy(() => import("../Components/ModalRadicacion.tsx"));

//*Props
import ModalSection from "@/components/common/HeaderPage/HeaderPage.tsx";

//*Iconos
import gestion from "/assets/gestion.svg";
import mostrar from "/assets/mostrar.svg";
import soporte from "/assets/soporte.svg";

// const ITEMS_PER_PAGE = 8;

const TablaRadicacion = () => {
  // estado para el numero de documento del paciente
  const [documento, setDocumento] = useState<string>("");

  // hook para buscar radicado por numero documento paciente
  const { radicados, loading, errorRadicados, getData } =
    useFetchDocumentoRadicado();

  // estado para controlar la apertura del modal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGestionAuxiliar, setIsOpenGestionAuxiliar] = useState(false);
  const [selectedRadicacion, setSelectedRadicacion] = useState<
    CupsRadicadosRelation | IRadicados | null
  >(null);

  const handleShowData = useCallback((radicacion: IRadicados) => {
    setSelectedRadicacion(radicacion);
    setIsOpen(true);
  }, []);

  const handleShowGestionAuxiliar = useCallback(
    (radicacion: CupsRadicadosRelation) => {
      setSelectedRadicacion(radicacion);
      setIsOpenGestionAuxiliar(true);
    },
    []
  );

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
            <AnimatePresence>
              {errorRadicados && (
                <ErrorMessage className="text-center">
                  {errorRadicados}
                </ErrorMessage>
              )}
            </AnimatePresence>
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
                    <th>Soporte</th>
                    <th>Mostrar</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {radicados?.map((radicacion) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={radicacion.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {formatDate(radicacion.createdAt)}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicacion.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicacion.patientRelation.documentNumber}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicacion.patientRelation.convenioRelation.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicacion.patientRelation.documentRelation.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicacion.patientRelation.name}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {formatDate(radicacion.auditDate)}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {radicacion.cupsRadicadosRelation.length > 0 && (
                          <div className="overflow-x-auto">
                            <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
                              <thead>
                                <tr className="text-gray-800 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-200">
                                  <th>CUPS</th>
                                  <th>Descripción</th>
                                  <th>Auditoria</th>
                                  <th>Gestion</th>
                                  <th>Auxiliar</th>
                                </tr>
                              </thead>
                              <tbody>
                                {radicacion.cupsRadicadosRelation.map((cup) => (
                                  <tr
                                    key={cup.id}
                                    className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  >
                                    <td className="p-3 border-b dark:border-gray-700">
                                      {cup.code}
                                    </td>
                                    <td className="px-4 py-2 border-b dark:border-gray-700">
                                      <span
                                        className="block max-w-[200px] truncate cursor-pointer"
                                        title="Click para ver descripción completa"
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
                                      className="p-3 border-b dark:border-gray-700"
                                      style={{
                                        backgroundColor:
                                          cup.statusRelation.name &&
                                          cup.statusRelation.name ===
                                            "AUTORIZADO"
                                            ? "green"
                                            : "transparent",
                                      }}
                                    >
                                      {cup.statusRelation.name}
                                    </td>
                                    {/*  Se agrega el estado del seguimiento auxiliar  */}
                                    {/*  y dependiendo del estado se cambia el color */}
                                    <td
                                      className="p-3 border-b dark:border-gray-700"
                                      style={{
                                        backgroundColor:
                                          cup.seguimientoAuxiliarRelation
                                            .length > 0 &&
                                          cup.seguimientoAuxiliarRelation[0]
                                            .estadoSeguimientoRelation.name ===
                                            "Asignado"
                                            ? "green"
                                            : "transparent",
                                      }}
                                    >
                                      {cup.seguimientoAuxiliarRelation.length >
                                        0 &&
                                      cup.seguimientoAuxiliarRelation[0]
                                        .estadoSeguimientoRelation.name
                                        ? cup.seguimientoAuxiliarRelation[0]
                                            .estadoSeguimientoRelation.name
                                        : "N/A"}
                                    </td>
                                    <td className="p-3 border-b dark:border-gray-700">
                                      <button
                                        onClick={() =>
                                          handleShowGestionAuxiliar(cup)
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
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <button
                          onClick={() =>
                            radicacion.soportesRelation &&
                            handleOpenSoporte(
                              radicacion.soportesRelation.nameSaved
                            )
                          }
                        >
                          <img className="dark:invert" src={soporte} alt="" />
                        </button>
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <button onClick={() => handleShowData(radicacion)}>
                          <img className="dark:invert" src={mostrar} alt="" />
                        </button>
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
