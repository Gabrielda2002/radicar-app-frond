import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, MessageSquare, PlusCircle } from "lucide-react";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import {
  DataTable,
  DataTableContainer,
  useTableState,
} from "@/components/common/ReusableTable";
import type { ColumnConfig, FilterFieldConfig } from "@/components/common/ReusableTable";
import Button from "@/components/common/Ui/Button";
import { useStorePqrsdf } from "@/featuures/Pqrsdf/store/useStorePqrsdf";
import { ENUM_LABELS, IPqrsdf } from "@/featuures/Pqrsdf/models/IPqrsdf";
import ModalComments from "@/featuures/Pqrsdf/Components/ModalComments";
import { formatTimeRemaining } from "@/featuures/Pqrsdf/utils/formatTimeRemaining";
import { useCountdown } from "@/featuures/Pqrsdf/utils/useCountdown";
import { FormatDate } from "@/utils/FormatDate";
import { getStatusColor } from "@/featuures/Permission/utils/getColorTicketColumn";

const FILTER_CONFIG: FilterFieldConfig[] = [
  {
    key: 'status',
    label: "Estado",
    type: "multi-select",
    options: [
      { value: "ABIERTO", label: "Abierto" },
      { value: "EN_GESTION", label: "En Gestion" },
      { value: "CERRADO", label: "Cerrado" }
    ]
  },
  {
    key: "createdAt",
    label: "Fecha",
    type: "date-range",
  }
]

const PqrsdfListado: React.FC = () => {
  const navigate = useNavigate();
  const { pqrsdf, isLoading, error, getPqrsdf } = useStorePqrsdf();
  const [commentsPqrsdf, setCommentsPqrsdf] = useState<IPqrsdf | null>(null);

  // Cargar PQRSDF al montar el componente
  useEffect(() => {
    getPqrsdf();
  }, [getPqrsdf]);

  // Configuración de tabla con búsqueda
  const tableState = useTableState<IPqrsdf>({
    data: pqrsdf,
    searchFields: [
      "patientName",
      "patientDocument",
      "filingNumber",
      "id"
    ],
    initialItemsPerPage: 10,
    filterConfig: FILTER_CONFIG
  });

  // Contador en tiempo real para la columna "Tiempo restante"
  const tick = useCountdown();

  // Columnas de la tabla
  const columns: ColumnConfig<IPqrsdf>[] = [
    {
      key: "id",
      header: "Id",
      size: "sm",
      accessor: (item) => item.id
    },
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
      render: (item) => (
        <span className={getStatusColor(item.status.toUpperCase())}>
          {item.status}
        </span>
      ),
    },
    {
      key: "slaDeadLineAt",
      header: "Tiempo restante",
      size: "md",
      render: (item) => {
        // Si ya se cerró, el temporizador se detiene
        if (item.slaClosedAt)
          return <span className="text-green-500 font-semibold">Cumplido</span>;

        const formatted = formatTimeRemaining(item.slaDeadlineAt, tick);
        if (formatted === null) return <span>—</span>;
        if (formatted === "Vencido")
          return <span className="text-red-500 font-semibold">Vencido</span>;
        return <span className="bg-blue-600 text-white p-1 rounded-xl">{formatted}</span>;
      },
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
    {
      key: "Actions",
      header: "Acciones",
      size: 'md',
      render: (item) => (
        <>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            icon={<MessageSquare className="w-4 h-4" />}
            onClick={(e) => {
              e.stopPropagation();
              setCommentsPqrsdf(item);
            }}
            title="Comentarios"
            aria-label={`Ver comentarios del radicado ${item.filingNumber}`}
          />
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
          />
        </>
      )
    }
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
        filterState={tableState.filterState}
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
        />
      </DataTableContainer>

      <ModalComments
        isOpen={!!commentsPqrsdf}
        onClose={() => setCommentsPqrsdf(null)}
        pqrsdfId={commentsPqrsdf?.id ?? 0}
        filingNumber={commentsPqrsdf?.filingNumber ?? null}
      />
    </>
  );
};

export default PqrsdfListado;
