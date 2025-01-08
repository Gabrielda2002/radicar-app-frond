import { updatePacienteEp } from "@/utils/api-config";

export const UpdatePatient = async (data: FormData, id: number) => {
    try {
        
        const response = await updatePacienteEp(data, id);

        if (response.status === 200 || response.status === 201) {
            return response;
        }

    } catch (error) {
        console.log(`Error al actualizar el paciente ${error}`);
    }
}