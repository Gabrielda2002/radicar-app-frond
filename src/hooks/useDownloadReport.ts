import { useState } from "react";
import { api } from "../utils/api-config";

export const useDownloadReport = () => {

    const [error, setError] = useState<string | null>(null);

    const downloadReport = async (dateStartRadicado: string, dateEndRadicado: string, cupsCode: string) => {
        try {
            const response = await api.post("/report-excel-filtro", {
              dateStartRadicado,
              dateEndRadicado,
              cupsCode
            },{
              responseType: 'blob',
            });
            console.log(dateStartRadicado, dateEndRadicado, cupsCode);
      
            // * crear un objeto URL temporal para el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
      
            // * crear un enlace para la descarga del archivo
            const link = document.createElement('a');
            link.href = url;
      
            link.setAttribute('download', 'reporte.xlsx');
      
            // * añadir el enlace al body del documento
            document.body.appendChild(link);
      
            link.click();
      
            window.URL.revokeObjectURL(url);
      
          } catch (error) {
            setError("Error al descargar el archivo" + error);
          }
    };

    return { downloadReport, error };

}