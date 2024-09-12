import { updatePatientData } from "../utils/api-config"

export const submitRadicado = async (data: FormData, idPaciente: string) => {
    try {
        
        const pacienteResponse = await updatePatientData(data, idPaciente)

    } catch (error) {
        console.log(error)
    }
}