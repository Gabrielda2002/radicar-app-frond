import { CardItem } from '@/components/common/Ui/Card';
import ticket from '/assets/search.svg';

export const HELP_DESK_CARDS: CardItem[] = [
  {
    id: 'ticket-management',
    title: 'Gestión de Tickets',
    description: 'Administra, prioriza y da seguimiento a todas las solicitudes de soporte',
    icon: ticket,
    actionLabel:"Gestionar",
    path: '/gestion-tickets',
    roles: [1, 17, 22, 23, 24, 25]
  },
  {
    id: 'my-tickets',
    title: 'Mis Tickets',
    description: 'Revisa el estado y seguimiento de tus solicitudes',
    icon: ticket,
    actionLabel:"Gestionar",
    path: '/mis-tickets',
  }
];