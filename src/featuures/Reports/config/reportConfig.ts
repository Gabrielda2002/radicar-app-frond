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
    roles: string[];
}

export const REPORT_CONFIG: ReportConfig[] = [
    {
        id: 'radicacion',
        title: 'Radicación',
        description: 'Genera reportes de radicación para analizar el rendimiento y la eficiencia del proceso de radicación.',
        icon: FaToolbox,
        roles: ['1', '3', '6', '14', '15']
    },
    {
        id: 'Equipos', 
        title: 'Equipos',
        description: 'Genera reportes de equipos para evaluar el estado, rendimiento y mantenimiento de los equipos utilizados en el proceso de radicación.',
        icon: Computer,
        roles: ['1']
    },
    {
        id: 'break',
        title: 'Pausas Activas',
        description: 'Genera reportes de pausas activas para monitorear y analizar las pausas activas realizadas por los operadores durante el proceso de radicación.',
        icon: Dumbbell,
        roles: ['1', '2', '6']
    },
    {
        id: 'surgeries',
        title: 'Cirugías',
        description: 'Genera reportes de cirugías para evaluar el rendimiento y la eficiencia de las cirugías realizadas durante el proceso de radicación.',
        icon: SquareActivity,
        roles: ['1','3','6','14','15']
    },
    {
        id: 'demanda-inducida',
        title: 'Demanda Inducida',
        description: 'Genera reportes de demanda inducida para evaluar y monitorear las llamadas y gestiones realizadas con los pacientes.',
        icon: Phone,
        roles: ['1','19','20','21']
    },
    {
        id: 'assistents',
        title: 'Gestion Servicios Radicados',
        description: 'Genera reportes de gestión de servicios radicados para evaluar el rendimiento y la eficiencia de los servicios gestionados durante el proceso de radicación.',
        icon: FaToolbox,
        roles: ['1','3','6','14','15']
    },
    {
        id: 'biometric-records',
        title: 'Registros Biométricos',
        description: 'Genera reportes de registros biométricos para evaluar el rendimiento y la eficiencia de los registros biométricos realizados durante el proceso de radicación.',
        icon: User,
        roles: ['1','2','6','18','20']
    },
    {
        id: 'helpdesk-tickets',
        title: 'Tickets Mesa de Ayuda',
        description: 'Genera reportes de tickets de mesa de ayuda para evaluar el rendimiento y la eficiencia de los tickets gestionados durante el proceso de radicación.',
        icon: MdSupportAgent,
        roles: ['1']
    },
    {
        id: 'network-devices',
        title: 'Dispositivos de Red',
        description: 'Genera reportes de dispositivos de red para evaluar el rendimiento y la eficiencia de los dispositivos de red utilizados durante el proceso de radicación.',
        icon: CpuChipIcon,
        roles: ['1']
    },
    {
        id: 'general-inventory',
        title: 'Inventario General',
        description: 'Genera reportes de inventario general para evaluar el estado, rendimiento y mantenimiento de los equipos y dispositivos utilizados en el proceso de radicación.',
        icon: Building,
        roles: ['1']
    },
    {
        id: 'tv',
        title: 'TV',
        description: 'Genera reportes de TV para evaluar el rendimiento y la eficiencia de los televisores utilizados durante el proceso de radicación.',
        icon: Tv,
        roles: ['1']
    },
    {
        id: 'phones',
        title: 'Teléfonos',
        description: 'Genera reportes de teléfonos para evaluar el rendimiento y la eficiencia de los teléfonos utilizados durante el proceso de radicación.',
        icon: Smartphone,
        roles: ['1']
    }
]