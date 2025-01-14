import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { UseFetchRequestLetter } from "../Hooks/UseFetchRequestLetter";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { format } from "date-fns";

const RecoverLetterPage = () => {
  // * hook trae radicados a los que se puede solicitar carta de recobro

  const { requestLetter, loading, error } = UseFetchRequestLetter();

  const formatDate = (date: Date | null) => {
    return date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
  };

  if (loading) return <LoadingSpinner duration={100000} />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <ModalSection
        title="Solicitar Carta de Recobro"
        breadcrumb={[{ label: "Inicio", path: "/home" }]}
      />

      <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/40">
        <section>{/*barra de busqueda*/}</section>

        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden text-sm rounded-lg shadow-lg">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr className="shadow-md dark:text-gray-300 rounded-t-md">
                <th>Fecha-hora Radicado</th>
                <th>Tipo Documento Paciente</th>
                <th>N. Documento Paciente</th>
                <th>Nombre Paciente</th>
                <th>Convenio</th>
                <th>Profesional</th>
                <th>CUPS</th>
              </tr>
            </thead>

            <tbody className="text-xs text-center dark:text-gray-200">
              {requestLetter?.map((r) => (
                <tr
                  className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  key={r.id}
                >
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
                              <th>Descricion</th>
                              <th>Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {r.cupsAuthorized.map((c) => (
                              <tr
                                className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                                key={c.id}
                              >
                                <td className="p-3 border-b dark:border-gray-700">
                                  {c.code}
                                </td>
                                <td
                                  className="block p-3 border-b dark:border-gray-700 max-w-[200px] truncate"
                                  title={c.DescriptionCode}
                                >
                                  {c.DescriptionCode}
                                </td>
                                <td className="p-3 border-b dark:border-gray-700">
                                  {c.status}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecoverLetterPage;
