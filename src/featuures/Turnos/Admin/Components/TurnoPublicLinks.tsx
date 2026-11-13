import { Copy, Link2, MonitorSmartphone } from "lucide-react";
import { toast } from "react-toastify";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";

interface TurnoPublicLinksProps {
  slug: string;
}

const TurnoPublicLinks = ({ slug }: TurnoPublicLinksProps) => {
  const origin = window.location.origin;
  const links = [
    {
      key: "request",
      label: "Solicitud de turno",
      description: "Enlace público para que el paciente solicite su turno.",
      url: `${origin}/turnos/sede/${slug}`,
    },
    {
      key: "tv",
      label: "Pantalla de sala",
      description: "Enlace público para mostrar los turnos llamados.",
      url: `${origin}/turnos/tv/${slug}`,
    },
  ];

  const handleCopy = async (label: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(`Enlace de ${label.toLowerCase()} copiado`);
    } catch {
      toast.warning(
        "No se pudo copiar automáticamente. Selecciona el enlace y cópialo manualmente.",
      );
    }
  };

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 p-4 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <Link2
          className="h-5 w-5 text-color dark:text-teal-300"
          aria-hidden="true"
        />
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Enlaces públicos de la sede
        </h3>
      </div>
      {links.map((link) => (
        <div key={link.key} className="space-y-2">
          <p className="text-sm font-medium text-slate-700 dark:text-gray-200">
            {link.label}
          </p>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            {link.description}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <Input
              name={`public-link-${link.key}`}
              aria-label={`Enlace de ${link.label.toLowerCase()}`}
              readOnly
              value={link.url}
              className="text-sm"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => void handleCopy(link.label, link.url)}
              icon={<Copy className="h-4 w-4" aria-hidden="true" />}
              className="shrink-0"
            >
              Copiar
            </Button>
          </div>
        </div>
      ))}
      <p className="flex items-start gap-2 text-xs text-slate-500 dark:text-gray-400">
        <MonitorSmartphone
          className="mt-0.5 h-4 w-4 shrink-0"
          aria-hidden="true"
        />
        Los enlaces cambian si editas el slug de la sede.
      </p>
    </section>
  );
};

export default TurnoPublicLinks;
