// * traer departamentos

import { IDepartamentos } from "@/models/IDepartamentos";
import { fetchDepartarmentsEp } from "@/services/apiService";
import { useEffect, useState } from "react";

export const useFetchDepartment = () => {
  const [department, setDepartment] = useState<IDepartamentos[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [errordepartment, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const cirugias = await fetchDepartarmentsEp();
        setDepartment(cirugias);
        setError(null);
      } catch (error) {
        setError("Error al obtener los departamentos o no tienes los permisos necesarios. " + error);
        setDepartment(null);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  return { department, loading, errordepartment };
}