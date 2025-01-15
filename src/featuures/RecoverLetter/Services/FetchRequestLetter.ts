import { IRequestLetter } from "@/models/IRequestLetter";
import { api } from "@/utils/api-config";

export const FetchRequestLetter = async (): Promise<IRequestLetter[]> => {
    const response = await api.get('/table-request-letter')
    const request = response.data.map( (request: IRequestLetter) => ({
        ...request,
        creatAt: new Date(request.creatAt)
    }))

    return request;
}