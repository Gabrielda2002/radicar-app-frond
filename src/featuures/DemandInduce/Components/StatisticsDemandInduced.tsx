import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalFilterStatistics from "./ModalFilterStatistics";
import StatisticsByProgramChart from "./Charts/StatisticsByProgramChart";
import PhoneCallStatisticsChart from "./Charts/PhoneCallStatisticsChart";
import EffectiveCallsOnlyChart from "./Charts/EffectiveCallsOnlyChart";
import StatisticsSummaryCards from "./Charts/StatisticsSummaryCards";
import PercentageDistributionChart from "./Charts/PercentageDistributionChart";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useFetchStatistics } from "../Hooks/useFetchStatistics";

const StatisticsDemandInduced = () => {
  const {
    data: statistics,
    loading,
    error,
    fetchStatistics,
  } = useFetchStatistics();
  const [hasAppliedFilters, setHasAppliedFilters] = useState<boolean>(false);

  const handleFiltersApplied = async (filters: any) => {
    setHasAppliedFilters(true);
    await fetchStatistics(filters);
  };

  // Verificar si tenemos datos válidos
  const hasValidData =
    statistics &&
    statistics.estadisticasPorPrograma &&
    statistics.estadisticasPorPrograma.length > 0;
  return (
    <div className="p-6 space-y-6">
      {/* Header y Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Cuadro de Control de Demandas Inducidas
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Estadísticas y análisis de demandas inducidas por programa y
            profesional
          </p>
        </div>
        <ModalFilterStatistics onFiltersApplied={handleFiltersApplied} />
      </div>

      {/* Contenido Principal */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-64"
          >
            <LoadingSpinner />
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3">
              <div className="text-red-500 text-xl">⚠️</div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                  Error al cargar estadísticas
                </h3>
                <p className="text-red-600 dark:text-red-300 mt-1">{error}</p>
              </div>
            </div>
          </motion.div>
        ) : hasValidData ? (
          <motion.div
            key="statistics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Tarjetas Resumen */}
            <StatisticsSummaryCards statistics={statistics} />

            {/* Gráficas */}
            <div className="space-y-6">
              {/* Primera fila - Gráfico de barras por programa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <StatisticsByProgramChart
                  data={statistics.estResultadoLlamadasNoEfectivas}
                  title="Estadísticas resultado Llamadas No Efectivas"
                />
              </motion.div>

              {/* Segunda fila - Gráficos lado a lado */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Estadísticas de Llamadas */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {statistics.estadisticasLlamadasTelefonicas?.noEfectivas
                    ?.length > 0 ? (
                    <PhoneCallStatisticsChart
                      efectivas={
                        statistics.estadisticasLlamadasTelefonicas.efectivas
                      }
                      noEfectivas={
                        statistics.estadisticasLlamadasTelefonicas.noEfectivas
                      }
                      title="Estadísticas de Llamadas Efectivas y No Efectivas"
                    />
                  ) : (
                    <EffectiveCallsOnlyChart
                      efectivas={
                        statistics.estadisticasLlamadasTelefonicas?.efectivas ||
                        []
                      }
                      title="Llamadas Efectivas por Profesional"
                    />
                  )}
                </motion.div>

                {/* Distribución de Porcentajes */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <PercentageDistributionChart
                    data={statistics.estadisticasLlamadasNoEfectivas}
                    title="Distribución de Porcentajes"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : hasAppliedFilters ? (
          <motion.div
            key="no-data"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">�</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No hay datos disponibles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No se encontraron estadísticas con los filtros aplicados.
                Intenta ajustar los criterios de búsqueda.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">�</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Selecciona Filtros para Ver Estadísticas
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Haz clic en "Aplicar Filtros" para comenzar a visualizar las
                estadísticas de demandas inducidas.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                Configura elemento, programa, profesional, año y mes
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatisticsDemandInduced;
