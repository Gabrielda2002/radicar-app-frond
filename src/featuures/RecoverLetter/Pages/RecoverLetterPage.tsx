import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { UseFetchRequestLetter } from "../Hooks/UseFetchRequestLetter";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { format } from "date-fns";

// icons
import carta from "/assets/carta.svg";

import { Suspense, useState } from "react";
import ModalRequestForm from "../Components/ModalRequestForm";
import { handleDownload } from "../Utils/HandleDownload";
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';


const RecoverLetterPage = () => {
  // * hook trae radicados a los que se puede solicitar carta de recobro

  // estados manejo apertura modal
  const [isOpen, setIsOpen] = useState(false);

  const [document, setDocument] = useState<string>("");

  const [idRadicado, setIdRadicado] = useState<number>(0);
  const [isRequested, setIsRequested] = useState<boolean>(false);

  // Función que cambia el estado de expansión
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  const { requestLetter, error, getData } = UseFetchRequestLetter();

  const formatDate = (date: Date | null) => {
    return date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      <ModalSection
        title="Solicitar Carta de Recobro"
        breadcrumb={[{ label: "Inicio", path: "/home" }]}
      />

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <section className="flex items-end justify-between w-full mb-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold text-stone-600 dark:text-stone-300">
              Buscar Solicitudes:
            </label>
            <input
              type="text"
              placeholder="Documento del paciente"
              className="w-64 h-10 pl-3 border rounded-md border-stone-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
            />

            <button
              className="w-full text-white bg-teal-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:translate-y-1 hover:scale-100 hover:bg-emerald-700 duration-300 mt-3"
              onClick={() => getData(document)}
            >
              Buscar
            </button>
          </div>
        </section>

        <div className="overflow-x-auto">
          {requestLetter && requestLetter?.length > 0 && (
            <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr className="shadow-md dark:text-gray-300 rounded-t-md">
                  <th>N* Radicado</th>
                  <th>Fecha-hora Radicado</th>
                  <th>Tipo Documento Paciente</th>
                  <th>N. Documento Paciente</th>
                  <th>Nombre Paciente</th>
                  <th>Convenio</th>
                  <th>Profesional</th>
                  <th>CUPS</th>
                  <th>Solicitar</th>
                  <th>Descargar Carta</th>
                </tr>
              </thead>

              <tbody className="text-xs text-center dark:text-gray-200">
                {requestLetter?.map((r) => (
                  <tr
                    className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                    key={r.id}
                  >
                    <td className="p-3 border-b dark:border-gray-700">
                      {r.id}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {formatDate(r.creatAt)}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {r.dniType}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {r.dniNumber}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {r.patientName}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {r.agreement}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {r.profetional}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {r.cupsAuthorized.length > 0 && (
                        <div className="overflow-x-auto">
                          <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
                            <thead>
                              <tr className="text-gray-800 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-200">
                                <th>CUPS</th>
                                <th>Descripción</th>
                                <th>Estado CUPS</th>
                                <th>Estado Carta Recobro</th>
                              </tr>
                            </thead>
                            <tbody>
                              {r.cupsAuthorized.map((c) => (
                                <tr
                                  className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                                  key={c.id}
                                >
                                  <td className="w-3 p-3 border-b dark:border-gray-700">
                                    {c.code}
                                  </td>
                                  <td
                                    className={`block p-3 border-b dark:border-gray-700 max-w-[200px] ${
                                      isExpanded
                                        ? "whitespace-normal"
                                        : "truncate"
                                    }`}
                                    onClick={toggleExpand}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {c.DescriptionCode}
                                  </td>
                                  <td className="p-3 border-b dark:border-gray-700">
                                    {c.status}
                                  </td>
                                  <td className="p-3 border-b dark:border-gray-700">
                                    {c.statusLetter}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setIdRadicado(r.id);
                          setIsRequested(r.isRequested);
                        }}
                      >
                        <img
                          src={carta}
                          alt="request-icon"
                          className="w-10 h-10 dark:filter dark:invert "
                        />
                      </button>
                    </td>
                    <td className="p-3 border-b dark:border-gray-700">
                      {r.datePrint == null &&
                        r.cupsAuthorized.some(
                          (c) => c.statusLetter === "Autorizado"
                        ) && (
                          <button
                            onClick={() =>
                              handleDownload(r.id.toString(), r.idRequest)
                            }
                            title="Descargar PDF"
                          >
                            <DocumentArrowDownIcon className="w-8 h-8" />
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <ModalRequestForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          idRadicado={idRadicado}
          isRequested={isRequested}
        />
      </Suspense>
    </>
  );
};

export default RecoverLetterPage;
