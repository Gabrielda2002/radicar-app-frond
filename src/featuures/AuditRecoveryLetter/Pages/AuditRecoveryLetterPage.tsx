import ModalSection from "@/components/common/HeaderPage/HeaderPage";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

import React, { Suspense, useCallback, useState } from "react";

import auditoria from "/assets/auditoria.svg";
import ModalAuditForm from "../Components/ModalAuditForm";
import { useFetchAuditLetter } from "../Hook/useFetchAuditLetter";
import { CupsAuthorizedLetter, IAuditLetter } from "@/models/IAuditLetter";
import useSearch from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import Select from "@/components/common/Ui/Select";
import Input from "@/components/common/Ui/Input";

const RecoverLastPage = () => {
  const { auditLetter, loading, error } = useFetchAuditLetter();

  const ITEMS_PER_PAGE = 10;

  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  // hook para barra de busqueda
  const { query, setQuery, filteredData } = useSearch<IAuditLetter>(
    auditLetter || [],
    ["idRadicado", "profetional"]
  );

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination(filteredData, ITEMS_PER_PAGE);

  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(e.target.value));
    },
    [setItemsPerPage]
  );

  // estado para pasar cups al modal
  const [cupsAuthorized, setCupsAuthorized] = useState<CupsAuthorizedLetter[]>(
    []
  );
  const [idRadicado, setIdRadicacion] = useState<number>(0);
  const [idRequest, setIdRequest] = useState<number>(0);

  // estados manejo apertura modal
  const [isOpen, setIsOpen] = useState(false);

  // const [idRadicado] = useState<number>(0);

  if (loading) return <LoadingSpinner duration={100000} />;

  if (error)
    return (
      <>
        <div>
          <ModalSection
            title="Auditoria"
            breadcrumb={[{ label: "Inicio", path: "/home" }]}
          />
        </div>
        <div className="text-red-500">{error}</div>
      </>
    );

  return (
    <>
      <ModalSection
        title="Auditoria"
        breadcrumb={[{ label: "Inicio", path: "/home" }]}
      />

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <label
          className="text-lg font-bold text-stone-600 dark:text-stone-300"
          htmlFor=""
        >
          Buscar Solicitudes
        </label>
        <section className="flex items-center justify-between pb-6 header-tabla">
          <div className="flex items-center w-full space-x-2 container-filter">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar"
              className="block w-full h-10 pl-1 border-[1px] ps-2 border-stone-300 text-stone-700 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:bg-blue-100 dark:focus:bg-gray-500 dark:focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-[10px] ml-4">
            <Select
              options={[
                { label: "10", value: "10" },
                { label: "20", value: "20" },
                { label: "30", value: "30" },
              ]}
              name=""
              id=""
              value={itemsPerPage}
              onCanPlay={handleItemsPerPageChange}
              className="w-24 h-10 border border-gray-300 rounded-md focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </section>

        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 dark:text-red-300">
            No se encontraron resultados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr className="shadow-md dark:text-gray-300 rounded-t-md">
                  <th>N* Radicado</th>
                  <th>Paciente</th>
                  <th>Tipo Documento</th>
                  <th>N* Documento</th>
                  <th>Convenio</th>
                  <th>Auditar</th>
                </tr>
              </thead>

              <tbody className="text-xs text-center dark:text-gray-200">
                {currentData()?.map((a) => (
                  <tr
                    key={a.id}
                    className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  >
                    <td className="p-3 border-b dark:border-gray-700">
                      {a.idRadicado}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {a.profetional}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {a.dniType}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {a.dniNumber}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {a.agreement}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setCupsAuthorized(a.cupsAuthorized);
                          setIdRadicacion(a.idRadicado);
                          setIdRequest(a.id);
                        }}
                      >
                        <img
                          src={auditoria}
                          alt="request-icon"
                          className="w-10 h-10 dark:filter dark:invert "
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <ModalAuditForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          cupsAuthorized={cupsAuthorized}
          idRadicado={idRadicado}
          idRequest={idRequest}
        />
      </Suspense>
    </>
  );
};

export default RecoverLastPage;
