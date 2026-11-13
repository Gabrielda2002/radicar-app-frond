import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  Clock3,
  PhoneCall,
  RefreshCw,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useStoreTurnoAtencion } from "../store/useStoreTurnoAtencion";
import type { ITurnoAtencionActiveTurn } from "@/models/ITurnoAtencion";

const ALLOWED_ROLES = [1, 10];

const TurnoAtencionPage = () => {
  const { rol } = useAuth();
  const {
    data,
    options,
    error,
    isLoading,
    isMutating,
    loadOptions,
    loadState,
    startSession,
    closeSession,
    performAction,
  } = useStoreTurnoAtencion();
  const [moduleId, setModuleId] = useState("");
  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const [transferServiceId, setTransferServiceId] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const authorized = ALLOWED_ROLES.includes(Number(rol));

  useEffect(() => {
    if (!authorized) return;
    void Promise.all([loadOptions(), loadState()]);
  }, [authorized, loadOptions, loadState]);

  const toggleService = (id: number) => {
    setServiceIds((selected) =>
      selected.includes(id)
        ? selected.filter((serviceId) => serviceId !== id)
        : [...selected, id],
    );
  };

  const handleStart = async () => {
    const result = await startSession(Number(moduleId), serviceIds);
    if (result.ok) setServiceIds([]);
  };

  const handleAction = async (
    action: Parameters<typeof performAction>[0]["action"],
    notes?: string,
    newServiceId?: number,
  ) => {
    const result = await performAction({ action, notes, newServiceId });
    if (result.ok && action === "CANCELAR") setCancelReason("");
  };

  if (!authorized) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <p className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
          No tienes permisos para gestionar turnos.
        </p>
      </main>
    );
  }
  if (!data && isLoading) {
    return (
      <main className="mx-auto max-w-7xl p-8">
          <p role="status" className="text-sm font-semibold text-slate-600 dark:text-gray-300">
          Cargando tu sesión de atención…
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5 dark:border-gray-700">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
            Operación presencial
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Atención de turnos
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-300">
            Gestioná la cola de acuerdo con el orden de prioridad y llegada.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => void Promise.all([loadOptions(), loadState()])}
          variant="outline"
          isLoading={isLoading}
          icon={<RefreshCw className="h-4 w-4" />}
          className="gap-2 rounded-lg border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Actualizar
        </Button>
      </header>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
        >
          {error}
        </div>
      )}

      {!data?.hasActiveSession ? (
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
                  Seleccioná una ventanilla y los servicios que atenderás.
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
              onChange={(event) => setModuleId(event.target.value)}
              placeholder="Seleccioná un módulo disponible"
              selectSize="lg"
              className="mb-5 rounded-lg border-slate-300 text-sm text-slate-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <fieldset className="space-y-2">
              <legend className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-200">
                Servicios de atención
              </legend>
              {options.services.length === 0 && (
                <p className="text-sm text-slate-500 dark:text-gray-400">
                  No hay servicios activos disponibles.
                </p>
              )}
              {options.services.map((service) => (
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
              disabled={!moduleId || serviceIds.length === 0 || isMutating}
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
              <h2 className="mt-3 text-2xl font-bold">
                Una cola, un orden claro.
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                El sistema llamará automáticamente el siguiente turno. No se
                puede elegir una persona desde la lista.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-slate-300">
              <Clock3 className="h-5 w-5 text-teal-300" /> Prioridad y
              antigüedad determinan el orden.
            </div>
          </aside>
        </section>
      ) : (
        <>
          <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-teal-100 bg-teal-50/70 p-5 dark:border-teal-900 dark:bg-teal-950/40">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
                Sesión activa
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                {data.session?.modulo.code} · {data.session?.modulo.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-gray-300">
                {data.session?.services
                  .map((service) => service.name)
                  .join(" · ")}
              </p>
            </div>
            <div className="text-right">
              <Button
                type="button"
                onClick={() => void closeSession()}
                disabled={isMutating || Boolean(data.activeTurn)}
                variant="outline"
                className="border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cerrar sesión
              </Button>
              {data.activeTurn && (
                <p className="mt-2 text-xs text-slate-500 dark:text-gray-400">
                  Resuelve el turno activo antes de cerrar.
                </p>
              )}
            </div>
          </section>

          {data.activeTurn ? (
            <ActiveTurnCard
              turn={data.activeTurn}
              isMutating={isMutating}
              cancelReason={cancelReason}
              setCancelReason={setCancelReason}
              transferServiceId={transferServiceId}
              setTransferServiceId={setTransferServiceId}
              transferOptions={options.services.filter(
                (service) => service.id !== data.activeTurn?.service.id,
              )}
              onAction={handleAction}
            />
          ) : (
            <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm font-semibold text-slate-500 dark:text-gray-400">
                No tenés un turno activo.
              </p>
              <Button
                type="button"
                onClick={() => void handleAction("LLAMAR")}
                disabled={isMutating}
                size="lg"
                className="mt-4"
                icon={<PhoneCall className="h-4 w-4" />}
              >
                {isMutating ? "Llamando…" : "Llamar siguiente"}
              </Button>
            </section>
          )}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-gray-700">
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">Próximos turnos</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                  {data.pendingQueueCount} en espera · solo consulta
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-gray-700 dark:text-gray-200">
                {data.pendingQueue.length}
              </span>
            </div>
            {data.pendingQueue.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-slate-500 dark:text-gray-400">
                No hay turnos pendientes para tus servicios.
              </p>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-gray-700">
                {data.pendingQueue.map((turn, index) => (
                  <div
                    key={`${turn.ticketCode}-${index}`}
                    className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_1.5fr_1.2fr_auto] sm:items-center"
                  >
                    <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                      {turn.ticketCode}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-gray-200">
                      <UserRound className="h-4 w-4 text-slate-400" />
                      {turn.patientName}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-gray-300">
                      {turn.serviceName}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-gray-400">
                      <Clock3 className="h-4 w-4" />
                      {turn.waitingMinutes} min{" "}
                      <b
                        className={
                          turn.priority === "PRIORITARIO"
                            ? "rounded-full bg-amber-100 px-2 py-1 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
                            : "rounded-full bg-slate-100 px-2 py-1 text-slate-600 dark:bg-gray-700 dark:text-gray-200"
                        }
                      >
                        {turn.priority === "PRIORITARIO"
                          ? "Prioritario"
                          : "General"}
                      </b>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
};

interface ActiveTurnCardProps {
  turn: ITurnoAtencionActiveTurn;
  isMutating: boolean;
  cancelReason: string;
  setCancelReason: (value: string) => void;
  transferServiceId: string;
  setTransferServiceId: (value: string) => void;
  transferOptions: { id: number; name: string }[];
  onAction: (
    action:
      | "LLAMAR"
      | "RELLAMAR"
      | "INICIAR"
      | "FINALIZAR"
      | "NO_ASISTIO"
      | "TRANSFERIR"
      | "CANCELAR",
    notes?: string,
    serviceId?: number,
  ) => Promise<void>;
}

const ActiveTurnCard = ({
  turn,
  isMutating,
  cancelReason,
  setCancelReason,
  transferServiceId,
  setTransferServiceId,
  transferOptions,
  onAction,
}: ActiveTurnCardProps) => {
  const isCalled = turn.status === "LLAMADO";
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5 dark:border-gray-700">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            {isCalled ? "Turno llamado" : "En atención"}
          </p>
          <h2 className="mt-2 font-mono text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {turn.ticketCode}
          </h2>
          <p className="mt-2 text-slate-700 dark:text-gray-200">
            {turn.patient.name} · {turn.service.name}
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
          {turn.priority === "PRIORITARIO" ? "Prioritario" : "General"}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {isCalled ? (
          <>
            <Button
              type="button"
              disabled={isMutating}
              onClick={() => void onAction("RELLAMAR")}
              variant="outline"
              size="sm"
              className="rounded-lg text-sm font-bold"
            >
              Rellamar
            </Button>
            <Button
              type="button"
              disabled={isMutating}
              onClick={() => void onAction("INICIAR")}
              variant="primary"
              size="sm"
              className="rounded-lg text-sm font-bold"
            >
              Atender
            </Button>
            <Button
              type="button"
              disabled={isMutating}
              onClick={() => void onAction("NO_ASISTIO")}
              variant="outline"
              size="sm"
              className="rounded-lg text-sm font-bold"
            >
              No asistió
            </Button>
          </>
        ) : (
          <Button
            type="button"
            disabled={isMutating}
            onClick={() => void onAction("FINALIZAR")}
            variant="primary"
            size="sm"
            className="rounded-lg text-sm font-bold"
          >
            Finalizar atención
          </Button>
        )}
      </div>
      <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 dark:border-gray-700 sm:grid-cols-2">
        {!isCalled && (
          <div>
            <label
              htmlFor="transfer-service"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200"
            >
              Transferir a otro servicio activo
            </label>
            <div className="flex gap-2">
              <Select
                id="transfer-service"
                aria-label="Servicio de destino"
                options={transferOptions.map((service) => ({
                  value: service.id,
                  label: service.name,
                }))}
                value={transferServiceId}
                onChange={(event) => setTransferServiceId(event.target.value)}
                placeholder="Seleccioná servicio"
                className="min-w-0 flex-1 rounded-lg border-slate-300 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <Button
                type="button"
                disabled={isMutating || !transferServiceId}
                onClick={() =>
                  void onAction(
                    "TRANSFERIR",
                    undefined,
                    Number(transferServiceId),
                  )
                }
                variant="outline"
                size="sm"
                className="rounded-lg text-sm font-bold"
              >
                Transferir
              </Button>
            </div>
          </div>
        )}
        <div>
          <label
            htmlFor="cancel-reason"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-200"
          >
            Motivo de cancelación
          </label>
          <div className="flex gap-2">
            <Input
              id="cancel-reason"
              value={cancelReason}
              onChange={(event) => setCancelReason(event.target.value)}
              maxLength={500}
              placeholder="Escribí el motivo"
              size="full"
              className="min-w-0 flex-1 rounded-lg border-slate-300 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <Button
              type="button"
              disabled={isMutating || !cancelReason.trim()}
              onClick={() => void onAction("CANCELAR", cancelReason.trim())}
              variant="danger"
              size="sm"
              className="rounded-lg text-sm font-bold"
            >
              Cancelar turno
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TurnoAtencionPage;
