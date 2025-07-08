import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import ModalCreateDI from "../Components/ModalCreateDI";
import { useFetchDI } from "../Hooks/useFetchDI";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FormatDate } from "@/utils/FormatDate";

const DemandInduce = () => {
  const { data, loading, error } = useFetchDI();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      ) : (
        <>
          <ModalSection
            title="Inducción de demanda"
            breadcrumb={[
              { label: "Inicio", path: "/" },
              { label: "Inducción de demanda", path: "/demanda/inducida" },
            ]}
          />
          <div className="w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
            {/* Barra de busqueda y demas parametros */}

            <ModalCreateDI />

            <div className="mt-4 mb-5 overflow-y-auto">
              <table className="min-w-full overflow-hidden text-sm text-center rounded-lg shadow-lg">
                <thead>
                  <tr className="text-sm text-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <th>Tipo Documento</th>
                    <th>Documento</th>
                    <th>Fecha Creacion</th>
                    <th>Elemento Demanda Inducida</th>
                    <th>Tipo Demanda inducida</th>
                    <th>Clasificacion</th>
                    <th>Objetivo</th>
                    <th>Programa</th>
                    <th>Paciente</th>
                    <th>Area P. Seguimiento</th>
                    <th>Fecha Cita</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600 dark:text-gray-300">
                  {data.map((d) => (
                    <tr
                      key={d.id}
                      className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                      <td>
                        {d.typeDocument}
                      </td>
                      <td className="">
                        {d.document}
                      </td>
                      <td className="">
                        {FormatDate(d.dateCreated)}
                      </td>
                      <td className="">
                        {d.elementDI}
                      </td>
                      <td className="">
                        {d.typeElementDI}
                      </td>
                      <td className="">
                        {d.classification ? "Efectiva" : "No Efectiva"}
                      </td>
                      <td className="">
                        {d.objetive}
                      </td>
                      <td className="">
                        {d.programPerson}
                      </td>
                      <td className="">
                        {d.personProcess}
                      </td>
                      <td className="">
                        {d.areaPersonProcess}
                      </td>
                      <td className="">
                        {FormatDate(d.assignmentDate)}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DemandInduce;
