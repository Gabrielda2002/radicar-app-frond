//*Funciones y Hooks
import { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Pagination from "../Pagination.tsx";
import LoadingSpinner from "../LoadingSpinner";
import useSearch from "../../hooks/useSearch.ts";
import { IStatusCup } from "../../models/IAuditar.ts";
import usePagination from "../../hooks/usePagination.ts";
import { useFetchAuditoria } from "../../hooks/useFetchUsers";
import ModalMostrarDatosCUPS from "./modals/ModalMostrarDatos.tsx";

//*Icons
import mostrar from "/assets/mostrar.svg";
import { IAuditar } from "../../models/IAuditar.ts";
import soporte from "/assets/soporte.svg";
import autorizar from "/assets/autorizar.svg";

//*Properties
import ModalSection from "../ModalSection.tsx";
import { toZonedTime } from "date-fns-tz";

const ITEMS_PER_PAGE = 8;

const TablaAuditoria = () => {
  const { data, loading, error } = useFetchAuditoria();
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const [selectedCups, setSelectedCups] = useState<IStatusCup[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { query, setQuery, filteredData } = useSearch<IAuditar>(data, [
    "documentNumber",
    "namePatient",
    "convenio",
    "ipsPrimary",
    "documentType",
    "place",
    "ipsRemitente",
    "profetional",
    "speciality",
    "typeServices",
    "radicador",
  ]);

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, ITEMS_PER_PAGE);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error)
    return <h2 className="flex justify-center dark:text-white">{error}</h2>;

  const handleShowServicios = (statusCups: IStatusCup[]) => {
    setSelectedCups(statusCups);
    setIsOpen(true);
  };

  // * Funcion para abrir el modal de soporte
  const handleOpenSoporte = (soporte: string | null) => {
    if (!soporte) {
      console.log(soporte);
      alert("No hay soporte para mostrar.");
      return;
    }

    window.open(
      `http://localhost:3600/api/v1/uploads/Soportes/${soporte}`,
      "_blank"
    );
    return;
  };
  // * funcion para formatear la fecha
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    const utcDate = toZonedTime(date, 'America/Bogota'); // Reemplaza con la zona horaria deseada
    return format(utcDate, 'dd/MM/yyyy');
  };

  return (
    <>
    <ModalSection
      title="Módulo Auditoría"
      breadcrumb={[
        {label: "Inicio", path: "/Inicio"},
        {label: "/ Servicio Auditoría", path: ""}
      ]}
    />
      {/* nav-table NO BORRAR*/}
      {/* <section className="p-4 mb-6 bg-white rounded-md shadow-lg dark:bg-gray-800 shadow-indigo-500/40">
        <LoadingSpinner duration={500} />
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-color dark:text-gray-200">
            Módulo Auditoría
          </h1>
          <nav>
            <ol className="flex items-center space-x-2">
              <Link to="/inicio">
                <li className="text-slate-400 hover:underline">Inicio</li>
              </Link>
              <li className="text-slate-700 dark:text-gray-300">
                / Servicio Auditoría
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 text-gray-600 duration-300 bg-gray-200 border-2 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
          >
            <img src="" alt="Volver" className="w-6 h-6" />
          </button>
        </div>
      </section> */}

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <label className="text-lg font-bold text-stone-600 dark:text-stone-300">
          Buscar registro Auditoría :
        </label>
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="flex items-center space-x-2 container-filter">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Consultar..."
              className="block ps-2 w-[280px] h-10 pl-1 border-[1px] border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100  dark:focus:bg-gray-500 dark:focus:ring-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-[10px] pt-1-">
            <select
              name=""
              id=""
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="w-24 h-10 border border-gray-300 rounded-md focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Paginas</option>
              <option value="10">10 Paginas</option>
              <option value="20">20 Paginas</option>
              <option value="30">30 Paginas</option>
            </select>
            <Link to={"/tabla-radicacion"}>
              <button className="border-2 w-[150px] h-10 rounded-md focus:outline-none bg-color text-white hover:bg-teal-800  active:bg-teal-900 ">
                Ver Autorizaciones
              </button>
            </Link>
            <Link to={"/tabla-registros-auditados"}>
              <button className="border-2 w-[100px] h-10 focus:outline-none rounded-md bg-color  text-white hover:bg-teal-800 active:bg-teal-900 ">
                Auditados
              </button>
              {/* ! no se funciona | focus:outline-none | ! */}
            </Link>
          </div>
        </section>
        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
                <thead>
                  <tr className="text-sm text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                    <th>Fecha</th>
                    <th>N. Documento </th>
                    <th>Identificación</th>
                    <th>Nombre Completo</th>
                    <th>Convenio</th>
                    <th>IPS Primaria</th>
                    <th>Fecha Orden</th>
                    <th>Lugar Radicación</th>
                    <th>IPS Remite</th>
                    <th>Profesional</th>
                    <th>Especialidad</th>
                    <th>Tipo Servicio</th>
                    <th>Quién Radica</th>
                    <th>Soporte</th>
                    <th>Ver Servicios</th>
                    <th>Autorizar Servicios</th>
                  </tr>
                </thead>

                <tbody className="text-xs text-center dark:text-gray-200">
                  {currentData().map((auditoria) => (
                    <tr
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                      key={auditoria.id}
                    >
                      <td className="p-3 border-b dark:border-gray-700">
                        {formatDate(auditoria.radicadoDate)}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.documentType}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.documentNumber}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.namePatient}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.convenio}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.ipsPrimary}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {formatDate(auditoria.orderDate)}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.place}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.ipsRemitente}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.profetional}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.speciality}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.typeServices}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        {auditoria.radicador}
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <button
                          onClick={() => handleOpenSoporte(auditoria.soportes)}
                        >
                          <img
                            src={soporte}
                            alt="soporte-icon"
                            className="dark:invert"
                          />
                        </button>
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <button
                          onClick={
                            () => handleShowServicios(auditoria.statusCups) // *
                          }
                        >
                          <img
                            src={mostrar}
                            alt="mostrar-icon"
                            className="dark:invert"
                          />
                        </button>
                      </td>
                      <td className="p-3 border-b dark:border-gray-700">
                        <Link
                          to="/tabla-autorizar-servicios"
                          state={{
                            CUPS: auditoria.statusCups,
                            id: auditoria.id,
                          }}
                        >
                          <img
                            className="dark:invert "
                            src={autorizar}
                            alt="autorizar-icon"
                          />
                        </Link>
                        {/* ! no se le puede colocar | focus:outline-none | ! */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ModalMostrarDatosCUPS
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              data={selectedCups}
              cirugias={null}
              dateOrder={null}
            />
            <div>‎</div>
            {/* pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TablaAuditoria;
