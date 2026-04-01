import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, ReportCirugias } from "../types/Report.type";

export class SurgeriesReportStrategy implements ReportStrategy<ReportCirugias> {
  getPreviewEndpoint(): string {
    return '/report/excel/surgeries/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/surgeries';
  }

  getColumns(): ColumnConfig<ReportCirugias>[] {
    return [
      {
        key: "Fecha_ordenamiento",
        header: "Fecha de ordenamiento",
        size: "md" as const,
        accessor: (item) => new Date(item.Fecha_ordenamiento).toLocaleDateString(),
      },
      {
        key: "Fecha_cirugia",
        header: "Fecha de cirugía",
        size: "md" as const,
        accessor: (item) => new Date(item.Fecha_cirugia).toLocaleDateString(),
      },
      {
        key: "Hora_programada",
        header: "Hora programada",
        size: "sm" as const,
        accessor: (item) => item.Hora_programada,
      },
      {
        key: "IPS_Remitente",
        header: "IPS Remitente",
        size: "md" as const,
        accessor: (item) => item.IPS_Remitente,
      },
      {
        key: "diagnostico_name",
        header: "Diagnóstico",
        size: "lg" as const,
        accessor: (item) => item.diagnostico_name,
      },
      {
        key: "diagnostico_code",
        header: "Código diagnóstico",
        size: "md" as const,
        accessor: (item) => item.diagnostico_code,
      },
      {
        key: "especialista",
        header: "Especialista",
        size: "md" as const,
        accessor: (item) => item.especialista,
      },
      {
        key: "Codigo_cups",
        header: "Código CUPS",
        size: "md" as const,
        accessor: (item) => item.Codigo_cups,
      },
      {
        key: "Descripcion_cups",
        header: "Descripción CUPS",
        size: "lg" as const,
        accessor: (item) => item.Descripcion_cups,
      },
      {
        key: "Estado",
        header: "Estado",
        size: "md" as const,
        accessor: (item) => item.Estado,
      },
      {
        key: "Fecha_registro",
        header: "Fecha de registro",
        size: "md" as const,
        accessor: (item) => new Date(item.Fecha_registro).toLocaleDateString(),
      },
    ];
  }

  getFilterFields(): FilterFieldConfig[] {
    // Solo fechas para cirugías
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

  getRowKey(item: ReportCirugias): string {
    return item.Codigo_cups + item.Fecha_registro.toString();
  }

  getSearchFields(): string[] {
    return [
      "IPS_Remitente",
      "diagnostico_name",
      "diagnostico_code",
      "especialista",
      "Codigo_cups",
      "Descripcion_cups",
      "Estado",
    ];
  }
}
