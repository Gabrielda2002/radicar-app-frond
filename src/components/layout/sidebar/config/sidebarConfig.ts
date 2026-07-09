import { SidebarSection } from '../types/sidebar.types';

// Icons
import { FaFolderOpen, FaRegFolder } from 'react-icons/fa';
import { MdOutlineInventory, MdHomeRepairService  } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoMagnetOutline } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { Box, ClipboardList, GitPullRequestArrow, HandCoins, LayoutDashboard, Mailbox, User, UsersRound } from 'lucide-react';
import { BiMailSend } from 'react-icons/bi';
import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineAudit } from "react-icons/ai";

export const SIDEBAR_CONFIG: SidebarSection[] = [
  // Inicio
  {
    id: 'home',
    items: [
      {
        id: 'home',
        title: 'Inicio',
        icon: IoMdHome,
        path: '/home',
        type: 'item'
      }
    ]
  },

  // Servicios
  {
    id: 'services',
    title: 'Servicios',
    items: [
      {
        id: 'quality',
        title: 'Gestión de Calidad',
        icon: FaFolderOpen,
        type: 'category',
        children: [
          {
            id: 'quality-ns',
            title: 'Documentación y Servicios',
            icon: FaRegFolder,
            path: '/gestion-calidad',
            type: 'subcategory'
          }
        ]
      },
      {
        id: 'inventory',
        title: 'Gestión de Inventarios',
        icon: MdOutlineInventory,
        type: 'category',
        roles: [1, 6, 4, 2, 17],
        children: [
          {
            id: 'inventory-general',
            title: 'Inventario General',
            icon: Box,
            path: '/inventario',
            type: 'subcategory'
          }
        ]
      },
      {
        id: 'recovery-letter',
        title: 'Gestión Carta Recobro',
        icon: HandCoins,
        type: 'category',
        roles: [1, 10, 6, 2],
        children: [
          {
            id: 'recovery-request',
            title: 'Solicitar',
            icon: GitPullRequestArrow,
            path: '/carta-recobro',
            type: 'subcategory'
          },
          {
            id: 'recovery-audit',
            title: 'Auditoria',
            icon: AiOutlineAudit,
            path: '/auditoria',
            type: 'subcategory',
            roles: [1, 6, 2]
          }
        ]
      },
      {
        id: 'service-management',
        title: 'Gestión de Servicios',
        icon: MdHomeRepairService,
        type: 'category',
        roles: [10, 3, 1, 15, 6, 2],
        children: [
          {
            id: 'radicator',
            title: 'Radicador',
            icon: ClipboardList,
            path: '/tabla-radicacion',
            type: 'subcategory',
            roles: [10, 3, 1, 15, 6, 2]
          },
          {
            id: 'FaUserDoctor',
            title: 'Cirugía',
            icon: FaUserDoctor,
            path: '/tabla-cirugias',
            type: 'subcategory',
            roles: [15, 1, 3, 2]
          },
          {
            id: 'audit',
            title: 'Auditoría',
            icon: AiOutlineAudit,
            path: '/tabla-auditoria',
            type: 'subcategory',
            roles: [3, 1, 2]
          }
        ]
      },
      {
        id: 'human-resources',
        title: 'Gestión Humana',
        icon: User,
        type: 'category',
        roles: [1, 18, 6, 20, 2],
        children: [
          {
            id: 'biometric-users',
            title: 'Biométricos Usuarios',
            icon: UsersRound,
            path: '/create-UsersRound',
            type: 'subcategory',
            roles: [1, 18, 2]
          },
          {
            id: 'permission-requests-management',
            title: 'Solicitudes de Permisos',
            icon: BiMailSend,
            path: '/permissions',
            type: 'subcategory',
            roles: [6, 1, 20, 18, 2] 
          },
          {
            id: 'configuration-vacations',
            title: 'Configuración Vacaciones',
            icon: UsersRound,
            path: '/configuration-vacations',
            type: 'subcategory',
            roles: [1, 6, 20, 18, 2]
          }
        ]
      },
      {
        id: 'demand-induced',
        title: 'Gestión demanda inducida',
        icon: User ,
        type: 'category',
        roles: [1, 19, 20, 21, 2],
        children: [
          {
            id: 'demand-induced-management',
            title: 'Demanda Inducida',
            icon: IoMagnetOutline,
            path: '/demanda/inducida',
            type: 'subcategory'
          }
        ]
      },
    ]
  },
{
    id: 'reports',
    title: 'Reportes',
    roles: [6, 2, 14, 3, 15, 1, 18, 19, 20, 21],
    items: [
      {
        id: 'report-management',
        title: 'Gestión de Reportes',
        icon: HiOutlineDocumentReport,
        type: 'section',
        path: '/reports',
      }
    ]
  },

  // Mesa de Ayuda
  {
    id: 'help-desk',
    title: 'Mesa de Ayuda',
    items: [
      {
        id: 'ticket-management',
        title: 'Mesa de Ayuda',
        icon: Mailbox,
        type: 'section',
        path: '/help-desk'
      }
    ]
  },

  // Dashboards
  {
    id: 'dashboards',
    title: 'Dashboards',
    roles: [1],
    items: [
      {
        id: 'dashboards-category',
        title: 'Paneles BI',
        icon: LayoutDashboard,
        type: 'category',
        roles: [1],
        children: [
          {
            id: 'dashboards-resumen',
            title: 'Resumen de Citas',
            icon: LayoutDashboard,
            path: '/paneles/resumen',
            type: 'subcategory',
            roles: [1]
          },
          {
            id: 'dashboards-ejecucion',
            title: 'Ejecución vs Nota Técnica',
            icon: LayoutDashboard,
            path: '/paneles/ejecucion-nt',
            type: 'subcategory',
            roles: [1]
          },
          {
            id: 'dashboards-financiero',
            title: 'Análisis Financiero',
            icon: LayoutDashboard,
            path: '/paneles/financiero',
            type: 'subcategory',
            roles: [1]
          },
          {
            id: 'dashboards-calidad',
            title: 'Calidad y Oportunidad',
            icon: LayoutDashboard,
            path: '/paneles/calidad',
            type: 'subcategory',
            roles: [1]
          },
          {
            id: 'dashboards-pym',
            title: 'PyM / RIAS',
            icon: LayoutDashboard,
            path: '/paneles/pym',
            type: 'subcategory',
            roles: [1]
          }
        ]
      }
    ]
  },

  // Administrador
  {
    id: 'admin',
    title: 'Administrador',
    roles: [1,18],
    items: [
      {
        id: 'UsersRound-management',
        title: 'Gestión Usuarios',
        icon: User ,
        type: 'section',
        roles: [1,18],
        path: '/admin/UsersRound-options'
      }
    ]
  }
];