import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, breaksRecordData } from "../types/Report.type";

export class BreaksReportStrategy implements ReportStrategy<breaksRecordData> {
  getPreviewEndpoint(): string {
    return '/report/excel/breakes/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/breakes';
  }

  getColumns(): ColumnConfig<breaksRecordData>[] {
    return [
      {
        key: "fecha_creacion",
        header: "Fecha de creación",
        size: "md" as const,
        accessor: (item) => new Date(item.fecha_creacion).toLocaleDateString(),
      },
      {
        key: "nombre_usuario",
        header: "Nombre",
        size: "md" as const,
        accessor: (item) => item.nombre_usuario,
      },
      {
        key: "apellidos_usuario",
        header: "Apellidos",
        size: "md" as const,
        accessor: (item) => item.apellidos_usuario,
      },
      {
        key: "numero_documento",
        header: "Documento",
        size: "md" as const,
        accessor: (item) => item.numero_documento,
      },
      {
        key: "sede",
        header: "Sede",
        size: "md" as const,
        accessor: (item) => item.sede,
      },
      {
        key: "area",
        header: "Área",
        size: "md" as const,
        accessor: (item) => item.area,
      },
      {
        key: "cargo",
        header: "Cargo",
        size: "md" as const,
        accessor: (item) => item.cargo,
      },
      {
        key: "observacion",
        header: "Observación",
        size: "lg" as const,
        accessor: (item) => item.observacion,
      },
    ];
  }

  getFilterFields(): FilterFieldConfig[] {
    // Solo fechas para pausas activas
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

  getRowKey(item: breaksRecordData): string {
    return item.numero_documento.toString();
  }

  getSearchFields(): string[] {
    return [
      "nombre_usuario",
      "apellidos_usuario",
      "sede",
      "area",
      "cargo",
      "observacion",
    ];
  }
}
