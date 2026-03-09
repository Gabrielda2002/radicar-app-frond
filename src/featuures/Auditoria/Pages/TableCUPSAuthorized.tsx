//*Fuctions and Hooks
import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { Cup, IAuditados } from "@/models/IAuditados";
import { useFetchCUPSAuthorized } from "../Hooks/UseFetchCUPSAuthorized";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

//*Properties
import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { FormatDate } from "@/utils/FormatDate";
import Button from "@/components/common/Ui/Button";
import { DataTable, DataTableContainer, useTableState } from "@/components/common/ReusableTable";
const ModalActualizarCupsAuditoria = lazy(
  () => import("../Components/ModalUpdateCUPSAuthorized")
);

const TableCUPSAuthorized: React.FC = () => {
  const { data, loading, error, refetch } = useFetchCUPSAuthorized();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const tableState = useTableState({
    data: data,
    searchFields: ["id", "document", "patientName"],
    initialItemsPerPage: 10
  });

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const columns = [
    {
      key: "id",
      header: "ID Radicación",
      width: "15%",
      accessor: (item: IAuditados) => item.id,
    },
    {
      key: "radicadoDate",
      header: "Fecha Radicado",
      width: "20%",
      accessor: (item: IAuditados) => FormatDate(item.radicadoDate),
    },
    {
      key: "document",
      header: "Número Documento",
      width: "20%",
      accessor: (item: IAuditados) => item.document,
    },
    {
      key: "patientName",
      header: "Nombre Paciente",
      width: "25%",
      accessor: (item: IAuditados) => item.patientName,
    },
    {
      key: "cups",
      header: "CUPS",
      width: "20%",
      render: (item: IAuditados) => (
        <Button
          title="Ver Cups Auditados"
          onClick={() => toggleRow(item.id)}
          variant="secondary"
        >
          {expandedRow === item.id ? (
            <ChevronDownIcon className="w-6 h-6 text-black dark:text-white" />
          ) : (
            <ChevronUpIcon className="w-6 h-6 text-black dark:text-white" />
          )}
        </Button>
      )
    }
  ];

  return (
    <>
      <ModalSection
        title="Tabla Registros Auditados"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "/ Servicio Registros Auditados", path: "" },
        ]}
      />
      <DataTableContainer
        searchValue={tableState.searchQuery}
        onSearchChange={tableState.setSearchQuery}
        searchPlaceholder="Consultar..."
        searchLabel="Buscar registros Auditados:"
        itemsPerPage={tableState.itemsPerPage}
        onItemsPerPageChange={tableState.setItemsPerPage}
        currentPage={tableState.currentPage}
        totalPages={tableState.totalPages}
        onPageChange={tableState.paginate}
      >
        <TableWithAccordion
          data={tableState.currentData()}
          columns={columns}
          loading={loading}
          error={error}
          expandedRow={expandedRow}
          onSuccess={refetch}
        />
      </DataTableContainer>
    </>
  );
};

interface TableWithAccordionProps {
  data: IAuditados[];
  columns: any[];
  loading: boolean;
  error: string | null;
  expandedRow: number | null;
  onSuccess: () => void;
}

const TableWithAccordion: React.FC<TableWithAccordionProps> = ({
  data,
  columns,
  loading,
  error,
  expandedRow,
  onSuccess,
}) => {
  if (loading) return <LoadingSpinner duration={100000} />;

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-red-500 dark:text-red-300">
        No se encontraron resultados para la búsqueda.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg dark:text-gray-100">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr className="text-sm text-center shadow-md md:text-base bg-gray-50 dark:bg-gray-700 dark:text-gray-300 rounded-t-md">
            {columns.map((column) => (
              <th key={column.key} className={column.width ? `px-0 md:px-2` : ""}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs text-center dark:text-gray-200">
          {data.map((auditado) => (
            <React.Fragment key={auditado.id}>
              {/* Fila principal */}
              <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                {columns.map((column) => (
                  <td
                    key={`${auditado.id}-${column.key}`}
                    className="p-3 border-b dark:border-gray-700"
                  >
                    {column.render
                      ? column.render(auditado)
                      : column.accessor
                        ? column.accessor(auditado)
                        : null}
                  </td>
                ))}
              </tr>
              <AnimatePresence>
                {/* Fila expandible */}
                {expandedRow === auditado.id && (
                  <motion.tr
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-gray-100 dark:bg-gray-900"
                  >
                    <td colSpan={columns.length} className="w-full p-1.5 md:p-3">
                      <CupsTable cups={auditado.CUPS} onSuccess={onSuccess} />
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface CupsTableProps {
  cups: Cup[];
  onSuccess: () => void;
}

const CupsTable: React.FC<CupsTableProps> = ({ cups, onSuccess }) => {

  const columns = [
    {
      key: "id",
      header: "ID CUPS Radicado",
      width: "10%",
      accessor: (item: Cup) => item.id,
    },
    {
      key: "code",
      header: "Código",
      width: "10%",
      accessor: (item: Cup) => item.code,
    },
    {
      key: "description",
      header: "Descripción",
      width: "20%",
      accessor: (item: Cup) => item.description,
    },
    {
      key: "status",
      header: "Estado",
      width: "15%",
      accessor: (item: Cup) => item.status,
    },
    {
      key: "observation",
      header: "Observación",
      width: "15%",
      accessor: (item: Cup) => item.observation,
    },
    {
      key: "modifyDate",
      header: "Última modificación",
      width: "20%",
      accessor: (item: Cup) => FormatDate(item.modifyDate),
    }
  ]

  return (
    <DataTable
      data={cups}
      columns={columns}
      loading={false}
      error={null}
      getRowKey={(item: Cup) => item.id.toString()}
      renderActions={(item: Cup) => (
        <Suspense fallback={<LoadingSpinner />}>
          <ModalActualizarCupsAuditoria cup={item} onSuccess={onSuccess} />
        </Suspense>
      )}
    />
  );
}

export default TableCUPSAuthorized;
