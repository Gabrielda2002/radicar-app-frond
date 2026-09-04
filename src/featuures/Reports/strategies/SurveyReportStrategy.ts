import { ColumnConfig } from "@/components/common/ReusableTable";
import { FilterFieldConfig, SurveyReportData } from "../types/Report.type";
import { ReportStrategy } from "./ReportStrategy";
import { ObjectSchema } from "yup";
import * as Yup from "yup";
import { FormatDate } from "@/utils/FormatDate";

export class SurveyReportStrategy implements ReportStrategy<SurveyReportData> {
    getPreviewEndpoint(): string {
        return 'surveys/satisfaction/report/preview';
    }

    getDownloadEndpoint(): string {
        return 'surveys/satisfaction/report';
    }

    getColumns(): ColumnConfig<SurveyReportData>[] {
        return [
            {
                key: "Marca_temporal",
                header: "Marca temporal",
                size: "sm" as const,
                accessor: (item) => FormatDate(item.Marca_temporal),
            },
            {
                key: "Sede_atencion",
                header: "Sede atención",
                size: "md" as const,
                accessor: (item) => item.Sede_atencion,
            },
            {
                key: "Convenio_paciente",
                header: "Convenio paciente",
                size: "md" as const,
                accessor: (item) => item.Convenio_paciente,
            },
            {
                key: "Numero_identificacion",
                header: "Número identificación",
                size: "sm" as const,
                accessor: (item) => item.Numero_identificacion,
            },
            {
                key: "Nombre_completo",
                header: "Nombre completo",
                size: "md" as const,
                accessor: (item) => item.Nombre_completo,
            },
            {
                key: "Poblacion_especial",
                header: "Población especial",
                size: "sm" as const,
                accessor: (item) => item.Poblacion_especial,
            },
            {
                key: "Servicio_atencion",
                header: "Servicio atención",
                size: "md" as const,
                accessor: (item) => item.Servicio_atencion,
            },
            {
                key: "Cita_oportuna",
                header: "Cita oportuna",
                size: "sm" as const,
                accessor: (item) => item.Cita_oportuna,
            },
            {
                key: "Experiencia_global",
                header: "Experiencia global",
                size: "sm" as const,
                accessor: (item) => item.Experiencia_global,
            },
            {
                key: "Recomendaria_ips",
                header: "Recomendaría IPS",
                size: "sm" as const,
                accessor: (item) => item.Recomendaria_ips,
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

    getRowKey(item: SurveyReportData): string {
        return `${item.Marca_temporal}-${item.Numero_identificacion}`;
    }

    getSearchFields(): string[] {
        return [
            "Nombre_completo",
            "Numero_identificacion",
            "Sede_atencion",
            "Servicio_atencion"
        ];
    }
}
