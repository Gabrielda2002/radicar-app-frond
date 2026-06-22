import { SidebarSection } from '../types/sidebar.types';

// Icons
import { FaFolderOpen, FaRegFolder } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { IoMagnetOutline } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { Box } from 'lucide-react';
import { BiMailSend } from 'react-icons/bi';

// Images
import user from '/assets/user.svg';
import audit from '/assets/audit.svg';
import table from '/assets/table.svg';
import surgery from '/assets/surgery.svg';
import userMain from '/assets/userMain.svg';
import services from '/assets/services.svg';
import taskList from '/assets/task-list.svg';
import recobro from '/assets/recobro.svg';
import carta from '/assets/carta.svg';
import auditoria from '/assets/auditoria.svg';
import ticket from '/assets/ticket.svg';

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
        icon: recobro,
        type: 'category',
        roles: [1, 10, 6, 2],
        children: [
          {
            id: 'recovery-request',
            title: 'Solicitar',
            icon: carta,
            path: '/carta-recobro',
            type: 'subcategory'
          },
          {
            id: 'recovery-audit',
            title: 'Auditoria',
            icon: auditoria,
            path: '/auditoria',
            type: 'subcategory',
            roles: [1, 6, 2]
          }
        ]
      },
      {
        id: 'service-management',
        title: 'Gestión de Servicios',
        icon: services,
        type: 'category',
        roles: [10, 3, 1, 15, 6, 2],
        children: [
          {
            id: 'radicator',
            title: 'Radicador',
            icon: taskList,
            path: '/tabla-radicacion',
            type: 'subcategory',
            roles: [10, 3, 1, 15, 6, 2]
          },
          {
            id: 'surgery',
            title: 'Cirugía',
            icon: surgery,
            path: '/tabla-cirugias',
            type: 'subcategory',
            roles: [15, 1, 3, 2]
          },
          {
            id: 'audit',
            title: 'Auditoría',
            icon: audit,
            path: '/tabla-auditoria',
            type: 'subcategory',
            roles: [3, 1, 2]
          }
        ]
      },
      {
        id: 'human-resources',
        title: 'Gestión Humana',
        icon: userMain,
        type: 'category',
        roles: [1, 18, 6, 20, 2],
        children: [
          {
            id: 'biometric-users',
            title: 'Biométricos Usuarios',
            icon: user,
            path: '/create-user',
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
            icon: user,
            path: '/configuration-vacations',
            type: 'subcategory',
            roles: [1, 6, 20, 18, 2]
          }
        ]
      },
      {
        id: 'demand-induced',
        title: 'Gestión demanda inducida',
        icon: userMain,
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

  // Reportes
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
        icon: ticket,
        type: 'section',
        path: '/help-desk'
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
        id: 'radication-tables',
        title: 'Tablas Radicación',
        icon: table,
        type: 'section',
        roles: [1],
        path: '/admin/tablas-radicacion'
      },
      {
        id: 'user-management',
        title: 'Gestión Usuarios',
        icon: userMain,
        type: 'section',
        roles: [1,18],
        path: '/admin/user-options'
      }
    ]
  }
];