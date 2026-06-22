import { IconType } from 'react-icons';
import user1 from '/assets/user1.svg';
import user from '/assets/user.svg';
import user2 from '/assets/user2.svg';
import report from '/assets/report.svg';

interface userManagement {
    id: string;
    title: string;
    description: string;
    icon: string | IconType;
    actionLabel?: string
    path: string;
    roles?: number[];
}

export const USER_CARD: userManagement[] = [
    {
        id: 'profile',
        title: 'Mi Perfil',
        description: 'Datos personales y configuración de tu cuenta.',
        icon: user,
        actionLabel: 'Gestionar',
        path: '/Perfil',
        roles: [1]
    },
    {
        id: 'users',
        title: 'Usuarios',
        description: 'Datos personales y configuración de tu cuenta.',
        icon: user1,
        path: '/Usuarios',
        actionLabel: 'Gestionar',
        roles: [1,18]
    },
    {
        id: 'areas',
        title: 'Areas',
        description: 'Departamentos y unidades organizativas.',            
        icon: report,
        actionLabel: 'Gestionar',
        path: '/area',
        roles: [1]
    },
    {
        id: 'positions',
        title: 'Cargos',
        description: 'Puestos, jerarquías y funciones laborales.',
        icon: report,
        actionLabel: 'Gestionar',
        path: '/cargo',
        roles: [1]
    },
    {
        id: 'register-users',
        title: 'Registrar Usuarios',
        description: 'Alta de nuevos colaboradores en el sistema.',
        icon: user2,
        actionLabel: 'Gestionar',
        path: '/registrar-usuarios',
        roles: [1,18]
    }
]