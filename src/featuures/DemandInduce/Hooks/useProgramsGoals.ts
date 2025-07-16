import { IProgramsGoals } from "@/models/IProgramsGoals";
import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useProgramsGoals = () => {
  const [data, setData] = useState<IProgramsGoals[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProgramsGoals = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<IProgramsGoals[]>("/metas/programas");

      if (response.status === 200 || response.status === 201) {
        setData(response.data);
        setError(null);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Error al cargar las metas de los programas"
      );
    } finally {
      setLoading(false);
    }
  }, []); // Sin dependencias para evitar loops infinitos

  const refetch = useCallback(() => {
    fetchProgramsGoals();
  }, [fetchProgramsGoals]);

  useEffect(() => {
    fetchProgramsGoals();
  }, [fetchProgramsGoals]);

  const handleUpdateGoal = async (
    goalId: string,
    data: Record<string, any>
  ) => {
    try {
      setLoading(true);

      const dataToSave = data[goalId];

      const response = await api.post<IProgramsGoals>(
        `/metas/programas`,
        dataToSave
      );

      if (response.status === 200 || response.status === 201) {
        await fetchProgramsGoals(); // Usar await para asegurar actualización
        toast.success("Meta actualizada correctamente");
        setError(null);
        return response;
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        setError("Error interno del servidor, por favor intente más tarde");
      } else {
        setError(error.response?.data?.message || "Error al actualizar");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (data: Object) => {
    try {
        
        setLoading(true);

        const response = await api.post<IProgramsGoals>(
          `/metas/programas`,
            data
        );

        if (response.status === 200 || response.status === 201) {
            setError(null);
            return response;
        }

    } catch (error: any) {
        if (error.response?.status === 500) {
            setError(`Error interno del servidor, por favor intente más tarde: ${error.response?.data?.message}`);
        } else {
            setError(error.response?.data?.message || "Error al crear la meta");
        }
    }finally{
        setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    fetchProgramsGoals,
    refetch,
    handleUpdateGoal,
    handleCreateGoal,
  };
};
