import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { ReportStrategy } from "./ReportStrategy";
import { FilterFieldConfig, helpdeskTicketData } from "../types/Report.type";

export class HelpdeskTicketsReportStrategy implements ReportStrategy<helpdeskTicketData> {
  getPreviewEndpoint(): string {
    return '/report/excel/tickets/preview';
  }

  getDownloadEndpoint(): string {
    return 'report/excel/tickets';
  }

  getColumns(): ColumnConfig<helpdeskTicketData>[] {
    return [
      {
        key: "fecha_registro",
        header: "Fecha de registro",
        size: "md" as const,
        accessor: (item) => new Date(item.fecha_registro).toLocaleDateString(),
      },
      {
        key: "titulo",
        header: "Título",
        size: "md" as const,
        accessor: (item) => item.titulo,
      },
      {
        key: "descripcion",
        header: "Descripción",
        size: "lg" as const,
        render: (item) => item.descripcion,
      },
      {
        key: "categoria",
        header: "Categoría",
        size: "md" as const,
        accessor: (item) => item.categoria,
      },
      {
        key: "usuario_solicitante",
        header: "Usuario solicitante",
        size: "md" as const,
        accessor: (item) => item.usuario_solicitante,
      },
      {
        key: "sede_solicitante",
        header: "Sede solicitante",
        size: "md" as const,
        accessor: (item) => item.sede_solicitante,
      },
      {
        key: "usuario_responsable",
        header: "Usuario responsable",
        size: "md" as const,
        accessor: (item) => item.usuario_responsable,
      },
      {
        key: "ultimo_estado",
        header: "Último estado",
        size: "md" as const,
        accessor: (item) => item.ultimo_estado,
      },
      {
        key: "fecha_ultimo_comentario",
        header: "Fecha último comentario",
        size: "md" as const,
        accessor: (item) => new Date(item.fecha_ultimo_comentario).toLocaleDateString(),
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

  getRowKey(item: helpdeskTicketData): string {
    return item.fecha_registro.toString() + item.titulo;
  }

  getSearchFields(): string[] {
    return [
      "titulo",
      "descripcion",
      "categoria",
      "usuario_solicitante",
      "sede_solicitante",
      "usuario_responsable",
      "ultimo_estado",
    ];
  }
}
