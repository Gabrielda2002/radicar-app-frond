import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { useStoreStatistics } from "../Store/useStoreStatistics";
import { IItemType } from "../strategies/ItemStrategy";

interface AgeStaticsProps {
  typeItem: IItemType;
  idHeadquartersSelected?: number;
}

const AgeStatics: React.FC<AgeStaticsProps> = ({
  typeItem,
  idHeadquartersSelected
}) => {
  const { age, isLoading, error, getAge } = useStoreStatistics();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    // Asegurar que el DOM esté listo antes de renderizar el gráfico
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getAge(typeItem, idHeadquartersSelected);
  }, [typeItem, idHeadquartersSelected]);

  // Formateador para los valores en el tooltip
  const formatTooltipValue = (value: number | undefined) => {
    if (value === undefined) return ["0", "Cantidad"];
    return [`${value} ${typeItem === "equipments" ? "equipos" : "items"}`, "Cantidad"];
  };

  // Formateador para mostrar la edad promedio en texto legible
  const formatAverageAge = () => {
    if (!age?.averageAge) return "N/A";
    
    const { years, months, days } = age.averageAge;
    const parts = [];
    
    if (years > 0) parts.push(`${Number(years).toFixed(1)} ${years === 1 ? "año" : "años"}`);
    if (months > 0) parts.push(`${Number(months).toFixed(1)} ${months === 1 ? "mes" : "meses"}`);
    if (days > 0) parts.push(`${Number(days).toFixed(1)} ${days === 1 ? "día" : "días"}`);
    
    return parts.join(', ');
  };

  return (
    <>
      <div className='flex min-w-0 flex-col gap-4 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800 sm:p-4'>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-md">
            {error}
          </div>
        ) : age ? (
          <div className='grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2'>
            {/* Gráfico de barras */}
            <div className='col-span-1 h-80 min-w-0 rounded-lg bg-gray-50 p-3 shadow-sm dark:bg-gray-700 sm:p-4'>
              <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Distribución por Edad</h2>
              {isMounted && (
                <ResponsiveContainer width="100%" height="90%" minHeight={250}>
                <BarChart
                  data={age.distribution}
                  margin={{ top: 5, right: 12, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip  formatter={formatTooltipValue} />
                  <Legend />
                  <Bar dataKey="value" name="Cantidad" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              )}
            </div>

            {/* Tarjeta con edad promedio */}
            <div className='flex min-w-0 flex-col gap-3 xl:h-80'>
              <div className='min-w-0 flex-1 overflow-hidden rounded-lg bg-green-50 p-4 shadow-sm dark:bg-green-900/30'>
                <h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>Edad Promedio</h3>
                <div className='flex min-h-24 flex-col items-center justify-center'>
                  <p className='text-center text-2xl font-bold leading-tight text-green-600 dark:text-green-400 sm:text-3xl'>{formatAverageAge()}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-2 text-center'>
                    Tiempo promedio de uso de los {typeItem === "equipments" ? "equipos" : "items"}
                  </p>
                </div>
              </div>
              
              <div className='min-w-0 flex-1 overflow-hidden rounded-lg bg-blue-50 p-4 shadow-sm dark:bg-blue-900/30'>
                <h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>Total Registros</h3>
                <div className='flex min-h-20 flex-col items-center justify-center'>
                  <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                    {age.total}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-2 text-center'>
                    {typeItem === "equipments" ? "Equipos registrados" : "Items registrados"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

// Notar que se renombra para usar PascalCase como es convención en React para componentes
export default AgeStatics;