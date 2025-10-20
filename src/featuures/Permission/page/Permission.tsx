import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { FormatDate } from "@/utils/FormatDate";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import ModalPermissionsActions from "../components/ModalPermissionsActions";
import { useFetchRequestPermissions } from "../hook/useFetchRequestPermissions";
import useSearch from "@/hooks/useSearch";
import { IRequestsPermissions } from "../type/IRequestsPermissions";
import usePagination from "@/hooks/usePagination";
import { useState } from "react";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
const ITENS_PER_PAGE = 10;

const Permission = () => {
  const { data, error, isLoading, refetch } = useFetchRequestPermissions();

  const [itemsPerPage] = useState(ITENS_PER_PAGE);

  const { filteredData, setQuery, query} = useSearch<IRequestsPermissions>(data || [], [
    "category",
    "requesterName",
    "overallStatus",
    "granularity",
  ]);

  const {currentPage, totalPages, paginate, currentData, setItemsPerPage } = usePagination<IRequestsPermissions>(
    filteredData, itemsPerPage 
  );

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error != null ? (
        <div className="text-red-500 text-base">Error: {error}</div>
      ) : (
        <>
          <ModalSection
            title="Solicitudes de Permisos"
            breadcrumb={[
              { label: "Inicio", path: "/" },
              { label: "Solicitudes de Permisos", path: "/permissions" },
            ]}
          />
          {data?.length === 0 ? (
            <div>
              <p className="text-center text-gray-500 mt-10">
                No hay solicitudes de permisos disponibles.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
              <div className="flex items-center my-5 gap-3">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar"
                />
                <Select
                  options={[
                    { label: "10", value: "10" },
                    { label: "20", value: "20" },
                    { label: "30", value: "30" },
                  ]}
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                />
              </div>
              <table className="w-full">
                <thead className="text-gray-400 text-base">
                  <tr>
                    <th className="text-start">Colaborador</th>
                    <th className="text-start">Area</th>
                    <th className="text-start">Categoria</th>
                    <th className="text-start">Granularidad</th>
                    <th className="text-start">Fecha Solicitud</th>
                    <th className="text-start">Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    currentData().map((p) => (
                      <tr
                        className="border-b border-gray-200 dark:border-gray-700"
                        key={p.id}
                      >
                        <td className="text-start py-4 text-gray-950 p-0 bg-gray-50 dark:text-gray-50 dark:bg-gray-800">
                          {p.requesterName}
                        </td>
                        <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                          {p.category}
                        </td>
                        <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                          {p.category}
                        </td>
                        <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                          {p.granularity}
                        </td>
                        <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                          {FormatDate(p.createdAt)}
                        </td>
                        <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                          {p.overallStatus}
                        </td>
                        <td className="text-center p-0 bg-gray-50  dark:bg-gray-800">
                          <ModalPermissionsActions
                            permission={p}
                            onSuccess={refetch}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={paginate}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Permission;
