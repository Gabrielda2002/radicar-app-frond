import React from "react";
import { useFetchAgeStatics } from "../Hooks/useFetchAgeStatics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

interface AgeStaticsProps {
  typeItem: string;
  idHeadquartersSelected?: number;
}

const AgeStatics: React.FC<AgeStaticsProps> = ({
  typeItem,
  idHeadquartersSelected
}) => {
  const { ageStatics, loading, error } = useFetchAgeStatics(typeItem, idHeadquartersSelected);

  // Formateador para los valores en el tooltip
  const formatTooltipValue = (value: number) => {
    return [`${value} ${typeItem === "equipos" ? "equipos" : "items"}`, "Cantidad"];
  };

  // Formateador para mostrar la edad promedio en texto legible
  const formatAverageAge = () => {
    if (!ageStatics?.averageAge) return "N/A";
    
    const { years, months, days } = ageStatics.averageAge;
    const parts = [];
    
    if (years > 0) parts.push(`${Number(years).toFixed(1)} ${years === 1 ? "año" : "años"}`);
    if (months > 0) parts.push(`${Number(months).toFixed(1)} ${months === 1 ? "mes" : "meses"}`);
    if (days > 0) parts.push(`${Number(days).toFixed(1)} ${days === 1 ? "día" : "días"}`);
    
    return parts.join(', ');
  };

  return (
    <>
      <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800'>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-md">
            {error}
          </div>
        ) : ageStatics ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Gráfico de barras */}
            <div className='col-span-1 h-80 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm'>
              <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Distribución por Edad</h2>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  data={ageStatics.distribution}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Bar dataKey="value" name="Cantidad" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tarjeta con edad promedio */}
            <div className='h-80 flex flex-wrap md:flex-col'>
              <div className='flex-1 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg shadow-sm mb-4'>
                <h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>Edad Promedio</h3>
                <div className='flex flex-col items-center justify-center h-full'>
                  <p className='text-3xl font-bold text-green-600 dark:text-green-400'>{formatAverageAge()}</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-2 text-center'>
                    Tiempo promedio de uso de los {typeItem === "equipos" ? "equipos" : "items"}
                  </p>
                </div>
              </div>
              
              <div className='flex-1 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-sm'>
                <h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>Total Registros</h3>
                <div className='flex flex-col items-center justify-center h-full'>
                  <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                    {ageStatics.total}
                  </p>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-2 text-center'>
                    {typeItem === "equipos" ? "Equipos registrados" : "Items registrados"}
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