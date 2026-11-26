import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import clsx from "clsx";
import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  Plus,
  RefreshCw,
  Star,
  Volume2,
  VolumeX,
  WifiOff,
} from "lucide-react";
import Button from "@/components/common/Ui/Button";
import TurnoPublicLayout from "../Components/TurnoPublicLayout";
import TurnoNotice from "../Components/TurnoNotice";
import { useStoreTurnoTicket } from "../store/useStoreTurnoTicket";
import { useTurnoTicketLive } from "../hooks/useTurnoTicketLive";
import TurnoTicketDetails from "../Components/TurnoTicketDetails";

const TurnoTicketPage = () => {
  const { token = "" } = useParams();
  const { state } = useLocation();
  const {
    data,
    error,
    isLoading,
    isCancelling,
    cancelError,
    isSubmittingSurvey,
    surveyError,
    surveySuccess,
    load,
    cancel,
    submitSurvey,
    reset,
  } = useStoreTurnoTicket();

  const { isLiveConnected, isOutdated, soundEnabled, toggleSound } =
    useTurnoTicketLive(token);

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const ticket = data?.ticketToken === token ? data : null;
  const requestSlug = (state as { requestSlug?: unknown } | null)?.requestSlug;
  const sedeSlug =
    (typeof requestSlug === "string" && requestSlug.trim()) ||
    ticket?.headquarter.slug?.trim();
  const hasActiveActions =
    ticket?.status === "PENDIENTE" || ticket?.status === "LLAMADO";

  useEffect(() => {
    void load(token);
    return reset;
  }, [token, load, reset]);

  useEffect(() => {
    if (!isCancelDialogOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isCancelling) {
        setIsCancelDialogOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCancelDialogOpen, isCancelling]);

  const handleConfirmCancel = async () => {
    await cancel(token);
    setIsCancelDialogOpen(false);
  };

  const handleSubmitSurvey = async () => {
    if (rating < 1 || rating > 5 || isSubmittingSurvey) return;
    await submitSurvey(token, rating, comment);
  };

  return (
    <TurnoPublicLayout compact>
      <section
        className="overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800"
        aria-busy={isLoading}
      >
        <div className="space-y-3 p-4 sm:p-6">
          {!ticket ? <h1 className="text-xl font-semibold">Tu turno digital</h1> : null}
          {!isLiveConnected && isOutdated ? (
            <div
              role="status"
              className="flex items-center justify-between gap-3 p-3.5 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-xl dark:text-amber-200 dark:bg-amber-950/40 dark:border-amber-900/60"
            >
              <div className="flex items-center gap-2">
                <WifiOff
                  className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                  aria-hidden="true"
                />
                <span>
                  Conexión en vivo pausada. La información puede estar
                  desactualizada.
                </span>
              </div>
            </div>
          ) : null}

          {error ? <TurnoNotice message={error} /> : null}
          {cancelError ? <TurnoNotice message={cancelError} /> : null}

          {ticket ? (
            <>
              <TurnoTicketDetails ticket={ticket} />

              {(ticket.status === "LLAMADO" ||
                ticket.status === "EN_ATENCION") &&
              ticket.modulo ? (
                <div
                  role={ticket.status === "LLAMADO" ? "alert" : "status"}
                  aria-live={
                    ticket.status === "LLAMADO" ? "assertive" : "polite"
                  }
                  className={clsx(
                    "p-3 text-center rounded-xl transition-all",
                    ticket.status === "LLAMADO"
                      ? "text-emerald-950 bg-emerald-50 border-2 border-emerald-500 shadow-md ring-4 ring-emerald-500/10 dark:text-emerald-100 dark:bg-emerald-950/60 dark:border-emerald-400 dark:ring-emerald-400/20"
                      : "text-teal-900 bg-teal-50 border border-teal-100 dark:text-teal-200 dark:bg-teal-950/40 dark:border-teal-900",
                  )}
                >
                  <p
                    className={clsx(
                      "text-xs sm:text-sm font-semibold uppercase tracking-wider",
                      ticket.status === "LLAMADO"
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-teal-700 dark:text-teal-300",
                    )}
                  >
                    {ticket.status === "LLAMADO"
                      ? "¡Es tu turno! Dirígete a"
                      : "Te atienden en"}
                  </p>
                  <p className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
                    {ticket.modulo.name}
                  </p>
                  {ticket.status === "LLAMADO" && ticket.callCount > 1 ? (
                    <p className="mt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                      Llamado #{ticket.callCount}
                    </p>
                  ) : null}
                  {ticket.advisorName ? (
                    <p className="mt-1 text-xs text-slate-600 dark:text-gray-300">
                      Asesor: {ticket.advisorName}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {ticket.status === "FINALIZADO" ? (
                <div className="p-6 text-center border border-slate-200 rounded-2xl bg-slate-50 dark:bg-gray-800/60 dark:border-gray-700">
                  {ticket.hasSurvey || surveySuccess ? (
                    <div className="py-2 space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-950/60 dark:text-teal-300">
                        <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                        ¡Gracias por tu calificación!
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-gray-300">
                        Nos ayuda a mejorar nuestro servicio.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 text-left">
                      <div className="text-center">
                        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                          Califica tu atención
                        </h2>
                        <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
                          ¿Cómo calificarías el servicio recibido?
                        </p>
                      </div>

                      {surveyError ? (
                        <TurnoNotice message={surveyError} />
                      ) : null}

                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="flex items-center justify-center gap-1 sm:gap-2"
                          role="group"
                          aria-label="Calificación de 1 a 5 estrellas"
                        >
                          {[1, 2, 3, 4, 5].map((star) => {
                            const isFilled = (hoverRating || rating) >= star;
                            return (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onFocus={() => setHoverRating(star)}
                                onBlur={() => setHoverRating(0)}
                                disabled={isSubmittingSurvey}
                                aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
                                aria-pressed={rating === star}
                                className="p-1.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg disabled:opacity-50"
                              >
                                <Star
                                  className={clsx(
                                    "h-8 w-8 transition-colors",
                                    isFilled
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-slate-300 dark:text-gray-600",
                                  )}
                                  aria-hidden="true"
                                />
                              </button>
                            );
                          })}
                        </div>
                        <p className="h-4 text-xs font-medium text-slate-600 dark:text-gray-300">
                          {rating === 1 && "Muy insatisfecho"}
                          {rating === 2 && "Insatisfecho"}
                          {rating === 3 && "Regular"}
                          {rating === 4 && "Satisfecho"}
                          {rating === 5 && "Excelente"}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="survey-comment"
                          className="block text-xs font-medium text-slate-700 dark:text-gray-300"
                        >
                          Comentario (opcional)
                        </label>
                        <textarea
                          id="survey-comment"
                          rows={3}
                          maxLength={500}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          disabled={isSubmittingSurvey}
                          placeholder="Cuéntanos más sobre tu experiencia..."
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-color dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500 disabled:opacity-60"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="primary"
                        fullWidth
                        disabled={rating === 0 || isSubmittingSurvey}
                        isLoading={isSubmittingSurvey}
                        onClick={handleSubmitSurvey}
                      >
                        Enviar calificación
                      </Button>
                    </div>
                  )}
                </div>
              ) : null}

            </>
          ) : !error ? (
            <p
              role="status"
              className="flex items-center gap-3 text-sm text-slate-500"
            >
              <LoaderCircle
                className="h-5 w-5 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              Consultando tu turno…
            </p>
          ) : null}

          <div className="grid grid-cols-2 gap-2">
            {sedeSlug ? (
              <Link
                replace
                to={`/turnos/sede/${encodeURIComponent(sedeSlug)}`}
                className="flex min-h-11 items-center justify-center gap-1 rounded-lg bg-color px-2 py-2 text-center text-sm font-semibold text-white hover:bg-color/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
                Crear nuevo turno
              </Link>
            ) : null}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-11"
              isLoading={isLoading}
              onClick={() => void load(token)}
              icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
            >
              Actualizar estado
            </Button>
            {hasActiveActions ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="min-h-11"
                  onClick={toggleSound}
                  aria-pressed={soundEnabled}
                  icon={soundEnabled
                    ? <Volume2 className="h-4 w-4" aria-hidden="true" />
                    : <VolumeX className="h-4 w-4" aria-hidden="true" />}
                >
                  {soundEnabled ? "Desactivar sonido" : "Activar sonido"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isCancelling}
                  onClick={() => setIsCancelDialogOpen(true)}
                  className="min-h-11 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  Cancelar turno
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {isCancelDialogOpen ? (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="cancel-dialog-title"
          aria-describedby="cancel-dialog-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isCancelling) {
              setIsCancelDialogOpen(false);
            }
          }}
        >
          <div className="w-full max-w-md p-6 bg-white border border-slate-200 rounded-2xl shadow-xl dark:bg-gray-900 dark:border-gray-800 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 text-red-600 bg-red-100 rounded-full shrink-0 dark:bg-red-950/60 dark:text-red-400">
                <AlertTriangle className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="cancel-dialog-title"
                  className="text-lg font-semibold text-slate-900 dark:text-white"
                >
                  ¿Deseas cancelar tu turno?
                </h2>
                <p
                  id="cancel-dialog-desc"
                  className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-gray-300"
                >
                  Si cancelas tu turno, perderás tu lugar en la fila de espera y
                  deberás solicitar uno nuevo si requieres atención.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={isCancelling}
                onClick={() => setIsCancelDialogOpen(false)}
              >
                Conservar turno
              </Button>
              <Button
                type="button"
                variant="danger"
                isLoading={isCancelling}
                disabled={isCancelling}
                onClick={handleConfirmCancel}
              >
                Sí, cancelar turno
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </TurnoPublicLayout>
  );
};

export default TurnoTicketPage;
