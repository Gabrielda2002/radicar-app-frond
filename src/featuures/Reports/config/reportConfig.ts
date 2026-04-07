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
        description: 'Analiza el rendimiento y la eficiencia del proceso de radicación de servicios médicos.',
        icon: FaToolbox,
        roles: ['1', '3', '6', '14', '15']
    },
    {
        id: 'Equipos', 
        title: 'Equipos',
        description: 'Evalúa el estado, rendimiento y mantenimiento de los equipos tecnológicos de la empresa.',
        icon: Computer,
        roles: ['1']
    },
    {
        id: 'break',
        title: 'Pausas Activas',
        description: 'Monitorea y analiza las pausas activas realizadas por los colaboradores.',
        icon: Dumbbell,
        roles: ['1', '2', '6']
    },
    {
        id: 'surgeries',
        title: 'Cirugías',
        description: 'Evalúa el rendimiento y la gestión de procedimientos quirúrgicos radicados.',
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
        title: 'Gestión Servicios Radicados',
        description: 'Reporta la gestión de servicios médicos radicados por los auxiliares de radicación.',
        icon: FaToolbox,
        roles: ['1','3','6','14','15']
    },
    {
        id: 'biometric-records',
        title: 'Registros Biométricos',
        description: 'Genera reportes de las entradas y salidas de los colaboradores registrados en el sistema.',
        icon: User,
        roles: ['1','2','6','18','20']
    },
    {
        id: 'helpdesk-tickets',
        title: 'Tickets Mesa de Ayuda',
        description: 'Evalúa el rendimiento y la eficiencia en la gestión de tickets de soporte técnico.',
        icon: MdSupportAgent,
        roles: ['1']
    },
    {
        id: 'network-devices',
        title: 'Dispositivos de Red',
        description: 'Evalúa el estado, rendimiento y mantenimiento de los dispositivos de red inventariados.',
        icon: CpuChipIcon,
        roles: ['1']
    },
    {
        id: 'general-inventory',
        title: 'Inventario General',
        description: 'Consolida el estado, ubicación y mantenimiento de todos los activos inventariados.',
        icon: Building,
        roles: ['1']
    },
    {
        id: 'tv',
        title: 'TV',
        description: 'Evalúa el estado y ubicación de los televisores inventariados en las instalaciones.',
        icon: Tv,
        roles: ['1']
    },
    {
        id: 'phones',
        title: 'Teléfonos',
        description: 'Evalúa el estado y asignación de los teléfonos corporativos inventariados.',
        icon: Smartphone,
        roles: ['1']
    }
]