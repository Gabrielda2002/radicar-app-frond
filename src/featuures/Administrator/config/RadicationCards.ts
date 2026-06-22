import { IconType } from 'react-icons';
import report from '/assets/report.svg';

export interface RadicationCard {
  id: string;
  title: string;
  description: string;
  icon: string | IconType;
  actionLabel?: string
  path: string;
  roles?: number[];
}

export const RADICATION_CARD: RadicationCard[] = [
  {
    id: 'cups-table',
    title: 'Cups',
    description: 'Administra el catálogo de códigos CUPS del sistema',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-cups',
  },
  {
    id: 'patients-table',
    title: 'Pacientes',
    description: 'Consulta y administra la información de pacientes registrados',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-pacientes',
  },
  {
    id: 'diagnosis-table',
    title: 'Diagnostico',
    description: 'Administra el catálogo de diagnósticos del sistema',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-diagnostico',
  },
  {
    id: 'municipalities-table',
    title: 'Municipios',
    description: 'Administra el catálogo de municipios disponibles',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-municipios',
  },
  {
    id: 'agreements-table',
    title: 'Convenios',
    description: 'Administra los convenios registrados en el sistema',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-convenios',
  },
  {
    id: 'document-type-table',
    title: 'Tipo Documento',
    description: 'Administra los tipos de documento disponibles',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-tipo-documento',
  },
  {
    id: 'primary-ips-table',
    title: 'IPS Primaria',
    description: 'Administra el catálogo de IPS primarias',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-ips-primaria',
  },
  {
    id: 'radication-place-table',
    title: 'Lugar Radicación',
    description: 'Administra los lugares de radicación disponibles',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-lugar-radicacion',
  },
  {
    id: 'sender-ips-table',
    title: 'IPS Remitente',
    description: 'Administra el catálogo de IPS remitentes',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-ips-remite',
  },
  {
    id: 'specialty-table',
    title: 'Especialidad',
    description: 'Administra el catálogo de especialidades médicas',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-especialidad',
  },
  {
    id: 'service-type-table',
    title: 'Tipo Servicio',
    description: 'Administra los tipos de servicio disponibles',
    icon: report,
    actionLabel: 'Gestionar',
    path: '/tabla-tipo-servicio',
  },
]