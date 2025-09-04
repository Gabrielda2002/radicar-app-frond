import { IDepartamentos } from "@/models/IDepartamentos";
import { api } from "@/utils/api-config";
import { useState, useCallback } from "react";

type UseLazyFetchDepartmentResult = {
  department: IDepartamentos[];
  loading: boolean;
  error: string | null;
  fetchDepartments: () => Promise<void>;
};

export const useLazyFetchDepartment = (): UseLazyFetchDepartmentResult => {
  const [department, setDepartment] = useState<IDepartamentos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = useCallback(async () => {
    // Si ya tenemos datos, no hacer la llamada nuevamente
    if (department.length > 0) return;

    setLoading(true);
    try {
      const response = await api.get("/departamentos");

      if (response.status === 200 || response.status === 201) {
        setDepartment(response.data);
        setError(null);
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, inténtelo de nuevo más tarde."
        );
      } else {
        setError(error.response?.data?.message || "Error al cargar departamentos");
      }
    } finally {
      setLoading(false);
    }
  }, [department.length]);

  return { department, loading, error, fetchDepartments };
};
