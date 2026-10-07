import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";
import type { PpsActivity } from "@/featuures/PPS/models/IPps";

type UseLazyFetchPpsActivitiesReturn = {
  activities: PpsActivity[];
  isLoadingActivities: boolean;
  fetchActivities: (goalId: number) => Promise<PpsActivity[]>;
  clearActivities: () => void;
};

export const useLazyFetchPpsActivities =
  (): UseLazyFetchPpsActivitiesReturn => {
    const [activities, setActivities] = useState<PpsActivity[]>([]);
    const [isLoadingActivities, setIsLoadingActivities] =
      useState<boolean>(false);

    const fetchActivities = useCallback(
      async (goalId: number): Promise<PpsActivity[]> => {
        setIsLoadingActivities(true);
        try {
          const response = await api.get(
            `/pps/activities?goalId=${goalId}&onlyActive=true`
          );
          const list = response.data as PpsActivity[];
          setActivities(list);
          return list;
        } catch (error: unknown) {
          const err = error as AxiosError<{ message?: string }>;
          toast.error(
            err.response?.data?.message ?? "Error al cargar las actividades."
          );
          setActivities([]);
          return [];
        } finally {
          setIsLoadingActivities(false);
        }
      },
      []
    );

    const clearActivities = useCallback(() => {
      setActivities([]);
    }, []);

    return { activities, isLoadingActivities, fetchActivities, clearActivities };
  };
