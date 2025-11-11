import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchBalances } from "../Hooks/useFetchBalances";
import ModalConfigBalance from "../Components/ModalConfigBalance";

const TableBalancesVacations = () => {
  const { data, loading, error, refetch } = useFetchBalances();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error != null ? (
        <div className="text-red-500 text-base">{error}</div>
      ) : (
        <div className="w-full max-w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
          <div className="flex items-center my-5 gap-3">
            {/* filtros de la tabla1 */}
          </div>
          <table className="w-full">
            <thead className="text-gray-400 text-base">
              <th className="text-start"># Id</th>
              <th className="text-start">Colaborador</th>
              <th className="text-start">Periodos</th>
              <th className="text-start">Revisión</th>
              <th className="text-start">Observaciones</th>
              <th className="text-center">Balances</th>
            </thead>
            <tbody>
              {data?.data?.map((b, index) => (
                <tr
                  className="border-b border-gray-200 dark:border-gray-700"
                  key={index}
                >
                  <td className="text-start py-4 text-gray-950 p-0 border-gray-500 dark:text-gray-50 dark:bg-gray-800">
                    {b.setupId}
                  </td>
                  <td className="text-start py-4 text-gray-950 p-0 border-gray-500 dark:text-gray-50 dark:bg-gray-800">
                    {b.userName}
                  </td>
                  <td className="text-start py-4 text-gray-400 p-0 border-gray-500 dark:text-gray-500 dark:bg-gray-800">
                    {b.periodosGenerados}
                  </td>
                  <td className="text-start py-4 text-gray-400 p-0 border-gray-500 dark:text-gray-500 dark:bg-gray-800">
                    {b.requiereRevision ? "Si" : "No"}
                  </td>
                  <td className="text-start py-4 text-gray-400 p-0 border-gray-500 dark:text-gray-500 dark:bg-gray-800">
                    {b.observaciones}
                  </td>
                  <td className="text-start py-4 text-gray-400 p-0 border-gray-500 dark:text-gray-500 dark:bg-gray-800">
                    <ModalConfigBalance balances={b.balances} onSuccess={refetch} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TableBalancesVacations;
