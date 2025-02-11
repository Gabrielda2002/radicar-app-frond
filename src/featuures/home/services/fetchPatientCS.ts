import { IPacientesCoosalud } from "@/models/IPacientesCoosalud";
import { api } from "@/utils/api-config";

export const fetchPatientCSEp = async (identificacion: string): Promise<IPacientesCoosalud> => {
    const response = await api.post('/paciente-identificacion', {
        numeroIdentificacion: identificacion
    })

    return response.data;
}