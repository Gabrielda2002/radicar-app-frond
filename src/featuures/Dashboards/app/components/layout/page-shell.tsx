import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@dash/lib/utils";
import { DASHBOARD_NAV } from "@/featuures/Dashboards/utils/tabsConfig";

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
export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col py-2">
      <nav className="mb-5 flex flex-wrap justify-center gap-1.5 border-b border-gray-200 dark:border-gray-700">
        {DASHBOARD_NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={`/paneles${to}`}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "border-b-2 border-[#049AE7] text-[#00776f] dark:text-[#049AE7]"
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <main className="min-w-0 flex-1 space-y-5">{children}</main>
    </div>
  );
}
