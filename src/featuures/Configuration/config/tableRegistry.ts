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
} from "lucide-react";
import type { TableFormConfig } from "@/components/common/Modals/GenericFormModal/types";
import { tipoDocumentoForm } from "./forms/tipoDocumentoForm";
import { lugarRadicacionForm } from "./forms/lugarRadicacionForm";
import { municipioForm } from "./forms/municipioForm";
import { cupsForm } from "./forms/cupsForm";
import { diagnosticoForm } from "./forms/diagnosticoForm";
import { especialidadForm } from "./forms/especialidadForm";
import { convenioForm } from "./forms/convenioForm";
import { ipsPrimariaForm } from "./forms/ipsPrimariaForm";
import { ipsRemiteForm } from "./forms/ipsRemiteForm";
import { tipoServicioForm } from "./forms/tipoServicioForm";

export interface ConfigTable {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  component: LazyExoticComponent<ComponentType<any>>;
  formConfig: TableFormConfig;
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
const TableProfessional = lazy(() => import("@/featuures/Professional/page/Professional"));

export const configModules: ConfigModule[] = [
  {
    id: 'General',
    label: "General",
    icon: BookOpen,
    tables: [
      {
        id: "tipo-documento",
        label: "Tipo Documento",
        description: "Tipos de documento de identidad",
        icon: FileText,
        component: TablaTipoDocumento,
        formConfig: tipoDocumentoForm,
      },
      {
        id: "lugar-radicacion",
        label: "Sedes",
        description: "Lugares de radicación",
        icon: MapPinned,
        component: TablaLugarRadicacion,
        formConfig: lugarRadicacionForm,
      },
      {
        id: "pacientes",
        label: "Pacientes",
        description: "Gestión de pacientes del sistema",
        icon: Users,
        component: TablaPatient,
        formConfig: tipoDocumentoForm,
      },
      {
        id: "municipios",
        label: "Municipios",
        description: "Gestión de municipios del sistema",
        icon: MapPin,
        component: TablaMunicipios,
        formConfig: municipioForm,
      },
    ]
  },
  {
    id: "catalogos",
    label: "Radicacion",
    icon: BookOpen,
    tables: [
      {
        id: "especialidad",
        label: "Especialidad",
        description: "Especialidades médicas",
        icon: Stethoscope,
        component: TablaEspecialidad,
        formConfig: especialidadForm,
      },
      {
        id: "cups",
        label: "CUPS",
        description: "Procedimientos y servicios CUPS",
        icon: Code2,
        component: TablaCups,
        formConfig: cupsForm,
      },
      {
        id: "diagnostico",
        label: "Diagnóstico",
        description: "Diagnósticos médicos",
        icon: ClipboardList,
        component: TablaDiagnostico,
        formConfig: diagnosticoForm,
      },
      {
        id: "convenios",
        label: "Convenios",
        description: "Convenios del sistema",
        icon: Handshake,
        component: TablaConvenios,
        formConfig: convenioForm,
      },
      {
        id: "ips-primaria",
        label: "IPS Primaria",
        description: "IPS primaria del sistema",
        icon: Building2,
        component: TablaIpsPrimaria,
        formConfig: ipsPrimariaForm,
      },
      {
        id: "ips-remite",
        label: "IPS Remitente",
        description: "IPS que remiten pacientes",
        icon: ArrowRightFromLine,
        component: TablaIpsRemite,
        formConfig: ipsRemiteForm,
      },
      {
        id: "tipo-servicio",
        label: "Tipo Servicio",
        description: "Tipos de servicio del sistema",
        icon: Tags,
        component: TablaTipoServicio,
        formConfig: tipoServicioForm,
      },
      {
        id: "professional",
        label: "Profesional",
        description: "Profesionales que prestaran el servicio solicitado",
        icon: User,
        component: TableProfessional,
        formConfig: tipoDocumentoForm,
      }
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
