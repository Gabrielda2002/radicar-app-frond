import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
  // Preparar los datos para el gráfico
  const chartData = data.map((item) => ({
    cantidad: item.cantidad,
    resultadoLlamada: item.resultadoLlamada,
  }));

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {data.resultadoLlamada}
          </p>
          <p className="text-blue-600 dark:text-blue-400">
            Cantidad: {data.cantidad}
          </p>
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
                dataKey="programa"
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
