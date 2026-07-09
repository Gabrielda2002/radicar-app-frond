import { ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto flex w-full items-center justify-between border-t border-outline-variant bg-surface-container-low px-gutter py-4">
      <p className="text-label-md text-on-surface-variant">
        Fuente: BD citas_db — NORDVITAL IPS. Comparativo Ejecución vs Nota Técnica vigente.
      </p>
      <div className="flex items-center gap-6">
        <a
          href="#"
          className="text-label-md text-on-surface-variant transition-colors hover:text-corporate-navy"
        >
          Privacidad
        </a>
        <a
          href="#"
          className="text-label-md text-on-surface-variant transition-colors hover:text-corporate-navy"
        >
          Términos de Uso
        </a>
        <div className="flex items-center gap-1 text-on-surface-variant">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="text-label-md">Sistema Auditado</span>
        </div>
      </div>
    </footer>
  );
}
