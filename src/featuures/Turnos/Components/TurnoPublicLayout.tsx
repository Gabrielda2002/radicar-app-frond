import type { ReactNode } from "react";
import { ShieldCheck, Ticket } from "lucide-react";
import logo from "@/assets/Layout/logo-navbar.png";

interface TurnoPublicLayoutProps {
  children: ReactNode;
}

const TurnoPublicLayout = ({ children }: TurnoPublicLayoutProps) => (
  <div className="min-h-dvh bg-[#f5f8f7] font-normal text-slate-800 dark:bg-gray-950 dark:text-gray-100">
    <header className="border-b border-slate-200/80 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between gap-4 mx-auto px-5 py-5 max-w-5xl sm:px-8">
        <img
          src={logo}
          alt="NordVital IPS"
          className="h-auto w-10 object-contain md:w-12"
        />
        <span className="flex items-center gap-2 text-xs font-medium text-color dark:text-teal-300">
          <Ticket className="h-4 w-4" aria-hidden="true" /> Turno digital
        </span>
      </div>
    </header>
    <main className="mx-auto px-4 py-8 max-w-2xl sm:px-6 sm:py-12">
      {children}
    </main>
    <footer className="flex items-center justify-center gap-2 px-5 pb-8 text-center text-xs leading-relaxed text-slate-500 dark:text-gray-400">
      <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
      Atención presencial · Sin inicio de sesión
    </footer>
  </div>
);

export default TurnoPublicLayout;
