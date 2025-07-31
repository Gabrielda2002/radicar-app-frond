import React, { useState } from "react";
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
import { useTheme } from "@/context/blackWhiteContext";

interface StatisticsByProgramChartProps {
  data: EstResultadoLlamadasNoEfectivas[];
  title?: string;
}

const StatisticsResultCallChart: React.FC<StatisticsByProgramChartProps> = ({
  data,
  title = "Estadísticas por Programa",
}) => {

  const { theme } = useTheme();
  const [isTooltipFixed, setIsTooltipFixed] = useState(false);
  const [fixedTooltipData, setFixedTooltipData] = useState<any>(null);

  const totalResultsCall = data
    .map((item) => item.cantidad)
    .reduce((acc, curr) => acc + curr, 0);
  const chartData = data.map((item) => ({
    cantidad: item.cantidad,
    resultadoLlamada: item.resultadoLlamada,
    percent: (item.cantidad / totalResultsCall) * 100,
  }));

  // Función para manejar el clic en el gráfico
  const handleChartClick = () => {
    if (!isTooltipFixed) {
      setIsTooltipFixed(true);
      setFixedTooltipData(chartData);
    }
  };

  // Función para cerrar el tooltip fijo
  const handleCloseFixedTooltip = () => {
    setIsTooltipFixed(false);
    setFixedTooltipData(null);
  };

  // Tooltip personalizado que muestra todos los datos
  const CustomTooltip = ({ active }: any) => {
    // Si el tooltip está fijo, no mostrar el tooltip de hover
    if (isTooltipFixed) return null;
    
    if (active && chartData && chartData.length > 0) {
      // Calcular el total
      const total = chartData.reduce((sum, item) => sum + item.cantidad, 0);

      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-w-md">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Resumen de Resultados de Llamadas
          </p>
          <div className="space-y-2 max-h-fit overflow-y-auto">
            {chartData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 justify-between items-center"
              >
                <p className="text-gray-700 dark:text-gray-300 text-sm pr-2">
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

  // Componente del tooltip fijo
  const FixedTooltipPanel = () => {
    if (!isTooltipFixed || !fixedTooltipData) return null;

    const total = fixedTooltipData.reduce((sum: number, item: any) => sum + item.cantidad, 0);

    return (
      <div className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-w-md">
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Resumen de Resultados de Llamadas
          </p>
          <button
            onClick={handleCloseFixedTooltip}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2 max-h-fit overflow-y-auto">
          {fixedTooltipData.map((item: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-3 justify-between items-center"
            >
              <p className="text-gray-700 dark:text-gray-300 text-sm pr-2">
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
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {!isTooltipFixed && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Haz clic en el gráfico para fijar la información
            </p>
          )}
        </div>
        {data && data.length > 0 ? (
          <div className="h-80" onClick={handleChartClick}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="resultadoLlamada"
                  tickMargin={10}
                  height={80}
                  interval={0}
                  tick={{ fontSize: 20, fill: `${theme === "dark" ? "#ffffff" : "#000000"}` }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-gray-600 dark:text-gray-400"
                />
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend /> */}
                <Bar
                  dataKey="cantidad"
                  name="Cantidad"
                  fill="#46ACC2"
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
      
      {/* Panel de tooltip fijo */}
      <FixedTooltipPanel />
    </>
  );
};

export default StatisticsResultCallChart;
