import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, generalInventoryReportData } from "../types/Report.type";

export class GeneralInventoryReportStrategy implements ReportStrategy<generalInventoryReportData> {
  getPreviewEndpoint(): string {
    return '/report/excel/general-inventory/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/general-inventory';
  }

  getColumns(): ColumnConfig<generalInventoryReportData>[] {
    return [
      {
        key: "headquarters",
        header: "Sede",
        size: "md" as const,
        accessor: (item) => item.headquarters,
      },
      {
        key: "name",
        header: "Nombre",
        size: "md" as const,
        accessor: (item) => item.name,
      },
      {
        key: "classification",
        header: "Clasificación",
        size: "md" as const,
        accessor: (item) => item.classification,
      },
      {
        key: "asset",
        header: "Activo",
        size: "md" as const,
        accessor: (item) => item.asset,
      },
      {
        key: "assetType",
        header: "Tipo de activo",
        size: "md" as const,
        accessor: (item) => item.assetType,
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
        key: "status",
        header: "Estado",
        size: "md" as const,
        accessor: (item) => item.status,
      },
      {
        key: "responsible",
        header: "Responsable",
        size: "md" as const,
        accessor: (item) => item.responsible,
      },
      {
        key: "location",
        header: "Ubicación",
        size: "md" as const,
        accessor: (item) => item.location,
      },
      {
        key: "quantity",
        header: "Cantidad",
        size: "sm" as const,
        accessor: (item) => item.quantity,
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

  getRowKey(item: generalInventoryReportData): string {
    return item?.inventoryNumber || `fallback-${Math.random()}`;
  }

  getSearchFields(): string[] {
    return [
      "headquarters",
      "name",
      "classification",
      "asset",
      "assetType",
      "brand",
      "model",
      "serial",
      "inventoryNumber",
      "status",
      "responsible",
      "location",
    ];
  }
}
