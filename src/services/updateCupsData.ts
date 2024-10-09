import { updateCupsDataEp } from "../utils/api-config";

export async function updateCupsData(data: FormData, id: number) {

  try {
    const response = await updateCupsDataEp(data, id);

    if (response.status === 200 || response.status === 201) {
      return response
    }

  } catch (error) {
    console.log(`Error al actualizar el cups ${error}`);
  }
}