import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsGoal } from "@/featuures/PPS/models/IPps";

type UseLazyFetchPpsGoalsReturn = {
  goals: PpsGoal[];
  isLoadingGoals: boolean;
  fetchGoals: (actionLineId: number) => Promise<PpsGoal[]>;
  clearGoals: () => void;
};

export const useLazyFetchPpsGoals = (): UseLazyFetchPpsGoalsReturn => {
  const [goals, setGoals] = useState<PpsGoal[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState<boolean>(false);

  const fetchGoals = useCallback(
    async (actionLineId: number): Promise<PpsGoal[]> => {
      setIsLoadingGoals(true);
      try {
        const response = await api.get(
          `/pps/goals?actionLineId=${actionLineId}&onlyActive=true`
        );
        const list = response.data as PpsGoal[];
        setGoals(list);
        return list;
      } catch (error: unknown) {
        const err = error as AxiosError<{ message?: string }>;
        toast.error(err.response?.data?.message ?? "Error al cargar las metas.");
        setGoals([]);
        return [];
      } finally {
        setIsLoadingGoals(false);
      }
    },
    []
  );

  const clearGoals = useCallback(() => {
    setGoals([]);
  }, []);

  return { goals, isLoadingGoals, fetchGoals, clearGoals };
};
