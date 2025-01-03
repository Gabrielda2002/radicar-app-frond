import { saveCups, saveFileRadicar, saveRadicar, updatePatientData } from "@/utils/api-config"

export const submitRadicado = async (data: FormData, idPaciente: string) => {
    try {
        
        for (const pair of data.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }

          console.log("id del paciente: ", idPaciente)

          // se actualizan los datos del pacient4e
            const response = await updatePatientData(data, idPaciente);
            
            // si la respuesta es 200 los datos se actualizaron correctamente
            // es decir se puede proseguir con el siguiente paso, guardar el soporte
          if (response.status === 200 || response.status === 201) {
            const responseSaveFile = await saveFileRadicar(data)

            // si la respuesta es 200 se guarda el id del soporte en el formulario
            // y se guardan los datos a radicar

            if (responseSaveFile.status === 201 || responseSaveFile.status === 200) {
                
                const idSoporte = responseSaveFile.data.id

                data.append("idSoporte", idSoporte)
                
                const responseSaveRadicar = await saveRadicar(data)

                const idRadicado = responseSaveRadicar.data.id

                data.append("idRadicado", idRadicado)

                if (responseSaveRadicar.status === 200) {
                    
                    const cupsResponse = await saveCups(data)

                    if (cupsResponse.status === 201 || cupsResponse.status === 200) {
                        console.log("cups guardados correctamente")
                        console.log("radicado guardado correctamente")
                        return cupsResponse;
                    }
                }   
            }

          }else{
                console.log("error al actualizar los datos del paciente")
          }


    } catch (error) {
        console.log(error)
    }
}