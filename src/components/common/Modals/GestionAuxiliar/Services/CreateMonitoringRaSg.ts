import { api } from "@/utils/api-config"

export const CreateMonitoringRaSg = async (data: FormData, endpoint: string) => {
    return api.post(`/${endpoint}`, data)
}