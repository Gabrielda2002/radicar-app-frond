//*Funciones y Hooks
interface ModalGestionServicioProps {
  onClose: () => void;
}
const ModalGestionServicio: React.FC<ModalGestionServicioProps> = ({
  onClose,
}) => {
  return (
    <>
      <section className="fixed inset-0 z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 backdrop-blur-sm">
        <section>
          {/* container-full */}
          <div className="w-full overflow-hidden transition-transform duration-300 transform bg-white rounded shadow-lg">
            {/* container-header */}
            <div className="flex w-full py-4 text-xl font-semibold bg-white ps-4 text-color dark:text-gray-200 dark:bg-gray-900 ">
              Gestión Servicio Cliente
            </div>

            {/* init-table */}
            <section className="p-6 max-h-[70Vh] overflow-y-auto grid grid-cols-2  mb-4 ms-2">
              <div className="flex">
                <label htmlFor="">
                  <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                    Estado Seguimiento
                  </span>
                  <select
                    id=""
                    name=""
                    className="w-[200px] px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                  >
                    <option value="">- SELECT -</option>
                    <option value="1">Activo</option>
                    <option value="2">:?:</option>
                    <option value="3">Inactivo</option>
                  </select>
                </label>
              </div>
              <div>
                <label htmlFor="">
                  <span className="flex mb-2 font-bold text-gray-700 after:content-['*'] after:ml-2 after:text-red-600 dark:text-white dark:bg-gray-700">
                    Observación
                  </span>
                  <textarea
                    id=""
                    name=""
                    className="w-[300px] px-3 py-2 border border-gray-200 rounded dark:border-gray-600 text-stone-700 dark:text-white dark:bg-gray-700"
                  ></textarea>
                </label>
              </div>
            </section>

            {/* container-footer */}
            <div className="flex items-center justify-end w-full gap-1 px-4 py-4 text-sm font-semibold bg-white h-14 dark:bg-gray-800">
              <button
                className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button className="w-16 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600">
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
