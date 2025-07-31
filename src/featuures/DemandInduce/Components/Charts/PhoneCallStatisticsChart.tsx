import React, { useState } from "react";
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
import { EstadisticaProfesional } from "@/models/IStatisticsDemandInduced";
import { useTheme } from "@/context/blackWhiteContext";

interface PhoneCallStatisticsChartProps {
  efectivas: EstadisticaProfesional[];
  noEfectivas: EstadisticaProfesional[];
  title?: string;
}

const PhoneCallStatisticsChart: React.FC<PhoneCallStatisticsChartProps> = ({
  efectivas,
  noEfectivas,
  title = "Estadísticas de Llamadas Telefónicas",
}) => {

  const {theme} = useTheme();
  const [isTooltipFixed, setIsTooltipFixed] = useState(false);
  const [fixedTooltipData, setFixedTooltipData] = useState<any>(null);

  // Combinar datos efectivas y no efectivas por profesional
  const combineData = () => {
    const professionalMap = new Map();

    // Agregar llamadas efectivas
    efectivas.forEach((item) => {
      professionalMap.set(item.profesional, {
        profesional: item.profesional,
        efectivas: item.cantidad,
        efectivasPorcentaje: item.porcentaje <= 0 ? 1 : item.porcentaje,
        noEfectivas: 0,
        noEfectivasPorcentaje: 0,
      });
    });

    // Agregar llamadas no efectivas
    noEfectivas.forEach((item) => {
      const existing = professionalMap.get(item.profesional);
      if (existing) {
        existing.noEfectivas = item.cantidad;
        existing.noEfectivasPorcentaje =
          item.porcentaje <= 0 ? 1 : item.porcentaje;
      } else {
        professionalMap.set(item.profesional, {
          profesional: item.profesional,
          efectivas: 0,
          efectivasPorcentaje: 0,
          noEfectivas: item.cantidad,
          noEfectivasPorcentaje: item.porcentaje <= 0 ? 1 : item.porcentaje,
        });
      }
    });

    return Array.from(professionalMap.values());
  };

  const chartData = combineData();

  const EffectiveLabelContent = (props: any) => {
    const { x, y, width, value, payload } = props;

    if (value === 0 || !payload || !payload.efectivasPorcentaje) {
      return null;
    }

    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#10B981"
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {payload.efectivasPorcentaje}
      </text>
    );
  };

  const NotEffectiveLabelContent = (props: any) => {
    const { x, y, width, value, payload } = props;
    if (value === 0 || !payload || !payload.noEfectivasPorcentaje) return null;

    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#EF4444"
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {payload.noEfectivasPorcentaje}
      </text>
    );
  };

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

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    // Si el tooltip está fijo, no mostrar el tooltip de hover
    if (isTooltipFixed) return null;
    
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {data.profesional}
          </p>
          <div className="space-y-1">
            <p className="text-green-600 dark:text-green-400">
              Efectivas: {data.efectivas} ({data.efectivasPorcentaje}%)
            </p>
            <p className="text-red-600 dark:text-red-400">
              No Efectivas: {data.noEfectivas} ({data.noEfectivasPorcentaje}%)
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm border-t pt-1">
              Total: {data.efectivas + data.noEfectivas}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Componente del tooltip fijo
  const FixedTooltipPanel = () => {
    if (!isTooltipFixed || !fixedTooltipData) return null;

    return (
      <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-w-md">
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            Resumen de Llamadas por Profesional
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
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {fixedTooltipData.map((item: any, index: number) => (
            <div
              key={index}
              className="border-b border-gray-100 dark:border-gray-700 pb-2 last:border-b-0"
            >
              <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {item.profesional}
              </p>
              <div className="space-y-1">
                <p className="text-green-600 dark:text-green-400 text-sm">
                  Efectivas: {item.efectivas} ({item.efectivasPorcentaje}%)
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm">
                  No Efectivas: {item.noEfectivas} ({item.noEfectivasPorcentaje}%)
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Total: {item.efectivas + item.noEfectivas}
                </p>
              </div>
            </div>
          ))}
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
        {chartData && chartData.length > 0 ? (
          <div className="h-80" onClick={handleChartClick}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 40, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="profesional"
                  angle={0}
                  tickMargin={10}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 20, fill: `${theme === "dark" ? "#ffffff" : "#000000"}` }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  className="text-gray-600 dark:text-gray-400"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="efectivas"
                  name="Llamadas Efectivas"
                  fill="#7EB77F"
                  radius={[2, 2, 0, 0]}
                  label={<EffectiveLabelContent />}
                />
                <Bar
                  dataKey="noEfectivas"
                  name="Llamadas No Efectivas"
                  fill="#A44A3F"
                  radius={[2, 2, 0, 0]}
                  label={<NotEffectiveLabelContent />}
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

export default PhoneCallStatisticsChart;
