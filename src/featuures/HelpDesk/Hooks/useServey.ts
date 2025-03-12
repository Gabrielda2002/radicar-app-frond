import { useState } from "react";
import { createServeyEp } from "../Services/createServeyEp";
import { validateServeyTicketEp } from "../Services/validateServeyTicketEp";

const validationCache = new Map<string, {
    isValidate: boolean;
    timestamp: number;
}>();

export const useServey = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState<boolean>(false);

  const createServey = async (data: FormData) => {
    try {
      setLoading(true);

      const response = await createServeyEp(data);

        setSuccess(true);
        return response;
    } catch (error) {
      console.log("Error al registrar la encuesta ", error);
      setError(`Error inesperado al registrar la encuesta ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const validate = async (data: FormData ) => {
    try {
        
        const ticketId = data.get('ticketId')?.toString() || '';
        const userId = data.get('usuarioId')?.toString() || '';

        if(!ticketId || !userId) return;

        const cacheKey = `${ticketId}-${userId}`;
        const cachedResult = validationCache.get(cacheKey);
        const cacheExpiry = 1000 * 60 * 5; // 5 minutes

        // si hay resultado en cache y no a expirado usarlo
        if (cachedResult && (Date.now() - cachedResult.timestamp) < cacheExpiry) {
            setIsValidate(cachedResult.isValidate);
            return;
        }

        // si no hay cache o expiro lamar la api
        const response = await validateServeyTicketEp(data);

        if (response.status === 200) {
            setIsValidate(response.data.have);

            validationCache.set(cacheKey,  {
                isValidate: response.data.have,
                timestamp: Date.now()
            })
        }

    } catch (error) {
        console.log("Error al validar la encuesta ", error);
        setError(`Error inesperado al validar la encuesta ${error}`);
    }
  }

  return { error, success, loading, createServey, validate, isValidate };
};
