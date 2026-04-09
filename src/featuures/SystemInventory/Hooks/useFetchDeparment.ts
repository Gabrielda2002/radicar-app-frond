// * traer departamentos

import { IDepartamentos } from "@/models/IDepartamentos";
import { api } from "@/utils/api-config";
import { useEffect, useState } from "react";

type UseFetchDepartmentResult = {
  department: IDepartamentos[];
  loading: boolean;
  errordepartment: string | null;
};

export const useFetchDepartment = (): UseFetchDepartmentResult => {
  const [department, setDepartment] = useState<IDepartamentos[]>([]);
  const [loading, setLoading] = useState(false);
  const [errordepartment, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/departamentos");

        if (response.status === 200 || response.status === 201) {
          setDepartment(response.data);
          setError(null);
        }
      } catch (error: any) {
        if (error.response.status === 500) {
          setError(
            "Error del servidor. Por favor, inténtelo de nuevo más tarde."
          );
        } else {
          setError(error.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return { department, loading, errordepartment };
};
