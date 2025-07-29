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

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {chartData && chartData.length > 0 ? (
        <div className="h-80">
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
  );
};

export default PhoneCallStatisticsChart;
