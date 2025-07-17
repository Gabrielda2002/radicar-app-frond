import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { EstadisticasPorPrograma } from '@/models/IStatisticsDemandInduced';

interface PercentageDistributionChartProps {
  data: EstadisticasPorPrograma[];
  title?: string;
}

const PercentageDistributionChart: React.FC<PercentageDistributionChartProps> = ({ 
  data, 
  title = "Distribución de Porcentajes por Programa" 
}) => {
  // Colores para el gráfico
  const COLORS = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', 
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

  // Preparar los datos para el gráfico de dona
  const chartData = data.map((item, index) => ({
    name: item.programa.length > 25 ? `${item.programa.substring(0, 25)}...` : item.programa,
    nombreCompleto: item.programa,
    value: item.porcentaje,
    cantidad: item.cantidad,
    elemento: item.elemento,
    profesional: item.profesional,
    color: COLORS[index % COLORS.length]
  }));

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {data.nombreCompleto}
          </p>
          <div className="space-y-1">
            <p className="text-blue-600 dark:text-blue-400">
              Porcentaje: {data.value}%
            </p>
            <p className="text-green-600 dark:text-green-400">
              Cantidad: {data.cantidad}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Elemento: {data.elemento}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Profesional: {data.profesional}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Renderizar etiquetas personalizadas
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // No mostrar etiquetas para porcentajes muy pequeños
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px',
                paddingTop: '20px'
              }}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }}>
                  {value} ({entry.payload.value}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {data.length === 0 && (
        <div className="flex items-center justify-center h-80">
          <p className="text-gray-500 dark:text-gray-400">
            No hay datos disponibles para mostrar
          </p>
        </div>
      )}
    </div>
  );
};

export default PercentageDistributionChart;
