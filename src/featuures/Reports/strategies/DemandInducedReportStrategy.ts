import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, demandaInducidaData } from "../types/Report.type";

export class DemandInducedReportStrategy implements ReportStrategy<demandaInducidaData> {
  getPreviewEndpoint(): string {
    return '/report/excel/demand-induced/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/demand-induced';
  }

  getColumns(): ColumnConfig<demandaInducidaData>[] {
    return [
      {
        key: "fecha_actividad",
        header: "Fecha de actividad",
        size: "md" as const,
        accessor: (item) => item.fecha_actividad,
      },
      {
        key: "tipo_documento",
        header: "Tipo de documento",
        size: "md" as const,
        accessor: (item) => item.tipo_documento,
      },
      {
        key: "numero_identificacion",
        header: "Número de identificación",
        size: "md" as const,
        accessor: (item) => item.numero_identificacion,
      },
      {
        key: "elemento_demanda",
        header: "Elemento de demanda",
        size: "md" as const,
        accessor: (item) => item.elemento_demanda,
      },
      {
        key: "tipo_elemento",
        header: "Tipo de elemento",
        size: "md" as const,
        accessor: (item) => item.tipo_elemento,
      },
      {
        key: "objetivo",
        header: "Objetivo",
        size: "lg" as const,
        accessor: (item) => item.objetivo,
      },
      {
        key: "resultado_llamada",
        header: "Resultado de llamada",
        size: "md" as const,
        accessor: (item) => item.resultado_llamada,
      },
      {
        key: "programa",
        header: "Programa",
        size: "md" as const,
        accessor: (item) => item.programa,
      },
      {
        key: "Profesional",
        header: "Profesional",
        size: "md" as const,
        accessor: (item) => item.Profesional,
      },
      {
        key: "fecha_llamada",
        header: "Fecha de llamada",
        size: "md" as const,
        accessor: (item) => item.fecha_llamada || 'N/A',
      },
    ];
  }

  getFilterFields(): FilterFieldConfig[] {
    return [
      {
        name: 'lugarRadicacion',
        label: 'Lugar de radicación',
        type: 'text',
        required: false,
      },
      {
        name: 'convenio',
        label: 'Convenio',
        type: 'number',
        required: false,
      },
    ];
  }

  getValidationSchema(): Yup.ObjectSchema<any> {
    return Yup.object({
      lugarRadicacion: Yup.string().optional(),
      convenio: Yup.string().optional()
    });
  }

  buildPayload(values: Record<string, any>): Record<string, any> {
    return {
      dateStart: values.dateStart,
      dateEnd: values.dateEnd,
      lugarRadicacion: values.lugarRadicacion || undefined,
      convenio: values.convenio || undefined,
    };
  }

  getRowKey(item: demandaInducidaData): string {
    return item.numero_identificacion + item.fecha_actividad;
  }

  getSearchFields(): string[] {
    return [
      "tipo_documento",
      "numero_identificacion",
      "elemento_demanda",
      "tipo_elemento",
      "resultado_llamada",
      "programa",
      "Profesional",
    ];
  }
}
