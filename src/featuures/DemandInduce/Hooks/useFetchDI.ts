import { IDemandInduced } from "@/models/IDemandInduced";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

// Interfaces para el resumen
export interface ISummaryByElement {
  elementDI: string;
  total: number;
  classified: number;
  unclassified: number;
}

export interface IDISummary {
  totalRecords: number;
  totalClassified: number;
  totalUnclassified: number;
  byElement: ISummaryByElement[];
}

export const useFetchDI = () => {
  const [data, setData] = useState<IDemandInduced[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDI = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/demanda/inducida");

      if (response.status === 200 || response.status === 201) {
        // Convertir los strings de fecha a objetos Date
        const transformedData = response.data.map((item: any) => ({
          ...item,
          dateCreated: new Date(item.dateCreated),
          dateCall: item.dateCall ? new Date(item.dateCall) : null,
          dateSend: item.dateSend ? new Date(item.dateSend) : null,
          dateVisit: item.dateVisit ? new Date(item.dateVisit) : null,
          assignmentDate: new Date(item.assignmentDate),
          classification: Boolean(item.classification),
          dificulties: Boolean(item.dificulties),
          conditionUser: Boolean(item.conditionUser),
        }));
        
        setData(transformedData);
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        setError(
          "Error interno del servidor. Por favor, inténtelo más tarde."
        );
      } else {
        setError(
          "Error al obtener las demandas inducidas: " +
            (error.response?.data?.message || error.message)
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para refrescar los datos manualmente
  const refetch = useCallback(() => {
    fetchDI();
  }, [fetchDI]);

  useEffect(() => {
    fetchDI();
  }, [fetchDI]);

  // Función para calcular el resumen
  const calculateSummary = useCallback((customData?: IDemandInduced[]): IDISummary => {
    const dataToUse = customData || data;
    
    const summary: IDISummary = {
      totalRecords: dataToUse.length,
      totalClassified: 0,
      totalUnclassified: 0,
      byElement: []
    };

    // Contar totales generales
    summary.totalClassified = dataToUse.filter(item => item.classification).length;
    summary.totalUnclassified = dataToUse.filter(item => !item.classification).length;

    // Agrupar por elementDI
    const elementGroups = dataToUse.reduce((acc, item) => {
      const element = item.elementDI;
      if (!acc[element]) {
        acc[element] = {
          elementDI: element,
          total: 0,
          classified: 0,
          unclassified: 0
        };
      }
      acc[element].total++;
      if (item.classification) {
        acc[element].classified++;
      } else {
        acc[element].unclassified++;
      }
      return acc;
    }, {} as Record<string, ISummaryByElement>);

    summary.byElement = Object.values(elementGroups);

    return summary;
  }, [data]);

  return {
    data,
    error,
    loading,
    refetch,
    calculateSummary,
  };
};
