import { api } from "@/utils/api-config"

export const EpUpdateGroupService = async (groupServices: number, id: number) => {
    const response = await api.put(`/update-group-services/${id}`, 
        {
            groupServices: groupServices
        }
    );

    return response;
}