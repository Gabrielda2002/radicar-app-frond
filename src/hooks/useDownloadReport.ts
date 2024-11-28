import { useState } from "react";
import { api } from "../utils/api-config";

export const useDownloadReport = () => {

    const [error, setError] = useState<string | null>(null);

    const downloadReport = async (dateStart: string, dateEnd: string, cupsCode: string | null, endPoint: string, statusCups?: string ) => {
        try {
            const response = await api.post(`/${endPoint}`, {
              dateStart:  dateStart,
              dateEnd: dateEnd,
              cupsCode: cupsCode,
              statusCups: statusCups
            },{
              responseType: 'blob',
            });
            // * crear un objeto URL temporal para el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
      
            // * crear un enlace para la descarga del archivo
            const link = document.createElement('a');
            link.href = url;
      
            link.setAttribute('download', 'reporte.xlsx');
      
            // * añadir el enlace al body del documento
            document.body.appendChild(link);
      
            link.click();
            //limpiar el error si se descarga correctamente
            setError(null);
            window.URL.revokeObjectURL(url);
      
          } catch (error) {
            setError("Error al descargar el archivo. " + error);
          }
    };

    return { downloadReport, error };

}