import Button from "@/components/common/Ui/Button"
import ModalDefault from "@/components/common/Ui/ModalDefault"
import { useFetchDI } from "../Hooks/useFetchDI";
import { useState } from "react";

const ModalSummaryDI = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { calculateSummary } = useFetchDI();

  const summary = calculateSummary();

  return (
    <>
    <Button
      variant="outline"
      onClick={() => setIsOpen(true)}
      size="md"
      className="truncate md:w-auto md:max-w-xs ml-0"
    >
      Resumen DI
    </Button>
      <ModalDefault
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Resumen de Demandas Inducidas"
        size="lg"
      >
        <div className="space-y-6">
          {/* Resumen General */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Resumen General
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {summary.totalRecords}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Registros
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {summary.totalClassified}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Clasificadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {summary.totalUnclassified}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Sin Clasificar
                </div>
              </div>
            </div>
          </div>

          {/* Resumen por Elemento DI */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Por Elemento DI
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Elemento DI
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Clasificadas
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Sin Clasificar
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      % Clasificación
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {summary.byElement.map((element, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {element.elementDI}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-100">
                        {element.total}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-green-600 dark:text-green-400">
                        {element.classified}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-red-600 dark:text-red-400">
                        {element.unclassified}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-100">
                        {element.total > 0 ? ((element.classified / element.total) * 100).toFixed(1) : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ModalDefault>
    </>
  )
}

export default ModalSummaryDI
