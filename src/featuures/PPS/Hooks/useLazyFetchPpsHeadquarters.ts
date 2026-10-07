import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsHeadquartersOption } from "@/featuures/PPS/models/IPps";

type UseLazyFetchPpsHeadquartersReturn = {
  headquarters: PpsHeadquartersOption[];
  isLoadingHeadquarters: boolean;
  fetchHeadquarters: () => Promise<PpsHeadquartersOption[]>;
};

export const useLazyFetchPpsHeadquarters =
  (): UseLazyFetchPpsHeadquartersReturn => {
    const [headquarters, setHeadquarters] = useState<PpsHeadquartersOption[]>(
      []
    );
    const [isLoadingHeadquarters, setIsLoadingHeadquarters] =
      useState<boolean>(false);

    const fetchHeadquarters = useCallback(async (): Promise<
      PpsHeadquartersOption[]
    > => {
      if (headquarters.length > 0) return headquarters;
      setIsLoadingHeadquarters(true);
      try {
        const response = await api.get("/headquarters/headquarters");
        const list = response.data as PpsHeadquartersOption[];
        setHeadquarters(list);
        return list;
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        toast.error(err.response?.data?.message ?? "Error al cargar las sedes.");
        return [];
      } finally {
        setIsLoadingHeadquarters(false);
      }
    }, [headquarters]);

    return { headquarters, isLoadingHeadquarters, fetchHeadquarters };
  };
