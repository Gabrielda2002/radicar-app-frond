import { api } from "@/utils/api-config"

export const getCustomAgeStatics = async (endPoint: string) => {
    return await api.get(`/${endPoint}`)
}