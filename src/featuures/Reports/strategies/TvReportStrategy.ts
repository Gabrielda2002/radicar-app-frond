import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, tvReportData } from "../types/Report.type";

export class TvReportStrategy implements ReportStrategy<tvReportData> {
  getPreviewEndpoint(): string {
    return '/report/excel/tv/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/tv';
  }

  getColumns(): ColumnConfig<tvReportData>[] {
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
        key: "location",
        header: "Ubicación",
        size: "md" as const,
        accessor: (item) => item.location,
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
        key: "screenSize",
        header: "Tamaño de pantalla",
        size: "sm" as const,
        accessor: (item) => item.screenSize,
      },
      {
        key: "resolution",
        header: "Resolución",
        size: "md" as const,
        accessor: (item) => item.resolution,
      },
      {
        key: "smartTv",
        header: "Smart TV",
        size: "sm" as const,
        accessor: (item) => item.smartTv,
      },
      {
        key: "status",
        header: "Estado",
        size: "md" as const,
        accessor: (item) => item.status,
      },
      {
        key: "inventoryNumber",
        header: "Número de inventario",
        size: "md" as const,
        accessor: (item) => item.inventoryNumber,
      },
      {
        key: "responsible",
        header: "Responsable",
        size: "md" as const,
        accessor: (item) => item.responsible,
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

  getRowKey(item: tvReportData): string {
    return item?.inventoryNumber || `fallback-${Math.random()}`;
  }

  getSearchFields(): string[] {
    return [
      "headquarters",
      "name",
      "location",
      "brand",
      "model",
      "serial",
      "status",
      "inventoryNumber",
      "responsible",
    ];
  }
}
