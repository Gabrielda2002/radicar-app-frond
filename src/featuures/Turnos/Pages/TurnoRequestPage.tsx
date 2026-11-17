import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LoaderCircle,
  MapPin,
} from "lucide-react";
import Button from "@/components/common/Ui/Button";
import type { ITurnoSedeConfig } from "@/models/ITurnos";
import TurnoPublicLayout from "../Components/TurnoPublicLayout";
import TurnoNotice from "../Components/TurnoNotice";
import TurnoIdentityFields from "../Components/TurnoIdentityFields";
import TurnoDetailsFields from "../Components/TurnoDetailsFields";
import TurnoServiceSelection from "../Components/TurnoServiceSelection";
import TurnoPrioritySelection from "../Components/TurnoPrioritySelection";
import TurnoRequestSummary from "../Components/TurnoRequestSummary";
import { useTurnoRequestForm } from "../hooks/useTurnoRequestForm";
import { useStoreTurnoRequest } from "../store/useStoreTurnoRequest";

const steps = [
  "Identificación",
  "Tus datos",
  "Servicio",
  "Prioridad",
  "Confirmación",
];
const titles = [
  "Tu turno empieza aquí.",
  "Confirma tus datos.",
  "Elige tu servicio.",
  "Elige tu prioridad.",
  "Revisa tu solicitud.",
];
const descriptions = [
  "Ingresa tu documento para solicitar o recuperar tu turno.",
  "Revisa tus datos antes de continuar.",
  "Toca el servicio que necesitas.",
  "Responde una pregunta para definir el tipo de atención.",
  "Verifica la información antes de confirmar tu solicitud.",
];

const TurnoRequestContent = ({
  slug,
  config,
}: {
  slug: string;
  config: ITurnoSedeConfig;
}) => {
  const {
    formik,
    step,
    goBack,
    goToService,
    goToPriority,
    isLocating,
    locationError,
    submitWithoutLocation,
    clearVerification,
  } = useTurnoRequestForm(slug);
  const verification = useStoreTurnoRequest((state) => state.data.verification);
  const error = useStoreTurnoRequest((state) => state.error);
  const isLoading = useStoreTurnoRequest((state) => state.isLoading);
  const load = useStoreTurnoRequest((state) => state.load);
  const heading = useRef<HTMLHeadingElement>(null);
  const busy = formik.isSubmitting || isLoading;
  const unavailable =
    config.services.length === 0 || config.documentTypes.length === 0;
  useEffect(() => {
    heading.current?.focus();
  }, [step]);

  return (
    <>
      <div className="flex items-start gap-2 mb-6 text-sm text-slate-500 dark:text-gray-400">
        <MapPin
          className="mt-0.5 h-4 w-4 shrink-0 text-color dark:text-teal-300"
          aria-hidden="true"
        />
        <div>
          <p className="font-medium text-slate-800 dark:text-gray-100">
            {config.headquarter.name}
          </p>
          <p className="mt-0.5 text-xs">{config.headquarter.address}</p>
        </div>
      </div>
      <section className="overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm dark:bg-gray-900 dark:border-gray-800">
        <ol
          aria-label="Pasos de la solicitud"
          className="grid grid-cols-5 gap-1 px-3 py-5 border-b border-slate-100 sm:gap-2 sm:px-8 dark:border-gray-800"
        >
          {steps.map((label, index) => (
            <li
              key={label}
              aria-current={step === index ? "step" : undefined}
              className={`flex min-w-0 flex-col items-center gap-2 text-center text-[10px] leading-tight sm:flex-row sm:text-left sm:text-xs ${step === index ? "font-semibold text-color dark:text-teal-300" : "text-slate-500 dark:text-gray-400"}`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs ${step >= index ? "text-white bg-color" : "bg-slate-100 dark:bg-gray-800"}`}
              >
                {step > index ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  `0${index + 1}`
                )}
              </span>
              <span className="sr-only sm:not-sr-only">{label}</span>
            </li>
          ))}
        </ol>
        <div className="p-5 sm:p-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-color uppercase dark:text-teal-300">
            Atención presencial
          </p>
          <h1
            ref={heading}
            tabIndex={-1}
            className="mb-3 text-3xl font-medium leading-tight tracking-tight outline-none sm:text-4xl"
          >
            {titles[step]}
          </h1>
          <p
            className="mb-2 text-sm font-semibold text-color dark:text-teal-300"
            aria-live="polite"
          >
            Paso {step + 1} de {steps.length} · {steps[step]}
          </p>
          <p className="mb-7 text-base leading-relaxed text-slate-600 dark:text-gray-300">
            {descriptions[step]}
          </p>
          {unavailable ? (
            <div className="space-y-4">
              <TurnoNotice message={config.services.length === 0
                ? "Esta sede no tiene servicios habilitados. No es posible emitir un nuevo turno. Solicita orientación al personal de la sede."
                : "Esta sede no tiene tipos de documento disponibles. Solicita orientación al personal de la sede."} />
              <Button type="button" className="min-h-12 min-w-12" isLoading={busy} onClick={() => void load(slug)}>Actualizar opciones de la sede</Button>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} noValidate aria-busy={busy}>
              <fieldset disabled={busy} className="min-w-0 space-y-6">
                {step === 0 ? (
                  <TurnoIdentityFields
                    formik={formik}
                    documentTypes={config.documentTypes}
                    onIdentityChange={clearVerification}
                  />
                ) : step === 1 ? (
                  <TurnoDetailsFields
                    formik={formik}
                    isExistingPatient={verification?.exists === true}
                  />
                ) : step === 2 ? (
                  <TurnoServiceSelection
                    formik={formik}
                    services={config.services}
                  />
                ) : step === 3 ? (
                  <TurnoPrioritySelection formik={formik} />
                ) : (
                  <TurnoRequestSummary
                    values={formik.values}
                    config={config}
                    onEditService={goToService}
                    onEditPriority={goToPriority}
                  />
                )}
                {error || locationError ? (
                  <TurnoNotice message={locationError || error || ""} />
                ) : null}
                {error ? <Button type="button" variant="outline" className="min-h-12 min-w-12" onClick={() => void load(slug)}>Actualizar opciones de la sede</Button> : null}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                  {step > 0 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goBack}
                      icon={<ArrowLeft className="h-4 w-4" />}
                    >
                      Volver
                    </Button>
                  ) : (
                    <span />
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={busy}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    {isLocating
                      ? "Obteniendo ubicación…"
                      : busy
                        ? "Procesando…"
                        : step === 4
                          ? "Solicitar mi turno"
                          : step === 3
                            ? "Revisar solicitud"
                            : "Continuar"}
                  </Button>
                </div>
                {import.meta.env.DEV && step === 4 ? (
                  <Button
                    type="button"
                    variant="outline"
                    fullWidth
                    onClick={submitWithoutLocation}
                    className="text-amber-800 border-amber-200 dark:text-amber-200"
                  >
                    <span className="text-xs">
                      Desarrollo · Omitir validación de ubicación
                    </span>
                  </Button>
                ) : null}
              </fieldset>
            </form>
          )}
        </div>
      </section>
      <p className="mt-5 text-center text-xs leading-relaxed text-slate-500 dark:text-gray-400">
        No necesitas crear una cuenta ni imprimir tu turno.
      </p>
    </>
  );
};

const TurnoRequestPage = () => {
  const { slug = "" } = useParams();
  const data = useStoreTurnoRequest((state) => state.data);
  const error = useStoreTurnoRequest((state) => state.error);
  const isLoading = useStoreTurnoRequest((state) => state.isLoading);
  const load = useStoreTurnoRequest((state) => state.load);
  const reset = useStoreTurnoRequest((state) => state.reset);
  const config = data.slug === slug ? data.config : null;

  console.log(data)

  useEffect(() => {
    void load(slug);
    return reset;
  }, [slug, load, reset]);

  return (
    <TurnoPublicLayout>
      {config ? (
        <TurnoRequestContent key={slug} slug={slug} config={config} />
      ) : (
        <section className="space-y-5 p-6 bg-white border border-slate-200 rounded-2xl dark:bg-gray-900 dark:border-gray-800">
          <h1 className="text-2xl font-medium">Solicita tu turno</h1>
          {error ? (
            <>
              <TurnoNotice message={error} />
              <Button
                type="button"
                onClick={() => void load(slug)}
                isLoading={isLoading}
              >
                Volver a consultar la sede
              </Button>
            </>
          ) : (
            <p
              role="status"
              className="flex items-center gap-3 text-sm text-slate-500"
            >
              <LoaderCircle
                className="h-5 w-5 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              Consultando la sede…
            </p>
          )}
        </section>
      )}
    </TurnoPublicLayout>
  );
};

export default TurnoRequestPage;
