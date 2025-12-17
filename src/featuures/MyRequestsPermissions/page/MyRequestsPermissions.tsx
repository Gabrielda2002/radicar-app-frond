import ModalDefault from "@/components/common/Ui/ModalDefault";
import React, { JSX, useState } from "react";
import {
  IMyRequestsPermissions,
  MyRequestsPermissionsProps,
} from "../types/MyRquestsPermissions,.type";
import { useFetchMyRequests } from "../hook/useFetctMyRequests";
import { FormatDate } from "@/utils/FormatDate";
import { BadgeCheck, BadgeAlert, Badge, File, ChevronDown, ChevronUp } from "lucide-react";
import useSearch from "@/hooks/useSearch";
import usePagination from "@/hooks/usePagination";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import Pagination from "@/components/common/PaginationTable/PaginationTable";
import { useSecureFileAccess } from "@/featuures/SystemGC/Hooks/useSecureFileAccess";
import Button from "@/components/common/Ui/Button";

const ITEMS_PER_PAGE = 10;

const MyRequestsPermissions: React.FC<MyRequestsPermissionsProps> = ({
  isOpen,
  onClose,
}) => {
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const { data } = useFetchMyRequests();

  const { openSecureFile } = useSecureFileAccess();

  const { query, setQuery, filteredData } = useSearch<IMyRequestsPermissions>(
    data || [],
    ["category", "overallStatus", "granularity"]
  );

  const { currentPage, totalPages, paginate, currentData, setItemsPerPage } =
    usePagination<IMyRequestsPermissions>(filteredData, itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // ? funcion para manejar los estilos de estado
  const handleStatus = (status: string) => {
    const statusStyles: Record<string, { style: string; icon: JSX.Element }> = {
      APROBADO: {
        style: "bg-green-100 text-green-800",
        icon: <BadgeCheck className="w-5 h-5 text-green-500" />,
      },
      RECHAZADO: {
        style: "bg-red-100 text-red-800",
        icon: <BadgeAlert className="w-5 h-5 text-red-500" />,
      },
      PENDIENTE: {
        style: " text-yellow-500",
        icon: <Badge className="w-5 h-5 text-yellow-500" />,
      },
      VISTO: {
        style: "bg-blue-100 text-blue-800",
        icon: <Badge className="w-5 h-5 text-blue-500" />,
      },
    };

    // Retorna el objeto con estilo e icono, o un valor por defecto si el estado no existe
    return (
      statusStyles[status] || {
        style: "text-indigo-500",
        icon: <Badge className="w-5 h-5 text-gray-500" />,
      }
    );
  };

  return (
    <>
      <ModalDefault
        isOpen={isOpen}
        onClose={onClose}
        title="Mis Solicitudes"
        size="xl"
      >
        {data?.length === 0 ? (
          <div className="flex justify-center p-4">
            <p className="text-center text-base text-gray-500">
              No hay solicitudes de permisos disponibles.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 my-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por categoría, estado o granularidad..."
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

            <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 w-12"></th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Granularidad</th>
                    <th className="px-4 py-3">Fecha Inicio</th>
                    <th className="px-4 py-3">Fecha Fin</th>
                    <th className="px-4 py-3 text-center">Días</th>
                    <th className="px-4 py-3 text-center">Adjuntos</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData().map((r) => (
                    <React.Fragment key={r.id}>
                      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleRowExpansion(r.id)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            {expandedRows.has(r.id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                          {r.category}
                        </td>
                        <td className="px-4 py-3">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                              handleStatus(r.overallStatus).style
                            }`}
                          >
                            {handleStatus(r.overallStatus).icon}
                            <span className="font-semibold text-xs">
                              {r.overallStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                          {r.granularity}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                          {FormatDate(r.startDate, false)}
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                          {FormatDate(r.endDate, false)}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-gray-100">
                          {r.requestedDays}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {r.attachmentsRelation?.length > 0 ? (
                            <Button
                              variant="secondary"
                              onClick={() =>
                                openSecureFile(
                                  r.attachmentsRelation[0].supportId.toString(),
                                  "VIEW",
                                  "attachments"
                                )
                              }
                              icon={<File className="w-4 h-4" />}
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>

                      {expandedRows.has(r.id) && (
                        <tr className="bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700">
                          <td colSpan={8} className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Información adicional */}
                              <div className="space-y-3">
                                <h6 className="font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-1">
                                  Información Adicional
                                </h6>
                                
                                {(r.startTime && r.startTime !== "00:00:00") && (
                                  <div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Hora de inicio:
                                    </span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {r.startTime}
                                    </p>
                                  </div>
                                )}

                                {(r.endTime && r.endTime !== "00:00:00") && (
                                  <div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Hora de fin:
                                    </span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {r.endTime}
                                    </p>
                                  </div>
                                )}

                                {r.notes && (
                                  <div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Nota:
                                    </span>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 p-2 rounded">
                                      {r.notes}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Pasos de aprobación */}
                              <div className="space-y-3">
                                <h6 className="font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-1">
                                  Pasos de Aprobación
                                </h6>
                                
                                {r.stepsRelation.map((s) => (
                                  <div
                                    key={s.id}
                                    className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                                        Paso #{s.order}
                                      </span>
                                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded">
                                        {s.stepType}
                                      </span>
                                    </div>
                                    <div className="space-y-1">
                                      <div>
                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                          Estado:
                                        </span>
                                        <p className="text-sm text-gray-800 dark:text-gray-200">
                                          {s.status}
                                        </p>
                                      </div>
                                      {s.comment && (
                                        <div>
                                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                            Comentario:
                                          </span>
                                          <p className="text-sm text-gray-800 dark:text-gray-200">
                                            {s.comment}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          </div>
        )}
      </ModalDefault>
    </>
  );
};

export default MyRequestsPermissions;
