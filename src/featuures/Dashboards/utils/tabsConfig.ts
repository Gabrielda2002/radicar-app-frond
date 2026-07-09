import { Activity, HeartPulse, LayoutDashboard, ShieldCheck, Wallet } from "lucide-react";

export const DASHBOARD_NAV = [
  { to: '/resumen', label: 'Resumen de Citas', icon: LayoutDashboard },
  { to: '/ejecucion-nt', label: 'Ejecución vs Nota Técnica', icon: Activity },
  { to: '/financiero', label: 'Análisis Financiero', icon: Wallet },
  { to: '/calidad', label: 'Calidad y Oportunidad', icon: ShieldCheck },
  { to: '/pym', label: 'PyM / RIAS', icon: HeartPulse },
] as const;