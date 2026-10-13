import { lazy, type LazyExoticComponent, type ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  MapPin,
  FileText,
  Code2,
  Users,
  ClipboardList,
  Handshake,
  Building2,
  MapPinned,
  ArrowRightFromLine,
  Stethoscope,
  Tags,
  User,
  HeartHandshake,
  GitFork,
  Target,
  CheckSquare,
  Coins,
} from "lucide-react";
export interface ConfigTable {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  component: LazyExoticComponent<ComponentType<any>>;
  rols?: number[];
}

export interface ConfigModule {
  id: string;
  label: string;
  icon: LucideIcon;
  tables: ConfigTable[];
  rols?: number[];
}

const TablaMunicipios = lazy(() => import("@/featuures/Municipality/Pages/TablaMunicipios"));
const TablaTipoDocumento = lazy(() => import("@/featuures/DocumentType/Pages/TablaTipoDocumento"));
const TablaCups = lazy(() => import("@/featuures/CUPS/Pages/TablaCups"));
const TablaPatient = lazy(() => import("@/featuures/Patient/Pages/TablePatient"));
const TablaDiagnostico = lazy(() => import("@/featuures/Diagnostico/Pages/TablaDiagnostico"));
const TablaConvenios = lazy(() => import("@/featuures/Convenio/Pages/TablaConvenio"));
const TablaIpsPrimaria = lazy(() => import("@/featuures/IpsPrimaria/Pages/TablaIpsPrimaria"));
const TablaLugarRadicacion = lazy(() => import("@/featuures/Sede/Pages/TablaLugarRadicacion"));
const TablaIpsRemite = lazy(() => import("@/featuures/IpsRemite/Pages/TablaIpsRemite"));
const TablaEspecialidad = lazy(() => import("@/featuures/Especialidad/Pages/TableSpecialty"));
const TablaTipoServicio = lazy(() => import("@/featuures/TypeService/Pages/TablaTipoServicio"));
const TableProfessional = lazy(() => import("@/featuures/Professional/page/Professional"));
const TableAreaDependency = lazy(() => import("../components/views/TableAreaDependency"))
const TableClassification = lazy(() => import("../components/views/TableClassification"))
const TableAssets = lazy(() => import("../components/views/TableAssets"));

const TablePpsActionLines = lazy(() => import("@/featuures/PPS/Page/TablePpsActionLines"));
const TablePpsGoals = lazy(() => import("@/featuures/PPS/Page/TablePpsGoals"));
const TablePpsActivities = lazy(() => import("@/featuures/PPS/Page/TablePpsActivities"));
const TablePpsTargetPopulations = lazy(() => import("@/featuures/PPS/Page/TablePpsTargetPopulations"));
const TablePpsFundingSources = lazy(() => import("@/featuures/PPS/Page/TablePpsFundingSources"));

export const configModules: ConfigModule[] = [
  {
    id: 'General',
    label: "General",
    icon: BookOpen,
    rols: [1],
    tables: [
      {
        id: "tipo-documento",
        label: "Tipo Documento",
        description: "Tipos de documento de identidad",
        icon: FileText,
        component: TablaTipoDocumento,
      },
      {
        id: "lugar-radicacion",
        label: "Sedes",
        description: "Lugares de radicación",
        icon: MapPinned,
        component: TablaLugarRadicacion,
      },
      {
        id: "pacientes",
        label: "Pacientes",
        description: "Gestión de pacientes del sistema",
        icon: Users,
        component: TablaPatient,
      },
      {
        id: "municipios",
        label: "Municipios",
        description: "Gestión de municipios del sistema",
        icon: MapPin,
        component: TablaMunicipios,
      },
    ]
  },
  {
    id: "catalogos",
    label: "Radicacion",
    icon: BookOpen,
    rols: [1],
    tables: [
      {
        id: "especialidad",
        label: "Especialidad",
        description: "Especialidades médicas",
        icon: Stethoscope,
        component: TablaEspecialidad,
      },
      {
        id: "cups",
        label: "CUPS",
        description: "Procedimientos y servicios CUPS",
        icon: Code2,
        component: TablaCups,
      },
      {
        id: "diagnostico",
        label: "Diagnóstico",
        description: "Diagnósticos médicos",
        icon: ClipboardList,
        component: TablaDiagnostico,
      },
      {
        id: "convenios",
        label: "Convenios",
        description: "Convenios del sistema",
        icon: Handshake,
        component: TablaConvenios,
      },
      {
        id: "ips-primaria",
        label: "IPS Primaria",
        description: "IPS primaria del sistema",
        icon: Building2,
        component: TablaIpsPrimaria,
      },
      {
        id: "ips-remite",
        label: "IPS Remitente",
        description: "IPS que remiten pacientes",
        icon: ArrowRightFromLine,
        component: TablaIpsRemite,
      },
      {
        id: "tipo-servicio",
        label: "Tipo Servicio",
        description: "Tipos de servicio del sistema",
        icon: Tags,
        component: TablaTipoServicio,
      },
      {
        id: "professional",
        label: "Profesional",
        description: "Profesionales que prestaran el servicio solicitado",
        icon: User,
        component: TableProfessional,
      }
    ],
  },
  {
    id: "general-inventory",
    label: "Inventario General",
    icon: BookOpen,
    rols: [1],
    tables: [
      {
        id: "area-dependency",
        label: 'Area Dependencia',
        description: "Area dependencia",
        icon: User,
        component: TableAreaDependency
      },
      {
        id: "classification",
        label: "Clasificación",
        icon: User,
        description: "Clasificacion",
        component: TableClassification
      },
      {
        id: "assets",
        label: "Activos",
        icon: User,
        description: "Activos",
        component: TableAssets
      }
    ]
  },
  {
    id: "pps-catalogos",
    label: "Participación Social (PPS)",
    icon: HeartHandshake,
    rols: [1, 11],
    tables: [
      {
        id: "pps-action-lines",
        label: "Líneas de Acción",
        description: "Líneas de acción oficiales del Plan de Participación Social",
        icon: GitFork,
        component: TablePpsActionLines,
      },
      {
        id: "pps-goals",
        label: "Metas",
        description: "Metas asociadas a las líneas de acción",
        icon: Target,
        component: TablePpsGoals,
      },
      {
        id: "pps-activities",
        label: "Actividades",
        description: "Actividades vinculadas a las metas del plan",
        icon: CheckSquare,
        component: TablePpsActivities,
      },
      {
        id: "pps-target-populations",
        label: "Poblaciones Objetivo",
        description: "Catálogo de poblaciones objetivo del plan",
        icon: Users,
        component: TablePpsTargetPopulations,
      },
      {
        id: "pps-funding-sources",
        label: "Fuentes de Recursos",
        description: "Catálogo de fuentes de financiamiento del plan",
        icon: Coins,
        component: TablePpsFundingSources,
      },
    ],
  }
];

export interface FlatTable extends ConfigTable {
  moduleId: string;
  moduleLabel: string;
}

export const flatTableMap: Record<string, FlatTable> = {};
for (const mod of configModules) {
  for (const table of mod.tables) {
    flatTableMap[table.id] = {
      ...table,
      moduleId: mod.id,
      moduleLabel: mod.label,
      rols: table.rols ?? mod.rols,
    };
  }
}
