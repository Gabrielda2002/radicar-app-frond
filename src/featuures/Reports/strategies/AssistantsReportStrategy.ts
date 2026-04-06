import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, assistantReportData } from "../types/Report.type";

export class AssistantsReportStrategy implements ReportStrategy<assistantReportData> {
  getPreviewEndpoint(): string {
    return '/report/excel/\assistants/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/\assistants';
  }

  getColumns(): ColumnConfig<assistantReportData>[] {
    return [
      {
        key: "id_radicado",
        header: "ID Radicado",
        size: "sm" as const,
        accessor: (item) => item.id_radicado,
      },
      {
        key: "radicadoDate",
        header: "Fecha de radicado",
        size: "md" as const,
        accessor: (item) => new Date(item.radicadoDate).toLocaleDateString(),
      },
      {
        key: "numero_documento",
        header: "Número de documento",
        size: "md" as const,
        accessor: (item) => item.numero_documento,
      },
      {
        key: "nombre_paciente",
        header: "Nombre del paciente",
        size: "md" as const,
        accessor: (item) => item.nombre_paciente,
      },
      {
        key: "codigo_cups",
        header: "Código CUPS",
        size: "md" as const,
        accessor: (item) => item.codigo_cups,
      },
      {
        key: "descripcion_cups",
        header: "Descripción CUPS",
        size: "lg" as const,
        accessor: (item) => item.descripcion_cups,
      },
      {
        key: "estado_gestion",
        header: "Estado de gestión",
        size: "md" as const,
        accessor: (item) => item.estado_gestion,
      },
      {
        key: "observacion",
        header: "Observación",
        size: "lg" as const,
        accessor: (item) => item.observacion,
      },
      {
        key: "fecha_registro",
        header: "Fecha de registro",
        size: "md" as const,
        accessor: (item) => new Date(item.fecha_registro).toLocaleDateString(),
      },
      {
        key: "usuario_registro",
        header: "Usuario de registro",
        size: "md" as const,
        accessor: (item) => item.usuario_registro,
      },
    ];
  }

  getFilterFields(): FilterFieldConfig[] {
    return [];
  }

  getValidationSchema(): Yup.ObjectSchema<any> {
    return Yup.object({});
  }

  buildPayload(values: Record<string, any>): Record<string, any> {
    return {
      dateStart: values.dateStart,
      dateEnd: values.dateEnd,
    };
  }

  getRowKey(item: assistantReportData): string {
    const id = item?.id_radicado?.toString() || 'no-id';
    const codigo = item?.codigo_cups || 'no-code';
    return `${id}-${codigo}`;
  }

  getSearchFields(): string[] {
    return [
      "numero_documento",
      "nombre_paciente",
      "codigo_cups",
      "descripcion_cups",
      "estado_gestion",
      "usuario_registro",
    ];
  }
}
