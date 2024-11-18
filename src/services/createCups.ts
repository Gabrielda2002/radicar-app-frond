import { createCupsEp } from "../utils/api-config";

export async function createCups(data: FormData, ep: string) {

  try {
    const response = await createCupsEp(data, ep);

    if (response.status === 200 || response.status === 201) {
      return response
    }

  } catch (error) {
    console.log(`Error al crear el cups ${error}`);
  }
}