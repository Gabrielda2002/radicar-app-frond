import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { CupsAuthorizedLetter } from "@/models/IAuditLetter";
import { useFormik } from "formik";
import { FC, useEffect } from "react";
import * as Yup from "yup";

interface ModalAuditFormProps {
  isOpen: boolean;
  onClose: () => void;
  cupsAuthorized: CupsAuthorizedLetter[];
}
interface FormValues {
  observation: string;
  cups: {
    id: number;
    code: number;
    DescriptionCode: string;
    statusLetter: string;
  }[];
}
interface ErrorsForm {
  observation?: string;
  statusLetter?: string;
  
}
const ModalAuditForm: FC<ModalAuditFormProps> = ({
  isOpen,
  onClose,
  cupsAuthorized,
}) => {
  // const [success, setSuccess] = useState(false);
  //   const [error, setError] = useState<string | null>("");
  //   const [loading, setLoading] = useState(false);

  const { showAnimation, closing } = useAnimation(isOpen, onClose);
  useBlockScroll(isOpen);

  const validationSchema = Yup.object({
    observation: Yup.string().required("Campo requerido"),
    cups: Yup.array().of(
      Yup.object().shape({
        statusLetter: Yup.string().required("Campo requerido"),
      })
    ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      observation: "",
      cups: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (cupsAuthorized.length > 0) {
      formik.setValues({
        observation: "",
        cups: cupsAuthorized.map((cup) => ({
          id: cup.id,
          code: cup.code,
          DescriptionCode: cup.DescriptionCode,
          statusLetter: "",
        })),
      });
    }
  }, [cupsAuthorized]);

  if (!showAnimation) return null;
  console.log(formik.errors)

  return (
    <div>
      <div className="fixed inset-0 z-50 flex justify-center w-full h-full pt-16 duration-300 bg-black w ransition-opacity bg-opacity-40 backdrop-blur-sm">
        <section
          className={`z-10 w-[1000px] h-fit bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
            showAnimation && !closing
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between px-2 pt-4 bg-gray-200 border-b-2 border-black dark:border-white dark:bg-gray-800">
            <h2 className="p-2 text-2xl font-semibold text-color dark:text-gray-200">
              Enviar solicitud
            </h2>
            <button
              className="text-xl text-gray-500 duration-200 rounded-md hover:text-gray-900 dark:text-gray-100 hover:bg-gray-400 w-7 h-7 dark:hover:bg-gray-300 dark:hover:text-gray-800"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="dark:bg-gray-800">
            <div className="px-5 max-h-[70vh] overflow-y-auto">
              <div>
                <h5 className="p-2 mt-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                  Datos para hacer la solicitud
                </h5>
              </div>

              <section className="grid grid-cols-1 mb-6 text-sm gap-x-10 gap-y-2 ms-2">
                <div>
                  <label htmlFor="observation">
                    <span className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                      Observacion
                    </span>
                    <input
                      type="text"
                      id="observation"
                      name="observation"
                      onChange={formik.handleChange}
                      value={formik.values.observation}
                      onBlur={formik.handleBlur}
                      placeholder="Escriba"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                    />
                    {formik.touched.observation && formik.errors.observation ? (
                      <div className="text-red-600">
                        {formik.errors.observation}
                      </div>
                    ) : null}
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {cupsAuthorized &&
                    formik.values.cups.map((cup, index) => (
                      <div
                        key={cup.id}
                        className="w-full p-4 mx-1 bg-gray-100 border rounded-md shadow-md dark:bg-gray-700"
                      >
                        <div className="mb-4">
                          <label className="mb-2 font-medium text-stone-600 dark:text-stone-300">
                            Codigo CUPS:
                          </label>
                          <input
                            type="text"
                            value={cup.code}
                            readOnly
                            className="w-full p-2 border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="mb-2 font-medium text-stone-600 dark:text-stone-300">
                            Descripcion CUPS:
                          </label>
                          <input
                            type="text"
                            value={cup.DescriptionCode}
                            readOnly
                            className="w-full p-2 border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="mb-2 font-medium text-stone-600 dark:text-stone-300">
                            Estado de la carta:
                          </label>
                          <select
                            name={`cups[${index}].statusLetter`}
                            value={formik.values.cups[index].statusLetter}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-600 dark:text-white"
                          >
                            <option value="">Seleccione</option>
                            <option value="Enviada">Autorizado</option>
                            <option value="No enviada">No Autorizado</option>
                          </select>
                        </div>
                        {formik.touched.cups?.[index]?.statusLetter &&
                        formik.errors.cups &&
                        typeof formik.errors.cups !== "string" &&
                        (formik.errors.cups as Array<ErrorsForm>)[
                          index
                        ]?.statusLetter && (
                          <div className="text-red-600"> 
                            {
                              (formik.errors.cups as Array<ErrorsForm>)[
                                index
                              ]?.statusLetter
                            }
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            </div>
            <div className="flex items-center justify-end w-full gap-2 px-4 py-4 text-sm font-semibold bg-gray-300 border-t-2 h-14 dark:bg-gray-600 border-t-gray-900 dark:border-t-white">
              <button
                type="button"
                onClick={onClose}
                className="w-20 h-10 text-blue-400 duration-200 border-2 border-gray-500 rounded-md hover:border-red-500 hover:text-red-500 active:hover:bg-gray-600 dark:hover:text-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="w-20 h-10 text-white duration-200 border-2 rounded-md dark:hover:border-gray-900 bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-800 dark:hover:bg-gray-600 "
                //   disabled={loading}
              >
                {/* {loading ? "Enviando..." : "Enviar"} */} Enviar
              </button>
              {/* {success && <div className="text-green-500">Solicitud enviada</div>}

            {error && <div className="text-red-500">{error}</div>} */}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalAuditForm;
