
const TableBalancesVacations = () => {



  return (
    <>
      <div className="w-full max-w-full p-5 ml-0 bg-white rounded-md shadow-lg dark:bg-gray-800 mb-11 shadow-indigo-500/10">
              <div className="flex items-center my-5 gap-3">
                {/* filtros de la tabla1 */}
              </div>
              <table className="w-full">
                <thead className="text-gray-400 text-base">
                    <th className="text-start"># Id</th>
                    <th className="text-start">Colaborador</th>
                    <th className="text-start">periodos generados</th>
                    <th className="text-start">requiere revision</th>
                    <th className="text-start">observaciones</th>
                    <th className="text-center">Balances</th>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <td className="text-start py-4 text-gray-950 p-0 border-gray-500 dark:text-gray-50 dark:bg-gray-800">
                            1
                        </td>
                    </tr>
                </tbody>
              </table>
        </div>
    </>
  )
}

export default TableBalancesVacations
