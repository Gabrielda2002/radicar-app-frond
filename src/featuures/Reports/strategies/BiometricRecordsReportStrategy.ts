import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, biometricRecordData } from "../types/Report.type";

export class BiometricRecordsReportStrategy implements ReportStrategy<biometricRecordData> {
  getPreviewEndpoint(): string {
    return '/report/excel/biometric/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/biometric';
  }

  getColumns(): ColumnConfig<biometricRecordData>[] {
    return [
      {
        key: "fecha_registro",
        header: "Fecha de registro",
        size: "md" as const,
        accessor: (item) => new Date(item.fecha_registro).toLocaleDateString(),
      },
      {
        key: "hora_registro",
        header: "Hora de registro",
        size: "sm" as const,
        accessor: (item) => item.hora_registro,
      },
      {
        key: "numero_documento",
        header: "Número de documento",
        size: "md" as const,
        accessor: (item) => item.numero_documento,
      },
      {
        key: "nombre_usuario",
        header: "Nombre",
        size: "md" as const,
        accessor: (item) => item.nombre_usuario,
      },
      {
        key: "apellidos",
        header: "Apellidos",
        size: "md" as const,
        accessor: (item) => item.apellidos,
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

  getRowKey(item: biometricRecordData): string {
    return item.numero_documento.toString() + item.fecha_registro.toString() + item.hora_registro;
  }

  getSearchFields(): string[] {
    return [
      "numero_documento",
      "nombre_usuario",
      "apellidos",
      "sede",
      "area",
    ];
  }
}
