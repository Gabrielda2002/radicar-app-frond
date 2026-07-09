import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { DASHBOARD_NAV } from "./sidebar";
import { cn } from "@dash/lib/utils";

interface PageShellProps {
  title: string;
  badge?: string;
  badgeVariant?:
    | "neutral"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "primary";
  children: ReactNode;
}

/**
 * Navegación (tabs) centrada de los 5 paneles + contenido. No renderiza título
 * de sección (la pestaña activa ya lo indica) ni sidebar/topbar/footer: esos
 * los aporta el layout de radicar.
 */
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <nav className="mb-4 flex flex-wrap justify-center gap-1 border-b border-outline-variant">
        {DASHBOARD_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={`/paneles${to}`}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-t-lg px-4 py-2 text-label-md transition-colors",
                isActive
                  ? "border-b-2 border-corporate-turquoise text-corporate-navy dark:text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low",
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <main className="min-w-0 flex-1 space-y-gutter">{children}</main>
    </div>
  );
}
