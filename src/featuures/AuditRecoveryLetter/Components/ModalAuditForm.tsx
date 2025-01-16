import useAnimation from "@/hooks/useAnimations";
import { useBlockScroll } from "@/hooks/useBlockScroll";
import { FC } from "react";
// import * as Yup from "yup";


interface ModalAuditFormProps{
    isOpen: boolean;
    onClose: () => void;
}
const ModalAuditForm: FC<ModalAuditFormProps> = ({
    isOpen,
    onClose,
}) => {


    // const [success, setSuccess] = useState(false);
    //   const [error, setError] = useState<string | null>("");
    //   const [loading, setLoading] = useState(false);

      const { showAnimation, closing } = useAnimation(isOpen, onClose);
      useBlockScroll(isOpen);


    // const validationSchema = Yup.object({
        
    // })

  if (!showAnimation) return null;


  return (
    <div>
      <div className="fixed inset-0 z-50 flex justify-center w-full h-full pt-16 duration-300 bg-black w ransition-opacity bg-opacity-40 backdrop-blur-sm">
      <section
        className={`z-10 w-[600px] h-fit bg-white rounded overflow-hidden shadow-lg transform transition-transform duration-300 dark:bg-gray-800 ${
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

        {/* <form onSubmit={formik.handleSubmit} className="dark:bg-gray-800">
          <div className="px-5 max-h-[70vh] overflow-y-auto">
            <div>
              <h5 className="p-2 mt-2 text-xl font-semibold text-blue-500 dark:text-gray-200">
                Datos para hacer la solicitud
              </h5>
            </div>

            <section className="grid-cols-1 mb-6 text-sm gap-x-10 gap-y-2 ms-2">
              <div>
                <label htmlFor="justify">
                  <span className="flex items-center text-base font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-gray-200">
                    Justificacion
                  </span>
                  <input
                    type="text"
                    id="justify"
                    name="justify"
                    onChange={formik.handleChange}
                    value={formik.values.justify}
                    onBlur={formik.handleBlur}
                    placeholder="Escriba"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                  />
                  {formik.touched.justify && formik.errors.justify ? (
                    <div className="text-red-600">{formik.errors.justify}</div>
                  ) : null}
                </label>
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
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
            {success && <div className="text-green-500">Solicitud enviada</div>}

            {error && <div className="text-red-500">{error}</div>}
          </div>
        </form> */}
      </section>
    </div>
    </div>
  )
}

export default ModalAuditForm
