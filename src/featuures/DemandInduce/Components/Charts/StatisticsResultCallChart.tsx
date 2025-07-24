import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { EstResultadoLlamadasNoEfectivas } from "@/models/IStatisticsDemandInduced";

interface StatisticsByProgramChartProps {
  data: EstResultadoLlamadasNoEfectivas[];
  title?: string;
}

const StatisticsResultCallChart: React.FC<StatisticsByProgramChartProps> = ({
  data,
  title = "Estadísticas por Programa",
}) => {

  const totalResultsCall = data.length;
  // Preparar los datos para el gráfico
  const chartData = data.map((item) => ({
    cantidad: item.cantidad,
    resultadoLlamada: item.resultadoLlamada,
    percent: (item.cantidad / totalResultsCall) * 100,
  }));

  // Tooltip personalizado que muestra todos los datos
  const CustomTooltip = ({ active }: any) => {
    if (active && chartData && chartData.length > 0) {
      // Calcular el total
      const total = chartData.reduce((sum, item) => sum + item.cantidad, 0);
      
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Resumen de Resultados de Llamadas
          </p>
          <div className="space-y-2 max-h-fit overflow-y-auto">
            {chartData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 justify-between items-center">
                <p className="text-gray-700 dark:text-gray-300 text-sm truncate pr-2">
                  {item.resultadoLlamada}:
                </p>
                <p className="text-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {item.cantidad}
                </p>
                <p className="text-right text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {`${item.percent.toFixed(1)}%`}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-3">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Total:
              </p>
              <p className="font-bold text-blue-600 dark:text-blue-400">
                {total}
              </p>
            </div>
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
      {data && data.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="resultadoLlamada"
                angle={-35}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 12 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis
                tick={{ fontSize: 20 }}
                className="text-gray-600 dark:text-gray-400"
              />
              <Tooltip content={<CustomTooltip />} />
              {/* <Legend /> */}
              <Bar
                dataKey="cantidad"
                name="Cantidad"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-80">
          <p className="text-gray-500 dark:text-gray-400">
            No hay datos disponibles para mostrar
          </p>
        </div>
      )}
    </div>
  );
};

export default StatisticsResultCallChart;
