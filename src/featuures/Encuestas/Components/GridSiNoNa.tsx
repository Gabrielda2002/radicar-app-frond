import { FormikProps } from "formik";
import {
  ENUM_LABELS,
  RespuestaSiNoNa,
} from "@/models/IEncuestaSatisfaccion";

interface QuestionConfig {
  name: string;
  label: string;
}

interface GridSiNoNaProps {
  formik: FormikProps<any>;
  disabled?: boolean;
}

const preguntas: QuestionConfig[] = [
  {
    name: "timelyAppointment",
    label: "¿Le asignaron la cita oportunamente?",
  },
  {
    name: "punctualCare",
    label: "¿Fue atendido con puntualidad?",
  },
  {
    name: "professionalInterest",
    label: "¿El profesional mostró interés en su caso?",
  },
  {
    name: "clearRecommendations",
    label: "¿Las recomendaciones fueron claras y comprensibles?",
  },
  {
    name: "signageHelped",
    label: "¿La señalización interna le ayudó a ubicarse?",
  },
  {
    name: "adequateFacilities",
    label: "¿Las instalaciones son adecuadas?",
  },
  {
    name: "cleanFacilities",
    label: "¿Las instalaciones estaban limpias?",
  },
];

const opciones: RespuestaSiNoNa[] = [
  RespuestaSiNoNa.SI,
  RespuestaSiNoNa.NO,
  RespuestaSiNoNa.NA,
];

const GridSiNoNa: React.FC<GridSiNoNaProps> = ({ formik, disabled = false }) => {
  return (
    <div className="space-y-4">
      <h5 className="text-xl font-semibold text-blue-500 dark:text-gray-200">
        Encuesta de Satisfacción:
      </h5>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                Pregunta
              </th>
              {opciones.map((opcion) => (
                <th
                  key={opcion}
                  className="p-3 text-center font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 w-24"
                >
                  {ENUM_LABELS.RespuestaSiNoNa[opcion]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preguntas.map((pregunta, index) => (
              <tr
                key={pregunta.name}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              >
                <td className="p-3 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                  {pregunta.label}
                </td>
                {opciones.map((opcion) => {
                  const fieldValue = formik.values[pregunta.name];
                  const isSelected = fieldValue === opcion;

                  return (
                    <td
                      key={`${pregunta.name}-${opcion}`}
                      className="p-3 text-center border border-gray-200 dark:border-gray-600"
                    >
                      <label className="flex items-center justify-center cursor-pointer">
                        <input
                          type="radio"
                          name={pregunta.name}
                          value={opcion}
                          checked={isSelected}
                          onChange={() =>
                            formik.setFieldValue(pregunta.name, opcion)
                          }
                          disabled={disabled}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GridSiNoNa;
