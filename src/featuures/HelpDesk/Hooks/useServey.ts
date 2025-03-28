import { useState } from "react";
import { createServeyEp } from "../Services/createServeyEp";
export const useServey = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  return { error, success, loading, createServey };
};
