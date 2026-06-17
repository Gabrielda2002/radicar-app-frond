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
} from "lucide-react";

export interface ConfigTable {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  component: LazyExoticComponent<ComponentType<any>>;
}

export interface ConfigModule {
  id: string;
  label: string;
  icon: LucideIcon;
  tables: ConfigTable[];
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
const TablaEspecialidad = lazy(() => import("@/featuures/Especialidad/Pages/TablaEspecialidad"));
const TablaTipoServicio = lazy(() => import("@/featuures/TypeService/Pages/TablaTipoServicio"));

export const configModules: ConfigModule[] = [
  {
    id: "catalogos",
    label: "Radicacion",
    icon: BookOpen,
    tables: [
      {
        id: "municipios",
        label: "Municipios",
        description: "Gestión de municipios del sistema",
        icon: MapPin,
        component: TablaMunicipios,
      },
      {
        id: "tipo-documento",
        label: "Tipo Documento",
        description: "Tipos de documento de identidad",
        icon: FileText,
        component: TablaTipoDocumento,
      },
      {
        id: "especialidad",
        label: "Especialidad",
        description: "Especialidades médicas",
        icon: Stethoscope,
        component: TablaEspecialidad,
      },
      {
        id: "pacientes",
        label: "Pacientes",
        description: "Gestión de pacientes del sistema",
        icon: Users,
        component: TablaPatient,
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
        id: "lugar-radicacion",
        label: "Lugar Radicación",
        description: "Lugares de radicación",
        icon: MapPinned,
        component: TablaLugarRadicacion,
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
    ],
  },
];

export interface FlatTable extends ConfigTable {
  moduleId: string;
  moduleLabel: string;
}

export const flatTableMap: Record<string, FlatTable> = {};
for (const mod of configModules) {
  for (const table of mod.tables) {
    flatTableMap[table.id] = { ...table, moduleId: mod.id, moduleLabel: mod.label };
  }
}
