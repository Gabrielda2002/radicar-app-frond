import { useState } from "react";
import { createItemIvGeneral } from "../Services/createItemIvGeneral";

export const useCreateItemIvGeneral = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createItem = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await createItemIvGeneral(data);

      if (response.status === 200 || response.status === 201) {
        setError(null);
        return response;
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setError("Revise los campos: " + error);
        {
        }
        setError("Error al crear el item: " + error);
      }
    } finally {
      setLoading(false);
    }
  };
    return { createItem, error, loading };
};
