import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, PlusCircle } from "lucide-react";
import HeaderPage from "@/components/common/HeaderPage/HeaderPage";
import {
  DataTable,
  DataTableContainer,
  useTableState,
} from "@/components/common/ReusableTable";
import type { ColumnConfig, FilterFieldConfig } from "@/components/common/ReusableTable";
import Button from "@/components/common/Ui/Button";
import { useStoreEncuestas } from "@/featuures/Encuestas/store/useStoreEncuestas";
import {
  ENUM_LABELS,
  IEncuestaSatisfaccion,
} from "@/models/IEncuestaSatisfaccion";
import { FormatDate } from "@/utils/FormatDate";
import { getExperienceColor } from "@/featuures/Encuestas/utils/getExperienceColor";

const FILTER_CONFIG: FilterFieldConfig[] = [
  {
    key: "globalExperience",
    label: "Experiencia",
    type: "multi-select",
    options: [
      { value: "MUY_BUENO", label: "Muy Bueno" },
      { value: "BUENO", label: "Bueno" },
      { value: "REGULAR", label: "Regular" },
      { value: "MALO", label: "Malo" },
      { value: "MUY_MALO", label: "Muy Malo" },
      { value: "NO_RESPONDE", label: "No Responde" },
    ],
  },
  {
    key: "createdAt",
    label: "Fecha",
    type: "date-range",
  },
];

const EncuestasListado: React.FC = () => {
  const navigate = useNavigate();
  const { surveys, isLoading, error, getSurveys } = useStoreEncuestas();

  // Cargar encuestas al montar el componente
  useEffect(() => {
    getSurveys();
  }, []);

  // Configuración de tabla con búsqueda
  const tableState = useTableState<IEncuestaSatisfaccion>({
    data: surveys,
    searchFields: [
      "patientName" as any,
      "patientDocument" as any,
    ],
    initialItemsPerPage: 10,
    filterConfig: FILTER_CONFIG,
  });

  // Columnas de la tabla
  const columns: ColumnConfig<IEncuestaSatisfaccion>[] = [
    {
      key: "id",
      header: "Id",
      size: "sm",
      accessor: (i) => i.id,
    },
    {
      key: "paciente",
      header: "Paciente",
      size: "lg",
      accessor: (item) => item.patientName ?? "—",
    },
    {
      key: "documento",
      header: "Documento",
      size: "md",
      accessor: (item) => item.patientDocument ?? "—",
    },
    {
      key: "municipio",
      header: "Municipio",
      size: "md",
      accessor: (item) => item.municipality ?? "—",
    },
    {
      key: "servicio",
      header: "Servicio",
      size: "md",
      accessor: (item) => item.customerServiceRating ?? "—",
    },
    {
      key: "experienciaGlobal",
      header: "Experiencia",
      size: "md",
      render: (item) => {
        if (!item.globalExperience) return "—";
        const label = ENUM_LABELS.ExperienciaGlobal[item.globalExperience] || item.globalExperience;
        const colorClass = getExperienceColor(item.globalExperience);
        return <span className={colorClass}>{label}</span>;
      },
    },
    {
      key: "recomendaria",
      header: "Recomendaría",
      size: "md",
      render: (item) =>
        item.wouldRecommend
          ? ENUM_LABELS.Recomendacion[item.wouldRecommend] || item.wouldRecommend
          : "—",
    },
    {
      key: "createdAt",
      header: "Fecha",
      size: "md",
      render: (item) => FormatDate(item.createdAt) ?? "—",
    },
    {
      key: "createdBy",
      header: "Registrado por",
      size: "md",
      accessor: (item) => item.registeredBy ?? "—",
    },
  ];

  return (
    <>
      <HeaderPage
        title="Encuestas de Satisfacción"
        breadcrumb={[
          { label: "Inicio", path: "/home" },
          { label: "Encuestas de Satisfacción", path: "/encuestas" },
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
            onClick={() => navigate("/encuestas/nueva")}
          >
            Nueva encuesta
          </Button>
        }
      >
        <DataTable<IEncuestaSatisfaccion>
          data={tableState.currentData()}
          columns={columns}
          getRowKey={(item) => item.id.toString()}
          loading={isLoading}
          error={error}
          emptyMessage="No hay encuestas registradas"
          renderActions={(item) => (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              icon={<Eye className="w-4 h-4" />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/encuestas/${item.id}`);
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

export default EncuestasListado;
