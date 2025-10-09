import ModalSection from "@/components/common/HeaderPage/HeaderPage";
import { UseMutationsPermission } from "../hook/useMutationsPermission";
import { FormatDate } from "@/utils/FormatDate";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import ModalPermissionsActions from "../components/ModalPermissionsActions";

const Permission = () => {
  const { data, error, isLoading } = UseMutationsPermission();

  return (
    <>
      {isLoading ? (
      <LoadingSpinner  />
      ) : error != null ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
          <ModalSection
            title="Solicitudes de Permisos"
            breadcrumb={[
              { label: "Inicio", path: "/" },
              { label: "Solicitudes de Permisos", path: "/permissions" },
            ]}
          />
          <div className="w-full max-w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
            <table className="w-full">
              <thead className="text-gray-400 text-base">
                <tr>
                  <th className="text-start">Colaborador</th>
                  <th className="text-start">Area</th>
                  <th className="text-start">Categoria</th>
                  <th className="text-start">Granularidad</th>
                  <th className="text-start">Fecha Solicitud</th>
                  <th className="text-start">Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((p) => (
                    <tr
                      className="border-b border-gray-200 dark:border-gray-700"
                      key={p.id}
                    >
                      <td className="text-start py-4 text-gray-950 p-0 bg-gray-50 dark:text-gray-50 dark:bg-gray-800">
                        {p.requesterName}
                      </td>
                      <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                        {p.category}
                      </td>
                      <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                        {p.category}
                      </td>
                      <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                        {p.granularity}
                      </td>
                      <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                        {FormatDate(p.createdAt)}
                      </td>
                      <td className="text-start text-gray-500 p-0 bg-gray-50  dark:bg-gray-800">
                        {p.overallStatus}
                      </td>
                      <td className="text-center p-0 bg-gray-50  dark:bg-gray-800">
                        <ModalPermissionsActions
                          permission={p}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Permission;
