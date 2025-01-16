import ModalSection from "@/components/common/HeaderPage/HeaderPage";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

import { Suspense, useState } from "react";

import auditoria from "/assets/auditoria.svg"
import ModalAuditForm from "../Components/ModalAuditForm";

const RecoverLastPage = () => {

  // estados manejo apertura modal
  const [isOpen, setIsOpen] = useState(false);

  // const [idRadicado] = useState<number>(0);


  return (
    <>
      <ModalSection
        title="Auditoria"
        breadcrumb={[{ label: "Inicio", path: "/home" }]}
      />

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <section>{/*barra de busqueda*/}</section>

        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr className="shadow-md dark:text-gray-300 rounded-t-md">
                <th>id</th>
                <th>Documento</th>
                <th>CUPS</th>
                <th>Observaciones</th>
                <th>Justificacion</th>
                <th>0</th>
                <th>Solicitar</th>
              </tr>
            </thead>

            <tbody className="text-xs text-center dark:text-gray-200">
              <tr className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <img
                      src={auditoria}
                      alt="request-icon"
                      className="w-10 h-10 dark:filter dark:invert "
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <ModalAuditForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </Suspense>
    </>
  );
};

export default RecoverLastPage;
