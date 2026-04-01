import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, phoneReportData } from "../types/Report.type";

export class PhonesReportStrategy implements ReportStrategy<phoneReportData> {
  getPreviewEndpoint(): string {
    return '/report/excel/phones/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/phones';
  }

  getColumns(): ColumnConfig<phoneReportData>[] {
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
        key: "imei",
        header: "IMEI",
        size: "md" as const,
        accessor: (item) => item.imei,
      },
      {
        key: "phoneNumber",
        header: "Número de teléfono",
        size: "md" as const,
        accessor: (item) => item.phoneNumber,
      },
      {
        key: "operator",
        header: "Operador",
        size: "md" as const,
        accessor: (item) => item.operator,
      },
      {
        key: "operativeSystem",
        header: "Sistema operativo",
        size: "md" as const,
        accessor: (item) => item.operativeSystem,
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
        key: "storage",
        header: "Almacenamiento",
        size: "sm" as const,
        accessor: (item) => item.storage,
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

  getRowKey(item: phoneReportData): string {
    return item.inventoryNumber;
  }

  getSearchFields(): string[] {
    return [
      "headquarters",
      "name",
      "brand",
      "model",
      "serial",
      "imei",
      "phoneNumber",
      "operator",
      "operativeSystem",
      "status",
      "inventoryNumber",
    ];
  }
}
