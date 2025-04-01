import { IRadicados } from "@/models/IRadicados";
import { api } from "@/utils/api-config";

export const fetchRadicadoDocumentoEp = async (documento: string): Promise<IRadicados[]> => {
    const response = await api.post('/radicado-doc-patient', {
        documento: documento
    });
    const radicados = response.data.map((radicado: IRadicados) => ({
        ...radicado,
        createdAt: new Date(radicado.createdAt),
        // auditDate: radicado.auditDate ? new Date(radicado.auditDate) : null
    }));
    return radicados;
}