import  { useState } from "react";

import gestion from "/assets/gestion.svg";
import ModalGestionServicio from "./ModalGestionServicio";

const ModalGestionAuxiliar = () => {
  const [stadOpen, setStadOpen] = useState(false);// Estados Auxiliar
  const [openServicio, setOpenServicio] = useState(false);// Estados Servicios

  const EventServicio = () => {
    setStadOpen(false); // Cierra el primer modal
    setOpenServicio(true); // Abre el segundo modal
  };

  return (
    <>
      <button className="" onClick={() => setStadOpen(true)}>
        <img src={gestion} alt="" />
      </button>

      {stadOpen && (
        <section className="fixed z-50 flex justify-center pt-12 transition-opacity duration-300 bg-black bg-opacity-50 inset-0 backdrop-blur-sm">
          <section  onClick={() => setStadOpen(false)} >
            {/* container-full */}
            <div className="w-full bg-white shadow-lg transform transition-transform duration-300 overflow-hidden rounded">
              {/* container-header */}
              <div className="w-full flex py-4 ps-4 text-xl font-semibold bg-white text-color dark:text-gray-200 dark:bg-gray-900 ">
                Seguimiento Auxiliar
              </div>

              {/* init-table */}
              <section className="p-6 max-h-[70Vh] overflow-y-auto">
                <table className="min-w-full text-sm">
                  {/* posible scroll "70Vh" */}
                  <thead className="">
                    <tr className="dark:text-gray-300 dark:bg-gray-700 bg-gray-50">
                      <th>Número Radicado</th>
                      <th>Código</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Observación</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-200">
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivow</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                    <tr>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                      <td>...texto alusivo</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* container-footer */}
              <div className="flex  items-center justify-end w-full h-14 gap-2 px-4 py-4 text-sm font-semibold  bg-white dark:bg-gray-800">
                <button
                  className="w-20 h-10 text-blue-400 rounded-md hover:text-red-400 active:text-red-600 dark:text-gray-200 dark:bg-gray-800"
                  onClick={() => setStadOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  className="w-40 h-10 text-white rounded-md bg-color hover:bg-emerald-900 active:bg-emerald-950 dark:bg-gray-900 dark:hover:bg-gray-600"
                  onClick={EventServicio}
                >
                  Registrar Seguimiento
                </button>
              </div>
            </div>
          </section>
        </section>
      )}

        {/* init-modal-second */}
      {openServicio && (
        <ModalGestionServicio
          onClose={() => setOpenServicio(false)}
        />
      )}
    </>
  );
};

export default ModalGestionAuxiliar;
