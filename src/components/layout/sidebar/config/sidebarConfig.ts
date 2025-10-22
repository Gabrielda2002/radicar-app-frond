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
import user2 from '/assets/user2.svg';
import user1 from '/assets/user1.svg';
import audit from '/assets/audit.svg';
import table from '/assets/table.svg';
import report from '/assets/report.svg';
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
            title: 'Norte de Santander',
            icon: FaRegFolder,
            path: '/SistemGestionCalidad',
            type: 'subcategory'
          }
        ]
      },
      {
        id: 'inventory',
        title: 'Gestión de Inventarios',
        icon: MdOutlineInventory,
        type: 'category',
        roles: [1, 6, 4],
        children: [
          {
            id: 'inventory-general',
            title: 'Inventario General',
            icon: Box,
            path: '/SistemaInventario',
            type: 'subcategory'
          }
        ]
      },
      {
        id: 'recovery-letter',
        title: 'Gestión Carta Recobro',
        icon: recobro,
        type: 'category',
        roles: [1, 10, 6],
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
            roles: [1, 6]
          }
        ]
      },
      {
        id: 'service-management',
        title: 'Gestión de Servicios',
        icon: services,
        type: 'category',
        roles: [10, 3, 1, 15, 6],
        children: [
          {
            id: 'radicator',
            title: 'Radicador',
            icon: taskList,
            path: '/tabla-radicacion',
            type: 'subcategory',
            roles: [10, 3, 1, 15, 6]
          },
          {
            id: 'surgery',
            title: 'Cirugía',
            icon: surgery,
            path: '/tabla-cirugias',
            type: 'subcategory',
            roles: [15, 1]
          },
          {
            id: 'audit',
            title: 'Auditoría',
            icon: audit,
            path: '/tabla-auditoria',
            type: 'subcategory',
            roles: [3, 1]
          }
        ]
      },
      {
        id: 'human-resources',
        title: 'Gestión Humana',
        icon: userMain,
        type: 'category',
        roles: [1, 18],
        children: [
          {
            id: 'biometric-users',
            title: 'Biométricos Usuarios',
            icon: user,
            path: '/RegistroUsuarios',
            type: 'subcategory'
          }
        ]
      },
      {
        id: 'demand-induced',
        title: 'Gestión demanda inducida',
        icon: userMain,
        type: 'category',
        roles: [1, 19, 20, 21],
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
      {
        id: 'permission-requests',
        title: 'Solicitudes de Permisos',
        icon: BiMailSend,
        type: 'category',
        children: [
          {
            id: 'permission-requests-management',
            title: 'Solicitudes de Permisos',
            icon: auditoria,
            path: '/permissions',
            type: 'subcategory'
          }
        ]
      }
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
        type: 'category',
        children: [
          {
            id: 'modal-reports',
            title: 'Modal de reportes',
            icon: report,
            type: 'subcategory',
            action: 'openReportsModal'
          }
        ]
      }
    ]
  },

  // Mesa de Ayuda
  {
    id: 'help-desk',
    title: 'Mesa de Ayuda',
    roles: [1, 17],
    items: [
      {
        id: 'ticket-management',
        title: 'Gestión de Tickets',
        icon: ticket,
        path: '/GestionTickets',
        type: 'item'
      }
    ]
  },

  // Administrador
  {
    id: 'admin',
    title: 'Administrador',
    roles: [1],
    items: [
      {
        id: 'radication-tables',
        title: 'Tablas Radicación',
        icon: table,
        type: 'category',
        children: [
          {
            id: 'cups-table',
            title: 'Cups',
            icon: report,
            path: '/tabla-cups',
            type: 'subcategory'
          },
          {
            id: 'patients-table',
            title: 'Pacientes',
            icon: report,
            path: '/tabla-pacientes',
            type: 'subcategory'
          },
          {
            id: 'diagnosis-table',
            title: 'Diagnostico',
            icon: report,
            path: '/tabla-diagnostico',
            type: 'subcategory'
          },
          {
            id: 'municipalities-table',
            title: 'Municipios',
            icon: report,
            path: '/tabla-municipios',
            type: 'subcategory'
          },
          {
            id: 'agreements-table',
            title: 'Convenios',
            icon: report,
            path: '/tabla-convenios',
            type: 'subcategory'
          },
          {
            id: 'document-type-table',
            title: 'Tipo Documento',
            icon: report,
            path: '/tabla-tipo-documento',
            type: 'subcategory'
          },
          {
            id: 'primary-ips-table',
            title: 'IPS Primaria',
            icon: report,
            path: '/tabla-ips-primaria',
            type: 'subcategory'
          },
          {
            id: 'radication-place-table',
            title: 'Lugar Radicación',
            icon: report,
            path: '/tabla-lugar-radicacion',
            type: 'subcategory'
          },
          {
            id: 'sender-ips-table',
            title: 'IPS Remitente',
            icon: report,
            path: '/tabla-ips-remite',
            type: 'subcategory'
          },
          {
            id: 'specialty-table',
            title: 'Especialidad',
            icon: report,
            path: '/tabla-especialidad',
            type: 'subcategory'
          },
          {
            id: 'service-type-table',
            title: 'Tipo Servicio',
            icon: report,
            path: '/tabla-tipo-servicio',
            type: 'subcategory'
          }
        ]
      },
      {
        id: 'user-management',
        title: 'Gestión Usuarios',
        icon: userMain,
        type: 'category',
        children: [
          {
            id: 'profile',
            title: 'Mi Perfil',
            icon: user,
            path: '/Perfil',
            type: 'subcategory'
          },
          {
            id: 'users',
            title: 'Usuarios',
            icon: user1,
            path: '/Usuarios',
            type: 'subcategory'
          },
          {
            id: 'areas',
            title: 'Areas',
            icon: report,
            path: '/Area',
            type: 'subcategory'
          },
          {
            id: 'positions',
            title: 'Cargos',
            icon: report,
            path: '/cargo',
            type: 'subcategory'
          },
          {
            id: 'register-users',
            title: 'Registrar Usuarios',
            icon: user2,
            path: '/registrar-usuarios',
            type: 'subcategory'
          }
        ]
      }
    ]
  }
];