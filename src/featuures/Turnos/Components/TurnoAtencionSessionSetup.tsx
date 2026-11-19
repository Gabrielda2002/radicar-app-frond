import { useState } from "react";
import { ClipboardCheck, Clock3 } from "lucide-react";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useStoreTurnoAtencion } from "../store/useStoreTurnoAtencion";

const TurnoAtencionSessionSetup = () => {
  const {
    data,
    options,
    optionsLoading,
    optionsError,
    isLoading,
    isMutating,
    startSession,
  } = useStoreTurnoAtencion();
  const [moduleId, setModuleId] = useState("");
  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const selectedModule = options.modules.find(
    (module) => module.id === Number(moduleId),
  );
  const selectedServices =
    options.servicesByHeadquarter.find(
      (group) => group.headquarterId === selectedModule?.headquarterId,
    )?.services ?? [];
  const validServiceIds = serviceIds.filter((id) =>
    selectedServices.some((service) => service.id === id),
  );

  const changeModule = (value: string) => {
    const module = options.modules.find((item) => item.id === Number(value));
    const services =
      options.servicesByHeadquarter.find(
        (group) => group.headquarterId === module?.headquarterId,
      )?.services ?? [];
    setModuleId(value);
    setServiceIds((ids) =>
      ids.filter((id) => services.some((service) => service.id === id)),
    );
  };

  const toggleService = (id: number) => {
    setServiceIds((selected) =>
      selected.includes(id)
        ? selected.filter((serviceId) => serviceId !== id)
        : [...selected, id],
    );
  };

  const handleStart = async () => {
    if (!selectedModule?.isAvailable || !validServiceIds.length || optionsError)
      return;
    const result = await startSession(Number(moduleId), validServiceIds);
    if (result.ok) setServiceIds([]);
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-xl bg-teal-50 p-3 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Iniciar sesión
            </h2>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Selecciona una ventanilla y los servicios que atenderás.
            </p>
          </div>
        </div>
        <label
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200"
          htmlFor="turno-module"
        >
          Módulo de atención
        </label>
        <Select
          id="turno-module"
          aria-label="Módulo de atención"
          options={options.modules.map((module) => ({
            value: module.id,
            label: `${module.headquarterName} · ${module.code} — ${module.name}${module.isAvailable ? "" : " (Ocupado)"}`,
            disabled: !module.isAvailable,
          }))}
          value={moduleId}
          onChange={(event) => changeModule(event.target.value)}
          disabled={optionsLoading || isMutating || Boolean(optionsError)}
          placeholder="Selecciona un módulo disponible"
          selectSize="lg"
          className="mb-5 rounded-lg border-slate-300 text-sm text-slate-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {selectedModule ? (
          <p className="mb-4 text-sm">Sede: {selectedModule.headquarterName}</p>
        ) : null}
        <fieldset
          className="space-y-2"
          disabled={isMutating || optionsLoading || Boolean(optionsError)}
        >
          <legend className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-200">
            Servicios de atención
          </legend>
          {!optionsLoading && !optionsError && selectedServices.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-gray-400">
              {selectedModule
                ? "Esta sede no tiene servicios habilitados. Configura al menos uno antes de iniciar atención."
                : "Selecciona un módulo para consultar los servicios de su sede."}
            </p>
          ) : null}
          {selectedServices.map((service) => (
            <label
              key={service.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 hover:border-teal-300 hover:bg-teal-50/40 dark:border-gray-700 dark:text-gray-200 dark:hover:border-teal-700 dark:hover:bg-gray-700 [&>div]:mb-0"
            >
              <Input
                type="checkbox"
                variant="checkbox"
                checked={serviceIds.includes(service.id)}
                onChange={() => toggleService(service.id)}
                className="h-4 w-4 accent-teal-700"
              />
              {service.name}
            </label>
          ))}
        </fieldset>
        <Button
          type="button"
          onClick={() => void handleStart()}
          disabled={
            !selectedModule?.isAvailable ||
            validServiceIds.length === 0 ||
            isMutating ||
            isLoading ||
            optionsLoading ||
            Boolean(optionsError) ||
            !data
          }
          fullWidth
          size="lg"
          className="mt-6"
        >
          {isMutating ? "Iniciando sesión…" : "Iniciar atención"}
        </Button>
      </div>
      <aside className="flex flex-col justify-between rounded-2xl bg-slate-900 p-6 text-white shadow-sm dark:bg-gray-950">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Antes de comenzar
          </p>
          <h2 className="mt-3 text-2xl font-bold">Una cola, un orden claro.</h2>
          <p className="mt-3 leading-7 text-slate-300">
            El sistema llamará automáticamente el siguiente turno. No se puede
            elegir una persona desde la lista.
          </p>
        </div>
        <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-slate-300">
          <Clock3 className="h-5 w-5 text-teal-300" />
          Prioritarios primero y orden de llegada dentro de cada prioridad.
        </div>
      </aside>
    </section>
  );
};

export default TurnoAtencionSessionSetup;
