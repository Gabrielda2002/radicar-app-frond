import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, Datum } from "../types/Report.type";

export class RadicacionReportStrategy implements ReportStrategy<Datum> {
  getPreviewEndpoint(): string {
    return '/report/excel/radicacion/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/radicacion';
  }

  getColumns(): ColumnConfig<Datum>[] {
    return [
      {
        key: "tipo_documento",
        header: "Documento",
        size: "xs" as const,
        accessor: (item) => item.Tipo_de_documento,
      },
      {
        key: "numero_documento",
        header: "Número de documento",
        size: "md" as const,
        accessor: (item) => item.Numero_documento,
      },
      {
        key: "nombre_paciente",
        header: "Nombre del paciente",
        size: "md" as const,
        accessor: (item) => item.Nombre_del_paciente,
      },
      {
        key: "convenio",
        header: "Convenio",
        size: "md" as const,
        accessor: (item) => item.Convenio,
      },
      {
        key: "lugar_radicacion",
        header: "Lugar de radicación",
        size: "md" as const,
        accessor: (item) => item.Lugar_de_radicacion,
      },
      {
        key: "especialidad",
        header: "Especialidad",
        size: "md" as const,
        accessor: (item) => item.Especialidad,
      },
      {
        key: "codigo_cups",
        header: "Código CUPS",
        size: "md" as const,
        accessor: (item) => item.Codigo_cups,
      },
      {
        key: "estado_cups",
        header: "Estado CUPS",
        size: "md" as const,
        accessor: (item) => item.Estado_cups,
      },
      {
        key: "radicador",
        header: "Radicador",
        size: "md" as const,
        accessor: (item) => item.Radicador,
      },
      {
        key: "auditora",
        header: "Auditora",
        size: "md" as const,
        accessor: (item) => item.Auditora,
      },
    ];
  }

  getFilterFields(): FilterFieldConfig[] {
    return [
      {
        name: 'cupsCode',
        label: 'Código CUPS',
        type: 'text',
        required: false,
      },
      {
        name: 'estadoCups',
        label: 'Estado CUPS',
        type: 'autocomplete',
        endpoint: 'status/name',
        required: false,
      },
      {
        name: 'specialty',
        label: 'Especialidad',
        type: 'autocomplete',
        endpoint: 'especialidades-name',
        required: false,
      }
    ];
  }

  getValidationSchema(): Yup.ObjectSchema<any> {
    return Yup.object({
      cupsCode: Yup.string().optional(),
      estadoCups: Yup.string().optional(),
      specialty: Yup.string().optional(),
    });
  }

  buildPayload(values: Record<string, any>): Record<string, any> {
    return {
      dateStart: values.dateStart,
      dateEnd: values.dateEnd,
      cupsCode: values.cupsCode || undefined,
      statusCups: values.estadoCups || undefined,
      specialty: values.specialty || undefined,
    };
  }

  getRowKey(item: Datum): string {
    return item?.Id?.toString() || `fallback-${Math.random()}`;
  }

  getSearchFields(): string[] {
    return [
      "Tipo_de_documento",
      "Nombre_del_paciente",
      "Numero_documento",
      "Convenio",
      "IPS_Primaria",
      "Lugar_de_radicacion",
      "Profesional",
      "Especialidad",
      "Codigo_cups",
      "Estado_cups",
    ];
  }
}
