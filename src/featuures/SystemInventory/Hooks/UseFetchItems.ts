import { useCallback, useEffect, useState } from "react";
import { api } from "@/utils/api-config";
import { IItems } from "@/models/IItems";
import { IItemsNetworking } from "@/models/IItemsNetworking";
import { IItemsGeneral } from "../Models/IItemsGeneral";
import { IItemsTv } from "../Models/IItemsTv";

const useFetchItems = (id: number | null, tipoItem: "equipos" | "dispositivos-red" | "inventario/general" | 'inventario/televisores' | null) => {
  const [items, setItems] = useState<IItems[] | IItemsNetworking[] | IItemsGeneral[]| IItemsTv[] | null>(null);
  const [loadingItems, setLoading] = useState<boolean>(true);
  const [errorItems, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    if (!id || !tipoItem) return;

    try {
      const response = await api.get(`/${tipoItem}-sede/${id}`);
      if (response.data.length === 0) {
        setError("No se encontraron resultados");
        setItems(null);
      } else {
        setItems(response.data);
        setError(null);
      }
    } catch (error) {
      setError(`Ocurrió un error al obtener las items.`);
      setItems(null);
    } finally {
      setLoading(false);
    }
  }, [id, tipoItem]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loadingItems, errorItems, refetch: fetchItems };
};

export default useFetchItems;