import type { FormikProps } from "formik";
import { Check, ClipboardList } from "lucide-react";
import type { ITurnoRequestForm } from "@/models/ITurnos";
import {
  TURNO_CLASSIFICATION_LABELS,
  TURNO_CLASSIFICATION_VALUES,
} from "../constants/turnoClassification";

interface TurnoClassificationSelectionProps {
  formik: FormikProps<ITurnoRequestForm>;
}

const TurnoClassificationSelection = ({
  formik,
}: TurnoClassificationSelectionProps) => {
  const error = formik.touched.classification
    ? formik.errors.classification
    : undefined;
  const describedBy = error ? "turno-classification-error" : undefined;

  return (
    <fieldset aria-describedby={describedBy}>
      <legend className="sr-only">
        ¿Qué trámite vas a realizar?
      </legend>
      <div className="grid grid-cols-1 gap-3">
        {TURNO_CLASSIFICATION_VALUES.map((value) => {
          const selected = formik.values.classification === value;
          return (
            <label
              key={value}
              className={`group flex items-center gap-4 p-5 min-h-20 text-left text-lg font-semibold border-2 rounded-2xl transition has-focus-visible:outline-none has-focus-visible:ring-4 has-focus-visible:ring-emerald-500/50 ${
                selected
                  ? "text-emerald-950 bg-emerald-50 border-emerald-600 dark:text-emerald-100 dark:bg-emerald-950/50 dark:border-emerald-400"
                  : "text-slate-800 bg-white border-slate-200 hover:border-emerald-400 dark:text-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-emerald-500"
              } cursor-pointer`}
            >
              <input
                className="sr-only"
                type="radio"
                name="classification"
                value={value}
                checked={selected}
                required
                aria-invalid={Boolean(error)}
                aria-describedby={describedBy}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="flex items-center justify-center w-12 h-12 shrink-0 text-color bg-slate-100 rounded-xl dark:text-teal-300 dark:bg-gray-800">
                <ClipboardList className="w-6 h-6" aria-hidden="true" />
              </span>
              <span className="flex-1">
                {TURNO_CLASSIFICATION_LABELS[value]}
              </span>
              {selected ? (
                <Check
                  className="w-6 h-6 shrink-0 text-emerald-700 dark:text-emerald-300"
                  aria-hidden="true"
                />
              ) : null}
            </label>
          );
        })}
      </div>
      {error ? (
        <p
          id="turno-classification-error"
          role="alert"
          className="mt-3 text-sm font-semibold text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
};

export default TurnoClassificationSelection;
