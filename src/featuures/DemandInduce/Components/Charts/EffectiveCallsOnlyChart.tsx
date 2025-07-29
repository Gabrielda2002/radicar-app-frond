import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EstadisticaProfesional } from '@/models/IStatisticsDemandInduced';

interface EffectiveCallsOnlyChartProps {
  efectivas: EstadisticaProfesional[];
  title?: string;
}

const EffectiveCallsOnlyChart: React.FC<EffectiveCallsOnlyChartProps> = ({ 
  efectivas, 
  title = "Llamadas Efectivas por Profesional"
}) => {
  // Preparar datos para gráfico
  const chartData = efectivas.map(item => ({
    profesional: item.profesional,
    cantidad: item.cantidad,
    porcentaje: item.porcentaje
  }));

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {data.profesional}
          </p>
          <div className="space-y-1">
            <p className="text-green-600 dark:text-green-400">
              Llamadas Efectivas: {data.cantidad}
            </p>
            <p className="text-blue-600 dark:text-blue-400">
              Porcentaje: {data.porcentaje}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {efectivas && efectivas.length > 0 ? (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="profesional" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 12 }}
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              className="text-gray-600 dark:text-gray-400"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="cantidad" 
              name="Llamadas Efectivas" 
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      ) : (
        <div className="flex items-center justify-center h-80">
          <p className="text-gray-500 dark:text-gray-400">
            No hay datos de llamadas efectivas disponibles
          </p>
        </div>
      )}
    </div>
  );
};

export default EffectiveCallsOnlyChart;
