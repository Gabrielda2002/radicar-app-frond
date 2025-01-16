import { IAuditLetter } from "@/models/IAuditLetter";
import { api } from "@/utils/api-config";

export const FetchAuditLetter = async (): Promise<IAuditLetter[]> => {
    const response = await api.get('/table-response-letter');
    const audit = response.data.map( (audit: IAuditLetter) => ({
        ...audit,
        creatAt: new Date(audit.creatAt)
    }))
    return audit;
}