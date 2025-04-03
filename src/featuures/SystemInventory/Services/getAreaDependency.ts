import { api } from "@/utils/api-config"

export const getAreaDependency =  async () => {
    return await api.get('/area-dependencia')
}