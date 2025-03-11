import { createUsuario } from "@/utils/api-config";
import { useState } from "react";

export const useCreateUser = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

const createUser = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await createUsuario(data);
      
      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        setError(null);
        return response;
      }
    } catch (error: any) {
      if (error.response.status === 409) {
          setError("Numero de documento ya existe.");
      }else{
        setError(`Ocurrió un error al crear el usuario. ${error}`);
      }
    }finally{
        setLoading(false);
    }
  };

  return { createUser, success, error, loading };
};
