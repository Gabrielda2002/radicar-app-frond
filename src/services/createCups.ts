import { createCupsEp } from "../utils/api-config";

export async function createCups(data: FormData) {

  try {
    const response = await createCupsEp(data);

    if (response.status === 200 || response.status === 201) {
      return response
    }

  } catch (error) {
    console.log(`Error al crear el cups ${error}`);
  }
}