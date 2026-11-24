import { useEffect, useState } from "react";
import { Clock3, PhoneCall, RefreshCw, UserRound } from "lucide-react";
import { useAuth } from "@/context/authContext";
import Button from "@/components/common/Ui/Button";
import Input from "@/components/common/Ui/Input";
import Select from "@/components/common/Ui/Select";
import { useStoreTurnoAtencion } from "../store/useStoreTurnoAtencion";
import type { ITurnoAtencionActiveTurn } from "@/models/ITurnoAtencion";
import TurnoAtencionSessionSetup from "../Components/TurnoAtencionSessionSetup";

const ALLOWED_ROLES = [1, 10];

const TurnoAtencionPage = () => {
  const { rol } = useAuth();
  const {
    data,
    options,
    error,
    isLoading,
    optionsLoading,
    optionsError,
    isMutating,
    loadOptions,
    loadState,
    closeSession,
    performAction,
  } = useStoreTurnoAtencion();
  const [transferServiceId, setTransferServiceId] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const authorized = ALLOWED_ROLES.includes(Number(rol));
  const activeModule = options.modules.find(
    (module) => module.id === data?.session?.modulo.id,
  );
  const transferOptions = (
    options.servicesByHeadquarter.find(
      (group) => group.headquarterId === activeModule?.headquarterId,
    )?.services ?? []
  ).filter((service) => service.id !== data?.activeTurn?.service.id);

  useEffect(() => {
    if (!authorized) return;
    void Promise.all([loadOptions(), loadState()]);
  }, [authorized, loadOptions, loadState]);

  const handleAction = async (
    action: Parameters<typeof performAction>[0]["action"],
    notes?: string,
    newServiceId?: number,
  ) => {
    if (
      action === "TRANSFERIR" &&
      !transferOptions.some((service) => service.id === newServiceId)
    )
      return;
    const result = await performAction({ action, notes, newServiceId });
    if (result.ok) setTransferServiceId("");
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
        <p
          role="status"
          className="text-sm font-semibold text-slate-600 dark:text-gray-300"
        >
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
          isLoading={isLoading || optionsLoading}
          disabled={isMutating}
          icon={<RefreshCw className="h-4 w-4" />}
          className="gap-2 rounded-lg border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Actualizar
        </Button>
      </header>

      {(error || optionsError) && (
        <div
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
        >
          {error || optionsError}
          <Button
            type="button"
            variant="outline"
            disabled={isMutating || isLoading || optionsLoading}
            onClick={() => void Promise.all([loadOptions(), loadState()])}
          >
            Reintentar consulta
          </Button>
        </div>
      )}

      {optionsLoading ? (
        <p role="status">Cargando módulos y servicios…</p>
      ) : null}
      {!data?.hasActiveSession ? (
        <TurnoAtencionSessionSetup />
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
              <p className="mt-1 text-sm">
                {activeModule
                  ? `Sede: ${activeModule.headquarterName}`
                  : "Consulta las opciones para conocer la sede del módulo."}
              </p>
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
              isMutating={
                isMutating ||
                isLoading ||
                optionsLoading ||
                Boolean(optionsError)
              }
              cancelReason={cancelReason}
              setCancelReason={setCancelReason}
              transferServiceId={
                transferOptions.some(
                  (service) => service.id === Number(transferServiceId),
                )
                  ? transferServiceId
                  : ""
              }
              setTransferServiceId={setTransferServiceId}
              transferOptions={transferOptions}
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
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Próximos turnos
                </h2>
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
            {transferOptions.length === 0 ? (
              <p role="status" className="mb-2 text-sm">
                No hay otros servicios habilitados en esta sede para transferir.
              </p>
            ) : null}
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
                disabled={
                  isMutating ||
                  !transferOptions.some(
                    (service) => service.id === Number(transferServiceId),
                  )
                }
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
