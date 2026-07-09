import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  Wallet,
  ShieldCheck,
  HeartPulse,
  Download,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@dash/components/ui/button';
import { cn } from '@dash/lib/utils';

export const DASHBOARD_NAV = [
  { to: '/resumen', label: 'Resumen de Citas', icon: LayoutDashboard },
  { to: '/ejecucion-nt', label: 'Ejecución vs Nota Técnica', icon: Activity },
  { to: '/financiero', label: 'Análisis Financiero', icon: Wallet },
  { to: '/calidad', label: 'Calidad y Oportunidad', icon: ShieldCheck },
  { to: '/pym', label: 'PyM / RIAS', icon: HeartPulse },
] as const;

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col space-y-2 border-r border-outline-variant bg-card py-6">
      <div className="mb-8 px-6">
        <h1 className="text-[18px] font-black text-corporate-navy">NORDVITAL IPS</h1>
        <p className="text-label-md text-on-surface-variant">Executive BI Suite</p>
      </div>
      <nav className="flex-1 space-y-1">
        {DASHBOARD_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'mx-2 flex items-center gap-3 rounded-lg px-4 py-3 text-label-md transition-colors',
                isActive
                  ? 'scale-95 bg-primary-container text-white'
                  : 'text-on-surface-variant hover:bg-surface-container-low',
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto space-y-4 px-4">
        <Button variant="default" size="default" className="w-full">
          <Download className="h-4 w-4" />
          Exportar Reporte
        </Button>
        <div className="space-y-1 border-t border-outline-variant pt-4">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:text-corporate-navy"
          >
            <Settings className="h-4 w-4" />
            Configuración
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:text-corporate-navy"
          >
            <HelpCircle className="h-4 w-4" />
            Ayuda
          </a>
        </div>
      </div>
    </aside>
  );
}
