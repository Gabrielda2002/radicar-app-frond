import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, EquipmentReportData } from "../types/Report.type";

export class EquiposReportStrategy implements ReportStrategy<EquipmentReportData> {
  getPreviewEndpoint(): string {
    return '/report/excel/equipments/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/equipments';
  }

  getColumns(): ColumnConfig<EquipmentReportData>[] {
    return [
      {
        key: "headquarters",
        header: "Sede",
        size: "md" as const,
        accessor: (item) => item.headquarters,
      },
      {
        key: "name",
        header: "Nombre del equipo",
        size: "md" as const,
        accessor: (item) => item.name,
      },
      {
        key: "typeEquipment",
        header: "Tipo de equipo",
        size: "md" as const,
        accessor: (item) => item.typeEquipment,
      },
      {
        key: "brand",
        header: "Marca",
        size: "md" as const,
        accessor: (item) => item.brand,
      },
      {
        key: "model",
        header: "Modelo",
        size: "md" as const,
        accessor: (item) => item.model,
      },
      {
        key: "serial",
        header: "Serial",
        size: "md" as const,
        accessor: (item) => item.serial,
      },
      {
        key: "inventoryNumber",
        header: "Número de inventario",
        size: "md" as const,
        accessor: (item) => item.inventoryNumber,
      },
      {
        key: "userResponsable",
        header: "Responsable",
        size: "md" as const,
        accessor: (item) => item.userResponsable,
      },
      {
        key: "systemOperating",
        header: "Sistema operativo",
        size: "md" as const,
        accessor: (item) => item.systemOperating,
      },
      {
        key: "ipAddress",
        header: "Dirección IP",
        size: "md" as const,
        accessor: (item) => item.ipAddress,
      },
    ];
  }

  getFilterFields(): FilterFieldConfig[] {
    // Solo fechas para equipos
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

  getRowKey(item: EquipmentReportData): string {
    return item?.inventoryNumber || `fallback-${Math.random()}`;
  }

  getSearchFields(): string[] {
    return [
      "headquarters",
      "name",
      "typeEquipment",
      "brand",
      "model",
      "serial",
      "inventoryNumber",
      "userResponsable",
      "systemOperating",
    ];
  }
}
