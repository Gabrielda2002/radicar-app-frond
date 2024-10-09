import { createPacienteEp } from "../utils/api-config";

export async function createPaciente(data: FormData) {
  try {
    const response = await createPacienteEp(data);

    if (response.status === 200 || response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(`Error al crear el paciente ${error}`);
  }
}