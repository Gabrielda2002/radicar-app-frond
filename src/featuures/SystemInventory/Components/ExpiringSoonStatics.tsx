import { useFetchExpiringSoon } from '../Hooks/useFetchExpiringSoon'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import React from 'react';

interface ExpiringSoonStaticsProps {
  typeItem: string;
  idHeadquartersSelected?: number;
}

const ExpiringSoonStatics: React.FC<ExpiringSoonStaticsProps> = ({
  typeItem,
  idHeadquartersSelected
}) => {
  const { expiringSoon, loading, error } = useFetchExpiringSoon(typeItem, idHeadquartersSelected);

  // Colores para el gráfico circular
  const COLORS = ['#0088FE', '#FF8042']; // Azul para en garantía, Naranja para sin garantía

  // Preparar datos para el gráfico circular
  const prepareChartData = () => {
    if (!expiringSoon) return [];

    // Calcular equipos sin garantía
    const outOfWarranty = expiringSoon.total - expiringSoon.inWarranty;
    
    return [
      { name: 'En Garantía', value: expiringSoon.inWarranty },
      { name: 'Sin Garantía', value: outOfWarranty }
    ];
  };

  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
  }: { 
    cx: number; 
    cy: number; 
    midAngle: number; 
    innerRadius: number; 
    outerRadius: number; 
    percent: number; 
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const chartData = prepareChartData();

  return (
    <>
      <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800'>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-md">
            {error}
          </div>
        ) : expiringSoon ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Gráfico circular */}
            <div className='h-64 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm'>
              <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Distribución de Garantías</h2>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} equipos`, 'Cantidad']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tarjetas con información detallada */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-sm'>
                <h3 className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total equipos</h3>
                <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{expiringSoon.total}</p>
              </div>
              <div className='bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-sm'>
                <h3 className='text-sm font-medium text-gray-600 dark:text-gray-400'>En Garantía</h3>
                <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{expiringSoon.inWarranty}</p>
              </div>
              <div className='bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg shadow-sm'>
                <h3 className='text-sm font-medium text-gray-600 dark:text-gray-400'>Sin Garantía</h3>
                <p className='text-2xl font-bold text-orange-600 dark:text-orange-400'>{expiringSoon.total - expiringSoon.inWarranty}</p>
              </div>
              <div className='bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg shadow-sm'>
                <h3 className='text-sm font-medium text-gray-600 dark:text-gray-400'>Por expirar</h3>
                <p className='text-2xl font-bold text-amber-600 dark:text-amber-400'>{expiringSoon.expiringSoon.count}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default ExpiringSoonStatics