import ModalDefault from "@/components/common/Ui/ModalDefault";
import React, { useState } from "react";
import {
  IMyRequestsPermissions,
  MyRequestsPermissionsProps,
} from "../types/MyRquestsPermissions,.type";
import { useFetchMyRequests } from "../hook/useFetctMyRequests";
import { FormatDate } from "@/utils/FormatDate";
import { BadgeCheck, BadgeAlert, Badge, File } from "lucide-react";
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
        size="lg"
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
          <div className="grid grid-cols-2 gap-5">
            {currentData().map((r) => (
              <div
                key={r.id}
                className="grid md:grid-cols-2 gap-2 p-4 border border-gray-300 dark:border-gray-900 rounded-md shadow-md"
              >
                <div className="flex items-center justify-between col-span-2 max-h-4">
                  <h5>{r.category}</h5> 
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      handleStatus(r.overallStatus).style
                    }`}
                  >
                    {handleStatus(r.overallStatus).icon}
                    <span className="font-semibold">{r.overallStatus}</span>
                  </div>
                </div>
                <div className={`${r.attachmentsRelation?.length === 0 || !r.attachmentsRelation ? 'col-span-2 text-center' : ''}`}>
                  <h5 className="text-base text-gray-800 dark:text-gray-100">
                  Granularidad:
                  </h5>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                  {r.granularity}
                  </p>
                </div>
                {r.attachmentsRelation?.length > 0 && (
                  <div>
                    <h5>
                      Archivos Adjuntos:
                    </h5>
                    <div>
                      <Button
                        variant="secondary"
                        onClick={() => openSecureFile(r.attachmentsRelation[0].supportId.toString(), 'VIEW', 'attachments')}
                        icon={<File className="w-4 h-4"/>}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <h5 className="text-base text-gray-800 dark:text-gray-100">
                    Fecha de inicio:
                  </h5>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {FormatDate(r.startDate, false)}
                  </p>
                </div>
                <div>
                  <h5 className="text-base text-gray-800 dark:text-gray-100">
                    Fecha de fin:
                  </h5>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {FormatDate(r.endDate, false)}
                  </p>
                </div>
                <div className=" col-span-2 text-center">
                  <h5 className="text-base text-gray-800 dark:text-gray-100">
                    Dias Solicitados:
                  </h5>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {r.requestedDays}
                  </p>
                </div>
                {r.startTime != "00:00:00" ||
                  (r.startTime == null && (
                    <div>
                      <h5 className="text-base text-gray-800 dark:text-gray-100">
                        Hora de inicio:
                      </h5>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {r.startTime}
                      </p>
                    </div>
                  ))}
                {r.endTime != "00:00:00" ||
                  (r.endTime == null && (
                    <div>
                      <h5 className="text-base text-gray-800 dark:text-gray-100">
                        Hora de fin:
                      </h5>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {r.endTime}
                      </p>
                    </div>
                  ))}
                <div className="col-span-2 text-center dark:bg-gray-700 rounded-lg">
                  <h5 className="text-base text-gray-800 dark:text-gray-100">
                    Nota:
                  </h5>
                  <p className="text-sm text-gray-400 dark:text-gray-300">
                    {r.notes}
                  </p>
                </div>
                <div className="col-span-2">
                  <div>
                    {r.stepsRelation.map((s) => (
                      <div key={s.id}>
                        <h5 className="text-lg text-gray-800 dark:text-gray-100">
                          Paso #{s.order}:
                        </h5>
                        <div className="grid grid-cols-2 items-center justify-between p-2 my-1 border border-gray-300 rounded-md dark:border-gray-700">
                          <div>
                            <h5 className="text-base text-gray-800 dark:text-gray-100">
                              Estado:
                            </h5>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {s.status}
                            </p>
                          </div>
                          <div>
                            <h5 className="text-base text-gray-800 dark:text-gray-100">
                              Tipo de paso:
                            </h5>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {s.stepType}
                            </p>
                          </div>
                          <div className="col-span-2 text-center">
                            <h5 className="text-base text-gray-800 dark:text-gray-100">
                              Comentario:
                            </h5>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                              {s.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
