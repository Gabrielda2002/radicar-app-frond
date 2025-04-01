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
        surgery: radicado.surgery.map(c => ({
            ...c,
            surgeryDate: new Date(c.surgeryDate),
            dateParaclinico: new Date(c.dateParaclinico),
            dateAnestesiology: new Date(c.dateAnestesiology),
            seguimiento: c.seguimiento.map(s => ({
                ...s,
                fechaCreacion: new Date(s.fechaCreacion)
            }))
        }))
    }));
    console.log(radicados)
    return radicados;
}