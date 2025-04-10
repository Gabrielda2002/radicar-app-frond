import { useState } from "react";
import { createItemIvGeneral } from "../Services/createItemIvGeneral";
import { updateItemIvGeneral } from "../Services/updateItemIvGeneral";

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

  const  updateItem =  async (data: FormData, id: number) => {
    setLoading(true);
    try {
      
      const response = await updateItemIvGeneral(data, id);

      if (response.status === 200 || response.status === 201) {
        setError(null);
        return response;
      }

    } catch (error: any) {
      if (error.response.status === 404) {
        setError("No se encontró el item: " + error);
      }
      setError("Error al actualizar el item: " + error);
    }
  }

    return { createItem, updateItem, error, loading };
};
