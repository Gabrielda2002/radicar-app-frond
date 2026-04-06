import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, deviceReportData } from "../types/Report.type";

export class NetworkDevicesReportStrategy implements ReportStrategy<deviceReportData> {
  getPreviewEndpoint(): string {
    return '/report/excel/device-red/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/device-red';
  }

  getColumns(): ColumnConfig<deviceReportData>[] {
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
        key: "addressIp",
        header: "Dirección IP",
        size: "md" as const,
        accessor: (item) => item.addressIp,
      },
      {
        key: "mac",
        header: "MAC",
        size: "md" as const,
        accessor: (item) => item.mac,
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
        key: "createdAt",
        header: "Fecha de creación",
        size: "md" as const,
        accessor: (item) => new Date(item.createdAt).toLocaleDateString(),
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

  getRowKey(item: deviceReportData): string {
    return item?.inventoryNumber || `fallback-${Math.random()}`;
  }

  getSearchFields(): string[] {
    return [
      "headquarters",
      "name",
      "brand",
      "model",
      "serial",
      "addressIp",
      "mac",
      "status",
      "inventoryNumber",
    ];
  }
}
