import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsActionLine } from "@/featuures/PPS/models/IPps";

type UseLazyFetchPpsActionLinesReturn = {
  actionLines: PpsActionLine[];
  isLoadingActionLines: boolean;
  fetchActionLines: () => Promise<PpsActionLine[]>;
};

export const useLazyFetchPpsActionLines =
  (): UseLazyFetchPpsActionLinesReturn => {
    const [actionLines, setActionLines] = useState<PpsActionLine[]>([]);
    const [isLoadingActionLines, setIsLoadingActionLines] =
      useState<boolean>(false);

    const fetchActionLines = useCallback(async (): Promise<PpsActionLine[]> => {
      if (actionLines.length > 0) return actionLines;
      setIsLoadingActionLines(true);
      try {
        const response = await api.get("/pps/action-lines?onlyActive=true");
        const list = response.data as PpsActionLine[];
        setActionLines(list);
        return list;
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        toast.error(
          err.response?.data?.message ?? "Error al cargar las líneas de acción."
        );
        return [];
      } finally {
        setIsLoadingActionLines(false);
      }
    }, [actionLines]);

    return { actionLines, isLoadingActionLines, fetchActionLines };
  };
