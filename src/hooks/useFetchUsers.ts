import { useEffect, useState } from "react";
import {
  fetchUsers,
} from "../services/apiService";
import { IRadicados } from "../models/IRadicados";

export const useFetchUsers = () => {
  const [data, setData] = useState<IRadicados[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await fetchUsers();
        setData(users);
      } catch (error) {
        setError("Error al obtener los datos de la tabla radicación o no tienes los permisos necesarios. " + error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, loading, error };
};

 
