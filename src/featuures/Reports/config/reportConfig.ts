import { CpuChipIcon } from "@heroicons/react/24/outline";
import { Computer, Dumbbell, SquareActivity, Phone, User, Building, Tv, Smartphone } from "lucide-react";
import { IconType } from "react-icons";
import { FaToolbox } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

type ReportConfig = {
    id: string;
    title: string;
    description: string;
    icon: string | IconType;
}

export const REPORT_CONFIG: ReportConfig[] = [
    {
        id: 'radicacion',
        title: 'Radicación',
        description: 'Genera reportes de radicación para analizar el rendimiento y la eficiencia del proceso de radicación.',
        icon: FaToolbox,
    },
    {
        id: 'Equipos', 
        title: 'Equipos',
        description: 'Genera reportes de equipos para evaluar el estado, rendimiento y mantenimiento de los equipos utilizados en el proceso de radicación.',
        icon: Computer,
    },
    {
        id: 'break',
        title: 'Pausas Activas',
        description: 'Genera reportes de pausas activas para monitorear y analizar las pausas activas realizadas por los operadores durante el proceso de radicación.',
        icon: Dumbbell,
    },
    {
        id: 'surgeries',
        title: 'Cirugías',
        description: 'Genera reportes de cirugías para evaluar el rendimiento y la eficiencia de las cirugías realizadas durante el proceso de radicación.',
        icon: SquareActivity,
    },
    {
        id: 'demanda-inducida',
        title: 'Demanda Inducida',
        description: 'Genera reportes de demanda inducida para evaluar y monitorear las llamadas y gestiones realizadas con los pacientes.',
        icon: Phone,
    },
    {
        id: 'assistents',
        title: 'Gestion Servicios Radicados',
        description: 'Genera reportes de gestión de servicios radicados para evaluar el rendimiento y la eficiencia de los servicios gestionados durante el proceso de radicación.',
        icon: FaToolbox,
    },
    {
        id: 'biometric-records',
        title: 'Registros Biométricos',
        description: 'Genera reportes de registros biométricos para evaluar el rendimiento y la eficiencia de los registros biométricos realizados durante el proceso de radicación.',
        icon: User,
    },
    {
        id: 'helpdesk-tickets',
        title: 'Tickets Mesa de Ayuda',
        description: 'Genera reportes de tickets de mesa de ayuda para evaluar el rendimiento y la eficiencia de los tickets gestionados durante el proceso de radicación.',
        icon: MdSupportAgent,
    },
    {
        id: 'network-devices',
        title: 'Dispositivos de Red',
        description: 'Genera reportes de dispositivos de red para evaluar el rendimiento y la eficiencia de los dispositivos de red utilizados durante el proceso de radicación.',
        icon: CpuChipIcon,
    },
    {
        id: 'general-inventory',
        title: 'Inventario General',
        description: 'Genera reportes de inventario general para evaluar el estado, rendimiento y mantenimiento de los equipos y dispositivos utilizados en el proceso de radicación.',
        icon: Building,
    },
    {
        id: 'tv',
        title: 'TV',
        description: 'Genera reportes de TV para evaluar el rendimiento y la eficiencia de los televisores utilizados durante el proceso de radicación.',
        icon: Tv,
    },
    {
        id: 'phones',
        title: 'Teléfonos',
        description: 'Genera reportes de teléfonos para evaluar el rendimiento y la eficiencia de los teléfonos utilizados durante el proceso de radicación.',
        icon: Smartphone,
    }
]