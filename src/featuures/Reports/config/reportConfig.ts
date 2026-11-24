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
        description: 'Analiza la radicación de servicios médicos.',
        icon: FaToolbox,
        roles: ['1', '3', '6', '14', '15']
    },
    {
        id: 'Equipos', 
        title: 'Equipos',
        description: 'Evalúa el estado de los equipos tecnológicos.',
        icon: Computer,
        roles: ['1']
    },
    {
        id: 'break',
        title: 'Pausas Activas',
        description: 'Monitorea las pausas activas del personal.',
        icon: Dumbbell,
        roles: ['1', '2', '6']
    },
    {
        id: 'surgeries',
        title: 'Cirugías',
        description: 'Evalúa la gestión de cirugías radicadas.',
        icon: SquareActivity,
        roles: ['1','3','6','14','15']
    },
    {
        id: 'demanda-inducida',
        title: 'Demanda Inducida',
        description: 'Consulta llamadas y gestiones con pacientes.',
        icon: Phone,
        roles: ['1','19','20','21']
    },
    {
        id: 'assistents',
        title: 'Gestión Servicios Radicados',
        description: 'Consulta la gestión de servicios radicados.',
        icon: FaToolbox,
        roles: ['1','3','6','14','15']
    },
    {
        id: 'biometric-records',
        title: 'Registros Biométricos',
        description: 'Consulta entradas y salidas del personal.',
        icon: User,
        roles: ['1','2','6','18','20']
    },
    {
        id: 'helpdesk-tickets',
        title: 'Tickets Mesa de Ayuda',
        description: 'Evalúa la gestión de tickets de soporte.',
        icon: MdSupportAgent,
        roles: ['1']
    },
    {
        id: 'network-devices',
        title: 'Dispositivos de Red',
        description: 'Evalúa el estado de los dispositivos de red.',
        icon: CpuChipIcon,
        roles: ['1']
    },
    {
        id: 'general-inventory',
        title: 'Inventario General',
        description: 'Consolida el estado de los activos inventariados.',
        icon: Building,
        roles: ['1']
    },
    {
        id: 'tv',
        title: 'TV',
        description: 'Evalúa el estado de los televisores.',
        icon: Tv,
        roles: ['1']
    },
    {
        id: 'phones',
        title: 'Teléfonos',
        description: 'Evalúa el estado de los teléfonos corporativos.',
        icon: Smartphone,
        roles: ['1']
    },
    {
        id: 'pqrsdf',
        title: 'PQRSDF',
        description: 'Consulta las PQRSDF radicadas.',
        icon: FaToolbox,
        roles: ['1','3','6','11']
    },
    {
        id: 'surveys',
        title: "Encuesta Satisfacción",
        description: "Consulta encuestas de satisfacción.",
        icon: FaToolbox,
        roles: ['1','3','6','11']
    }
]