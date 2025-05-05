//*Funciones y Hooks
import { useState, lazy, Suspense } from "react";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import useSearch from "@/hooks/useSearch";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import usePagination from "@/hooks/usePagination";
import { useFetchCirugias } from "../Hooks/UseFetchCirugias";
import { Cup, ICirugias, programacion } from "@/models/ICirugias";

//*iconos
import mostrar from "/assets/mostrar.svg";
import gestion from "/assets/gestion.svg";
import soporte from "/assets/soporte.svg";

import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { FormatDate } from "@/utils/FormatDate";
import { useOpenSupport } from "@/hooks/useOpenSupport";

const ModalCirugias = lazy(() => import("../Components/ModalCirugias"));
const ModalMostrarDatosCUPS = lazy(
  () => import("@/components/common/Modals/MostrarCUPS/ModalMostrarDatos")
);
const ModalGestionAuxiliar = lazy(
  () =>
    import("@/components/common/Modals/GestionAuxiliar/ModalGestionAuxiliar")
);

const ITEMS_PER_PAGE = 8;

const TablaCirugias = () => {
  // estado para abrir el modal
  const [isOpenGestion, setIsOpenGestion] = useState(false);
  const [isOpenMostrar, setIsOpenMostrar] = useState(false);
  const [selectedCirugia, setSelectedCirugia] = useState<programacion | null>(
    null
  );
  const [cupsRadicado, setCupsRadicado] = useState<Cup[] | null>(null);
  const { handleOpen } = useOpenSupport();
  const [dateOrden, setDateOrden] = useState<Date | null>(null);

  const { dataCirugias, loadingCirugias, errorCirugias } = useFetchCirugias();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const { query, setQuery, filteredData } = useSearch<ICirugias>(dataCirugias, [
    "fechaRadicado",
    "id",
    "convenio",
    "numeroDocumento",
    "nombrePaciente",
    "especialidad",
  ]);
  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, ITEMS_PER_PAGE);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value)); // Cambia el número de ítems por página
  };

  const handleShowGestion = (cirugias: programacion, cups: Cup[]) => {
    setIsOpenGestion(true);
    setSelectedCirugia(cirugias);
    setCupsRadicado(cups);
  };

  const handleShowVer = (progCirugia: programacion, orderDate: Date) => {
    setIsOpenMostrar(true);
    setSelectedCirugia(progCirugia);
    setDateOrden(orderDate);
  };

  if (loadingCirugias) return <LoadingSpinner />;
  if (errorCirugias)
    return (
      <div className="flex justify-center dark:text-white">{errorCirugias}</div>
    );

  return (
    <>
      <ModalSection
        title="Módulo Cirugia"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Cirugia", path: "" },
        ]}
      />

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        {/*header-table*/}
        <section className="flex items-end justify-between mb-4">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar Cirugía:
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="w-full h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center ml-4 space-x-4">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-24 h-10 border border-gray-300 rounded-md focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
          </div>
        </section>
        {filteredData.length === 0 ? (
          <div>
            <p className="text-center text-red-500 dark:text-red-300">
              No se encontraron resultados para la busqueda.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:flex">
              <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-200 dark:text-gray-300 dark:bg-gray-700">
                    <th>Fecha - Hora</th>
                    <th>N.º Radicado</th>
                    <th>Convenio</th>
                    <th>Documento</th>
                    <th>Paciente</th>
                    <th>Especialidad</th>
                    <th>Ultimo Estado Gestion</th>
                    <th>Soporte</th>
                    <th>Gestión Auxiliar</th>
                    <th>Mostrar</th>
                    <th>Programar</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center bg-white dark:bg-gray-800 dark:text-gray-200">
                  {currentData().map((cirugia) => (
                    <tr
                      className={`transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700
                        ${cirugia.programacionCirugia.length > 0 ? 'border-b bg-green-500/15 dark:bg-green-600/15 dark:border-gray-700' : ''}
                        `}
                      key={cirugia.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {FormatDate(cirugia.fechaRadicado) || "N/A"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cirugia.id}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cirugia.convenio}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cirugia.numeroDocumento}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cirugia.nombrePaciente}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cirugia.especialidad}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {cirugia.programacionCirugia.length > 0 &&
                        cirugia.programacionCirugia[0].gestionAuxiliarCirugia
                          .length > 0
                          ? cirugia.programacionCirugia[0].gestionAuxiliarCirugia.slice(
                              -1
                            )[0].estado
                          : "N/A"}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <button
                          onClick={() => handleOpen(cirugia.nombreSoporte)}
                        >
                          <img src={soporte} alt="soporte icon" />
                        </button>
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <button
                          onClick={() =>
                            handleShowGestion(cirugia.programacionCirugia[0], cirugia.cups)
                          }
                        >
                          <img src={gestion} alt="Gestion-icon" />
                        </button>
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <button
                          onClick={
                            () =>
                              handleShowVer(
                                cirugia.programacionCirugia[0],
                                cirugia.fechaOrden
                              ) // se pasa los datos de la cirugia programada y la fecha de orden de radicado
                          }
                        >
                          <img src={mostrar} alt="Gestion-icon" />
                        </button>
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <Suspense fallback={<LoadingSpinner />}>
                          <ModalCirugias
                            idRadicado={cirugia.id}
                            data={cirugia}
                          />
                        </Suspense>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {/* // responsive */}
        <div className="grid grid-cols-1 gap-4 mt-4 md:hidden">
          {currentData().map((cirugia) => (
            <div
              key={cirugia.id}
              className="p-3 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Fecha - Hora:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  {FormatDate(cirugia.fechaRadicado)}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  N.º Radicado:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  {cirugia.id}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Convenio:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  {cirugia.convenio}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Documento:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  {cirugia.numeroDocumento}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Paciente:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  {cirugia.nombrePaciente}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Especialidad:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  {cirugia.especialidad}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Ultimo Estado Gestion:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  {cirugia.programacionCirugia.length > 0 &&
                  cirugia.programacionCirugia[0].gestionAuxiliarCirugia.length >
                    0
                    ? cirugia.programacionCirugia[0].gestionAuxiliarCirugia.slice(
                        -1
                      )[0].estado
                    : "N/A"}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Soporte:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  <button onClick={() => handleOpen(cirugia.nombreSoporte)}>
                    <img
                      src={soporte}
                      alt="soporte icon"
                      className="h-10 w-7"
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Gestión Auxiliar:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  <button
                    onClick={() =>
                      handleShowGestion(cirugia.programacionCirugia[0], cirugia.cups)
                    }
                  >
                    <img
                      src={gestion}
                      alt="Gestion-icon"
                      className="h-10 w-7"
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Mostrar:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  <button
                    onClick={() =>
                      handleShowVer(
                        cirugia.programacionCirugia[0],
                        cirugia.fechaOrden
                      )
                    }
                  >
                    <img
                      src={mostrar}
                      alt="Gestion-icon"
                      className="h-10 w-7"
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-600 text-[15px] dark:text-gray-400/90">
                  Programar:
                </div>
                <div className="text-xs text-gray-800 dark:text-gray-100">
                  <Suspense fallback={<LoadingSpinner />}>
                    <ModalCirugias idRadicado={cirugia.id} data={cirugia} />
                  </Suspense>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* pagination */}
        <div>‎ </div>
        <Pagination
          totalPages={totalPages}
          onPageChange={paginate}
          currentPage={currentPage}
        />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        {/* modal mostrar registro cirugias */}
        <ModalMostrarDatosCUPS
          isOpen={isOpenMostrar}
          onClose={() => setIsOpenMostrar(false)}
          data={null}
          dateOrder={dateOrden}
          cirugias={selectedCirugia}
        />
        {/* modal gestion auxiliar cirugias */}
        <ModalGestionAuxiliar
          isOpen={isOpenGestion}
          onClose={() => setIsOpenGestion(false)}
          radicacion={null}
          cirugias={selectedCirugia}
          cupsRadicado={cupsRadicado}
        />
      </Suspense>
    </>
  );
};

export default TablaCirugias;
