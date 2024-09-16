import { useState } from "react";
import { submitGestionAuxiliar } from "../../../services/submitGestionAuxiliar";

//*Funciones y Hooks
interface ModalGestionServicioProps {
  onClose: () => void;
  idRadicado: number;
}
const ModalGestionServicio: React.FC<ModalGestionServicioProps> = ({
  onClose,
  idRadicado
}) => {
  // * se crean estados para el manejo de la informacion
  // * de los campos del formulario
  const [estadoSeguimiento, setEstadoSeguimiento] = useState<string>("");
  const [observacion, setObservacion] = useState<string>("");

  const handleSubmitGestion = (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("observation", observacion);
      formData.append("status", estadoSeguimiento);
      formData.append("idRadicacion", idRadicado.toString());

      submitGestionAuxiliar(formData)
  };

  return (
    <>
      <section className="fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
        <section>
          {/* container-full */}
          <div className="w-full bg-white shadow-lg transform transition-transform duration-300 overflow-hidden rounded  dark:bg-gray-800">
            {/* container-header */}
            <div className="flex items-center justify-between px-2 py-2 ">
              <h1 className="text-xl font-semibold text-color dark:text-gray-200">
                Gestión Servicio Cliente
              </h1>
              <button
                onClick={onClose}
                className="text-xl text-gray-500 hover-gray-700 pr-2"
              >
                &times;
              </button>
            </div>

            {/* init-table */}
            <form>
              <section className="py-2 px-4 max-h-[70Vh] overflow-y-auto grid grid-cols-2  mb-4 ms-2   dark:bg-gray-800">
                <div className="flex">
                  <label htmlFor="">
                    <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white">
                      Estado Seguimiento
                    </span>
                    <select
                      onChange={(e) => setEstadoSeguimiento(+e.target.value)}
                      className="w-[200px] px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                    >
                      <option value="">- SELECT -</option>
                      <option value="1">Asignado</option>
                      <option value="2">Cancelado</option>
                      <option value="3">Cerrado</option>
                      <option value="4">Cumplido</option>
                      <option value="5">Imcuplido</option>
                      <option value="6">Pendiente</option>
                      <option value="7">Reprogramado</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label htmlFor="">
                    <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white">
                      Observación
                    </span>
                    <textarea
                      id=""
                      name=""
                      onChange={(e) => setObservacion(e.target.value)}
                      className="w-[300px] px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-800"
                    ></textarea>
                  </label>
                </div>
              </section>
            </form>

            {/* container-footer */}
            <div className="flex  items-center justify-end w-full h-12 gap-2 px-4 py-4 text-sm font-semibold  bg-white dark:bg-gray-800">
              <button
                className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                Cerrar
              </button>
              <button 
              className="w-16 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
              onClick={handleSubmitGestion}
              >
                {/* button de redicionamiento  */}
                Enviar
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default ModalGestionServicio;
