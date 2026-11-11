import type { FormikProps } from "formik";
import { Check, Stethoscope } from "lucide-react";
import type { ITurnoOption, ITurnoRequestForm } from "@/models/ITurnos";

interface TurnoServiceSelectionProps {
  formik: FormikProps<ITurnoRequestForm>;
  services: ITurnoOption[];
}

const TurnoServiceSelection = ({
  formik,
  services,
}: TurnoServiceSelectionProps) => {
  const error = formik.touched.serviceId ? formik.errors.serviceId : undefined;

  return (
    <fieldset
      className="space-y-4"
      aria-describedby={
        error ? "turno-service-help turno-service-error" : "turno-service-help"
      }
    >
      <legend
        id="turno-service-legend"
        className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl"
      >
        ¿Qué servicio necesitas?
      </legend>
      <p
        id="turno-service-help"
        className="text-base leading-relaxed text-slate-600 dark:text-gray-300"
      >
        Toca una opción para seleccionarla.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const value = String(service.id);
          const selected = formik.values.serviceId === value;
          return (
            <label
              key={service.id}
              className={`group flex min-h-20 cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 text-left text-lg font-semibold transition has-focus-visible:outline-none has-focus-visible:ring-4 has-focus-visible:ring-emerald-500/50 ${
                selected
                  ? "border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-100"
                  : "border-slate-200 bg-white text-slate-800 hover:border-emerald-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-emerald-500"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="serviceId"
                value={value}
                checked={selected}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={
                  error
                    ? "turno-service-help turno-service-error"
                    : "turno-service-help"
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-color dark:bg-gray-800 dark:text-teal-300">
                <Stethoscope className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="flex-1">{service.name}</span>
              {selected ? (
                <Check
                  className="h-6 w-6 shrink-0 text-emerald-700 dark:text-emerald-300"
                  aria-hidden="true"
                />
              ) : null}
            </label>
          );
        })}
      </div>
      {error ? (
        <p
          id="turno-service-error"
          role="alert"
          className="text-sm font-semibold text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
};

export default TurnoServiceSelection;
