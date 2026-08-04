import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, PlusCircle } from "lucide-react";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import {
  DataTable,
  DataTableContainer,
  useTableState,
} from "@/components/common/ReusableTable";
import type { ColumnConfig } from "@/components/common/ReusableTable";
import Button from "@/components/common/Ui/Button";
import { useStorePqrsdf } from "@/featuures/Pqrsdf/store/useStorePqrsdf";
import { ENUM_LABELS, IPqrsdf } from "@/featuures/Pqrsdf/models/IPqrsdf";
import { FormatDate } from "@/utils/FormatDate";

const PqrsdfListado: React.FC = () => {
  const navigate = useNavigate();
  const { pqrsdf, isLoading, error, getPqrsdf } = useStorePqrsdf();

  // Cargar PQRSDF al montar el componente
  useEffect(() => {
    getPqrsdf();
  }, [getPqrsdf]);

  // Configuración de tabla con búsqueda
  const tableState = useTableState<IPqrsdf>({
    data: pqrsdf,
    searchFields: [
      "patientName" as any,
      "patientDocument" as any,
      "filingNumber" as any,
    ],
    initialItemsPerPage: 10,
  });

  // Columnas de la tabla
  const columns: ColumnConfig<IPqrsdf>[] = [
    {
      key: "filingNumber",
      header: "Radicado #",
      size: "sm",
      accessor: (item) => item.filingNumber,
    },
    {
      key: "patientName",
      header: "Paciente",
      size: "lg",
      accessor: (item) => item.patientName,
    },
    {
      key: "patientDocument",
      header: "Documento",
      size: "md",
      accessor: (item) => item.patientDocument,
    },
    {
      key: "classification",
      header: "Clasificación",
      size: "md",
      accessor: (item) =>
        ENUM_LABELS.classification[item.classification] || item.classification,
    },
    {
      key: "status",
      header: "Estado",
      size: "sm",
      render: (item) => item.status,
    },
    {
      key: "originAreaName",
      header: "Área",
      size: "md",
      accessor: (item) => item.originAreaName,
    },
    {
      key: "presenterName",
      header: "Registrado por",
      size: "md",
      accessor: (item) => item.createdBy ?? "—",
    },
    {
      key: "createdAt",
      header: "Fecha",
      size: "sm",
      render: (item) => FormatDate(item.createdAt) ?? "—",
    },
  ];

  return (
    <>
      <HeaderPage
        title="PQRSDF"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "PQRSDF", path: "/pqrsdf" },
        ]}
        duration={300}
      />

      <DataTableContainer
        searchValue={tableState.searchQuery}
        onSearchChange={tableState.setSearchQuery}
        itemsPerPage={tableState.itemsPerPage}
        onItemsPerPageChange={tableState.setItemsPerPage}
        currentPage={tableState.currentPage}
        totalPages={tableState.totalPages}
        onPageChange={tableState.paginate}
        headerActions={
          <Button
            type="button"
            variant="primary"
            size="md"
            icon={<PlusCircle className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => navigate("/pqrsdf/nueva")}
          >
            Nuevo PQRSDF
          </Button>
        }
      >
        <DataTable<IPqrsdf>
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={isLoading}
          error={error}
          emptyMessage="No se encontraron PQRSDF registrados"
          renderActions={(item) => (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              icon={<Eye className="w-4 h-4" />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/pqrsdf/${item.id}`);
              }}
              title="Ver detalle"
            >
              Ver
            </Button>
          )}
        />
      </DataTableContainer>
    </>
  );
};

export default PqrsdfListado;
