import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import ModalCreateDI from "../Components/ModalCreateDI";
import { useFetchDI } from "../Hooks/useFetchDI";

const DemandInduce = () => {
  const { data, loading, error } = useFetchDI();

  return (
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
                <th>Documento</th>
                <th>Fecha Creacion</th>
                <th>TipoDemanda inducida</th>
                <th>Resumen Demanda Inducida</th>
                <th>Paciente</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600 dark:text-gray-300">
              {data.map((d) => (
                <tr
                  key={d.id}
                  className="transition duration-200 ease-in-out bg-white shadow-md dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{d.document}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(d.dateCreated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {d.typeElementDI}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {d.summaryCall}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {d.personProcess}
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

export default DemandInduce;
