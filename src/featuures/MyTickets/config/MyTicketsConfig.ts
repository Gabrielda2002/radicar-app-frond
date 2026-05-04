import { FilterFieldConfig } from "@/components/common/ReusableTable";
import { DeskSource } from "@/featuures/HelpDesk/types/ITickets";

interface DeskConfig {
    endpoint: string;
    label: DeskSource;
}

export const DESK_CONFIG: Record<string, DeskConfig> = {
    sistemas: { endpoint: "/tickets-table", label: "sistemas" },
    infraestructura: { endpoint: "/infrastructure-tickets/table", label: "infraestructura" },
    sst: { endpoint: "/sst-tickets/table", label: "sst" }
};


export const TICKET_FILTER_CONFIG: FilterFieldConfig[] = [
    {
        key: "status",
        label: "Estado",
        type: "multi-select",
        options: [
            { value: "Abierto", label: "Abierto" },
            { value: "Pendiente", label: "Pendiente" },
            { value: "Cerrado", label: "Cerrado" },
        ],
    },
    {
        key: "priority",
        label: "Prioridad",
        type: "multi-select",
        options: [
            { value: "Alta", label: "Alta" },
            { value: "Media", label: "Media" },
            { value: "Baja", label: "Baja" },
            { value: "Urgente", label: "Urgente" },
        ],
    },
    {
        key: "type",
        label: "Tipo",
        type: "multi-select",
        options: [
            { value: "Solicitud", label: "Solicitud" },
            { value: "Incidente", label: "Incidente" }
        ],
    },
    {
        key: "category",
        label: "Categoría",
        type: "multi-select",
        getOptionsFromData: true,
    },
    {
        key: "createdAt",
        label: "Fecha creación",
        type: "date-range",
    },
];