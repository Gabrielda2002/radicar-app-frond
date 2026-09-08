import { ColumnConfig } from "@/components/common/ReusableTable";
import { FilterFieldConfig, PqrsdfReportData } from "../types/Report.type";
import { ReportStrategy } from "./ReportStrategy";
import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { FormatDate } from "@/utils/FormatDate";

export class PqrsdfStrategy implements ReportStrategy<PqrsdfReportData> {
    getPreviewEndpoint(): string {
        return '/report/excel/pqrsdf/preview';
    }

    getDownloadEndpoint(): string {
        return 'report/excel/pqrsdf';
    }

    getColumns(): ColumnConfig<PqrsdfReportData>[] {
        return [
            {
                key: "Nombre_del_paciente",
                header: "Nombre del paciente",
                size: "md" as const,
                accessor: (item) => item.Nombre_del_paciente,
            },
            {
                key: "Documento",
                header: "Documento",
                size: "sm" as const,
                accessor: (item) => item.Documento,
            },
            {
                key: "Asegurador_EPS",
                header: "Asegurador / EPS",
                size: "md" as const,
                accessor: (item) => item.Asegurador_EPS,
            },
            {
                key: "Novedad_presentada_por",
                header: "Novedad presentada por",
                size: "md" as const,
                accessor: (item) => item.Novedad_presentada_por,
            },
            {
                key: "Notifica_EPS",
                header: "Notifica EPS",
                size: "sm" as const,
                accessor: (item) => item.Notifica_EPS,
            },
            {
                key: "PQRS",
                header: "PQRS",
                size: "sm" as const,
                accessor: (item) => item.PQRS,
            },
            {
                key: "Numero_de_radicado",
                header: "Número de radicado",
                size: "sm" as const,
                accessor: (item) => item.Numero_de_radicado,
            },
            {
                key: "Fecha_de_respuesta",
                header: "Fecha de respuesta",
                size: "sm" as const,
                accessor: (item) => FormatDate(item.Fecha_de_respuesta),
            },
            {
                key: "Oportunidad_desde_radicacion",
                header: "Oportunidad desde radicación",
                size: "md" as const,
                accessor: (item) => FormatDate(item.Oportunidad_desde_radicacion),
            },
            {
                key: "Area_resolvio",
                header: "Área resolvió",
                size: "lg" as const,
                accessor: (item) => item.Area_con_la_cual_se_resolvio_el_evento,
            },
            {
                key: "Estado",
                header: "Estado",
                size: "sm" as const,
                accessor: (item) => item.Estado,
            },
        ];
    }
    getFilterFields(): FilterFieldConfig[] {
        return [];
    }

    getValidationSchema(): ObjectSchema<any> {
        return Yup.object({});
    }

    buildPayload(values: Record<string, any>): Record<string, any> {
        return {
            dateStart: values.dateStart,
            dateEnd: values.dateEnd,
        };
    }

    getRowKey(item: PqrsdfReportData): string {
        return `fallback-${Math.random().toString()}` || item?.Numero_de_radicado.toString();
    }

    getSearchFields(): string[] {
        return [
            "Numero_de_radicado",
            "Nombre_del_solicitante",
            "Descripcion_del_evento"
        ]
    }
}