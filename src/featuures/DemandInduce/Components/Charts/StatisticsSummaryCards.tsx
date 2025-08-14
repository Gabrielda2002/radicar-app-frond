import React from 'react';
import { IStatisticsDemandInduced } from '@/models/IStatisticsDemandInduced';

interface StatisticsSummaryCardsProps {
  statistics: IStatisticsDemandInduced;
}

const StatisticsSummaryCards: React.FC<StatisticsSummaryCardsProps> = ({ statistics }) => {
  // Calcular totales
  const totalCantidadProgramas = statistics.cantidadDemandInduced.reduce((acc, curr) => acc + curr.cantidad, 0);
  const totalEfectivas = statistics.estadisticasLlamadasTelefonicas.efectivas.reduce((acc, curr) => acc + curr.cantidad, 0);
  const totalNoEfectivas = statistics.estadisticasLlamadasTelefonicas.noEfectivas.reduce((acc, curr) => acc + curr.cantidad, 0);
  const totalLlamadas = totalEfectivas + totalNoEfectivas;
  const porcentajeMeta = statistics.meta ? ((statistics.cantidadDemandInduced.reduce((acc, curr) => acc + curr.cantidad, 0) / statistics.meta) * 100).toFixed(1) : 0;
  const cantidadFaltanes = statistics.meta ? (statistics.meta - totalCantidadProgramas) : 0;

  // Calcular porcentaje de efectividad
  const porcentajeEfectividad = totalLlamadas > 0 ? ((totalEfectivas / totalLlamadas) * 100).toFixed(1) : 0;

  const cards = [
    {
      title: "Meta mensual",
      value: statistics.meta,
      icon: "🎯",
      color: "bg-blue-500",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Total DI Registrados (programa y profesional seleccionados)",
      value: totalCantidadProgramas,
      icon: "⚡",
      color: "bg-purple-500",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Cantidad Faltante",
      value: cantidadFaltanes,
      icon: "❗",
      color: "bg-teal-500",
      textColor: "text-teal-600 dark:text-teal-400"
    },
    {
      title: "Porcentaje de Meta Alcanzada",
      value: `${porcentajeMeta}%`,
      icon: "📈",
      color: "bg-yellow-500",
      textColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
      title: "Efectivas",
      value: totalEfectivas,
      icon: "✅",
      color: "bg-green-500",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "No Efectivas",
      value: totalNoEfectivas,
      icon: "❌",
      color: "bg-red-500",
      textColor: "text-red-600 dark:text-red-400"
    },
    {
      title: "Efectividad de Llamadas",
      value: `${porcentajeEfectividad}%`,
      icon: "📈",
      color: "bg-amber-500",
      textColor: "text-amber-600 dark:text-amber-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 mb-6">
      {cards
      .filter(card => {
        // Excluir tarjetas con valor 0, null, undefined o arrays vacíos
        if (Array.isArray(card.value)) {
        return card.value.length > 0;
        }
        // Si es string con %, extraer número
        if (typeof card.value === 'string' && card.value.endsWith('%')) {
        const num = parseFloat(card.value);
        return !isNaN(num) && num > 0;
        }
        return !!card.value && card.value !== 0;
      })
      .map((card, index) => (
        <div 
        key={index}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
        >
        <div className="flex items-center justify-between">
          <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 truncate">
            {card.title}
          </p>
          <p className={`text-2xl font-bold ${card.textColor}`}>
            {card.value}
          </p>
          </div>
          <div className={`p-3 rounded-full ${card.color} bg-opacity-10`}>
          <span className="text-2xl">{card.icon}</span>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsSummaryCards;
