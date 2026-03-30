import { Computer, Dumbbell, SquareActivity } from "lucide-react";
import { IconType } from "react-icons";
import { FaToolbox } from "react-icons/fa";

type ReportConfig = {
    id: string;
    title: string;
    description: string;
    icon: string | IconType;
    endPoint: string;
}

export const REPORT_CONFIG: ReportConfig[]   = [
    {
        id: 'radicacion',
        title: 'Radicación',
        description: 'Genera reportes de radicación para analizar el rendimiento y la eficiencia del proceso de radicación.',
        icon: FaToolbox,
        endPoint: 'report/excel/radicacion',
    },
    {
        id: 'Equipos', 
        title: 'Equipos',
        description: 'Genera reportes de equipos para evaluar el estado, rendimiento y mantenimiento de los equipos utilizados en el proceso de radicación.',
        icon: Computer,
        endPoint: 'report/excel/equipments'
    },
    {
        id: 'break',
        title: 'Pausas Activas',
        description: 'Genera reportes de pausas activas para monitorear y analizar las pausas activas realizadas por los operadores durante el proceso de radicación.',
        icon: Dumbbell,
        endPoint: 'report/excel/breakes'
    },
    {
        id: 'surgeries',
        title: 'Cirugías',
        description: 'Genera reportes de cirugías para evaluar el rendimiento y la eficiencia de las cirugías realizadas durante el proceso de radicación.',
        icon: SquareActivity,
        endPoint: 'report/excel/surgerys'
    }
]