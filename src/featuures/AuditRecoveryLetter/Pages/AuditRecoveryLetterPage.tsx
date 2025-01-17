import ModalSection from "@/components/common/HeaderPage/HeaderPage";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";

import { Suspense, useState } from "react";

import auditoria from "/assets/auditoria.svg";
import ModalAuditForm from "../Components/ModalAuditForm";
import { useFetchAuditLetter } from "../Hook/useFetchAuditLetter";
import { CupsAuthorizedLetter } from "@/models/IAuditLetter";

const RecoverLastPage = () => {
  const { auditLetter, loading, error } = useFetchAuditLetter();

  // estado para pasar cups al modal
  const [cupsAuthorized, setCupsAuthorized] = useState<CupsAuthorizedLetter[]>([]);
  const [idRadicado, setIdRadicacion] = useState<number>(0);
  const [idRequest, setIdRequest] = useState<number>(0);

  // estados manejo apertura modal
  const [isOpen, setIsOpen] = useState(false);

  // const [idRadicado] = useState<number>(0);

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error) return <div>{error}</div>;

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
                <th>N* Radicado</th>
                <th>Nombre Paciente</th>
                <th>Tipo Documento</th>
                <th>Numero Documento</th>
                <th>Convenio</th>
                <th>Auditar</th>
              </tr>
            </thead>

            <tbody className="text-xs text-center dark:text-gray-200">
              {auditLetter?.map((a) => (
                <tr
                  key={a.id}
                  className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  <td className="p-3 border-b dark:border-gray-700">{a.idRadicado}</td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {a.profetional}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {a.dniType}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {a.dniNumber}
                  </td>
                  <td className="p-3 border-b dark:border-gray-700">
                    {a.agreement}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setCupsAuthorized(a.cupsAuthorized);
                        setIdRadicacion(a.idRadicado);
                        setIdRequest(a.id);
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <ModalAuditForm 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        cupsAuthorized={cupsAuthorized}
        idRadicado={idRadicado}
        idRequest={idRequest}
        />
      </Suspense>
    </>
  );
};

export default RecoverLastPage;
