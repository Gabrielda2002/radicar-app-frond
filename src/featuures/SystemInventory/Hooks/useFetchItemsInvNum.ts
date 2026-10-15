import { api } from "@/utils/api-config";
import { useCallback, useEffect, useState } from "react";

export interface IDuplicateItemDetail {
  source_table: string;
  id: number;
  name: string;
  inventory_number: string;
}

export interface IDuplicateInventoryGroup {
  inventoryNumber: string;
  occurrences: number;
  items: IDuplicateItemDetail[];
}

interface Return {
  items: IDuplicateInventoryGroup[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useFetchItemsInvNum = (): Return => {
  const [items, setItems] = useState<IDuplicateInventoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<IDuplicateInventoryGroup[]>('/general/inventory/duplicates');

      if (response.status === 200) {
        setItems(response.data);
      }
    } catch (error: unknown) {
      const err = error as { status?: number; response?: { data?: { message?: string } } };
      const msg = err.status === 500
        ? 'No se pudo conectar con el servidor'
        : err.response?.data?.message || 'Error al cargar items duplicados';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
};