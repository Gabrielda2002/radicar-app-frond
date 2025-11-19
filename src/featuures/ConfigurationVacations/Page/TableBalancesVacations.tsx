import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchBalances } from "../Hooks/useFetchBalances";
import ModalConfigBalance from "../Components/ModalConfigBalance";
import React, { useState } from "react";
import useSearch from "@/hooks/useSearch";
import { Datum } from "../Types/IBalancesVacations";
import usePagination from "@/hooks/usePagination";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import Pagination from "@/components/common/PaginationTable/PaginationTable";

const TableBalancesVacations = () => {
  const { data, loading, error, refetch } = useFetchBalances();

  const ITEMS_PER_PAGE = 10;

  const [itemsPerPage] = useState(ITEMS_PER_PAGE);

  const { query, setQuery, filteredData } = useSearch<Datum>(data?.data || [], [
    "balances",
    "userName",
    "setupId",
  ]);

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination<Datum>(filteredData, itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error != null ? (
        <div className="text-red-500 text-base">{error}</div>
      ) : (
        <div className="w-full max-w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
          <div className="flex items-center my-5 gap-3">
            {/* filtros de la tabla1 */}
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar"
            />
            <Select
              options={[
                { label: "10", value: "10" },
                { label: "25", value: "25" },
                { label: "50", value: "50" },
              ]}
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            />
          </div>
            <table className="w-full">
            <thead className="text-gray-400 text-base">
              <tr>
              <th className="text-start px-2"># Id</th>
              <th className="text-start px-2">Colaborador</th>
              <th className="text-start px-2">Periodos</th>
              <th className="text-start px-2">Revisión</th>
              <th className="text-start px-2">Observaciones</th>
              <th className="text-end px-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData().map((b, index) => (
                <tr
                  className="border-b border-gray-200 dark:border-gray-700"
                  key={index}
                >
                  <td className="text-start py-4 text-gray-950 p-0 border-gray-500 dark:text-gray-50 dark:bg-gray-800">
                    {b.setupId}
                  </td>
                  <td className="text-start py-4 text-gray-950 p-0 border-gray-500 dark:text-gray-50 dark:bg-gray-800">
                    {b.userName}
                  </td>
                  <td className="text-start py-4 text-gray-400 p-0 border-gray-500 dark:text-gray-500 dark:bg-gray-800">
                    {b.periodosGenerados}
                  </td>
                  <td className="text-start py-4 text-gray-400 p-0 border-gray-500 dark:text-gray-500 dark:bg-gray-800">
                    {b.requiereRevision ? "Si" : "No"}
                  </td>
                  <td className="text-start py-4 text-gray-400 p-0 border-gray-500 dark:text-gray-500 dark:bg-gray-800">
                    {b.observaciones}
                  </td>
                  <td className="text-end py-4 text-gray-400 p-0 border-gray-500 dark:text-gray-500 dark:bg-gray-800">
                    <ModalConfigBalance
                      balances={b.balances}
                      onSuccess={refetch}
                      userId={b.userId}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </div>
      )}
    </>
  );
};

export default TableBalancesVacations;
