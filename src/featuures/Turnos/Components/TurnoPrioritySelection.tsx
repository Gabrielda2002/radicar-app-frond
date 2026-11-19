import type { FormikProps } from "formik";
import { Check, HeartHandshake } from "lucide-react";
import type { ITurnoRequestForm, TurnoPriorityType } from "@/models/ITurnos";

interface TurnoPrioritySelectionProps {
  formik: FormikProps<ITurnoRequestForm>;
}

const options: Array<{
  value: TurnoPriorityType;
  label: string;
  description: string;
}> = [
  {
    value: "PRIORITARIO",
    label: "Sí",
    description: "Necesito atención prioritaria",
  },
  {
    value: "GENERAL",
    label: "No",
    description: "Necesito atención general",
  },
];

const TurnoPrioritySelection = ({ formik }: TurnoPrioritySelectionProps) => {
  const error = formik.touched.priority ? formik.errors.priority : undefined;

  return (
    <fieldset className="space-y-5" aria-describedby={error ? "turno-priority-help turno-priority-error" : "turno-priority-help"}>
      <legend id="turno-priority-legend" className="sr-only">
        ¿Requieres atención prioritaria?
      </legend>
      <p id="turno-priority-help" className="text-base leading-relaxed text-slate-600 dark:text-gray-300">
        Para personas adultas mayores, en embarazo, con un niño en brazos o con discapacidad.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const selected = formik.values.priority === option.value;
          return (
            <label
              key={option.value}
              className={`flex min-h-28 cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 text-left transition has-[:focus-visible]:outline-none has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-emerald-500/50 ${
                selected
                  ? "border-emerald-600 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/50"
                  : "border-slate-200 bg-white hover:border-emerald-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-emerald-500"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="priority"
                value={option.value}
                checked={selected}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "turno-priority-help turno-priority-error" : "turno-priority-help"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-color dark:bg-gray-800 dark:text-teal-300">
                <HeartHandshake className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block text-2xl font-bold text-slate-900 dark:text-white">{option.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-gray-300">{option.description}</span>
              </span>
              {selected ? <Check className="h-6 w-6 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" /> : null}
            </label>
          );
        })}
      </div>
      {error ? <p id="turno-priority-error" role="alert" className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p> : null}
    </fieldset>
  );
};

export default TurnoPrioritySelection;
