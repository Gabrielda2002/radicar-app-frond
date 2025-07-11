import { useState } from "react";
import { api } from "@/utils/api-config";

export const useDownloadReport = () => {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const downloadReport = async (dateStart: string, dateEnd: string, cupsCode: string | null, endPoint: string, statusCups?: string ) => {
        try {

            setLoading(true);

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
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'reporte.xlsx';

            if (contentDisposition) {
              console.log('entra priemra condicion');
              const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
              const matches = fileNameRegex.exec(contentDisposition);
              if (matches != null && matches[1]) {
                console.log('entra segunda condicion');
                fileName = matches[1].replace(/['"]/g, '');
              }
            }
      
            // * crear un enlace para la descarga del archivo
            const link = document.createElement('a');
            link.href = url;
      
            link.setAttribute('download', `${fileName}`);
      
            // * añadir el enlace al body del documento
            document.body.appendChild(link);
      
            link.click();
            //limpiar el error si se descarga correctamente
            setError(null);
            window.URL.revokeObjectURL(url);
      
          } catch (error: any) {
            if (error.response.status === 403) {
              setError("No tienes permisos para descargar el archivo");
            }else if(error.response.status === 404){
              setError("No se encontraron registros para el rango de fechas seleccionado");
            }
            setError("Error al descargar el archivo. " + error);
          }finally {
            setLoading(false);
          }
    };

    return { downloadReport, error, loading };

}