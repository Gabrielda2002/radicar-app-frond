import {format } from 'date-fns';
import { EpDownloadPdf } from "../Services/EpDownloadPdf";
import { SaveDateDownload } from '../Services/SaveDateDownload';

export const handleDownload = async (id: string, idRequest: number) => {
    try {
        

        const downloadDate = format(new Date(), 'yyyy-MM-dd');

        // descargar el pdf
        const downloadResponse = await EpDownloadPdf(id);

        const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `carta-recobro-${downloadDate}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // guardar la fecha de descarga
        await SaveDateDownload(downloadDate, idRequest);
        window.location.reload();

    } catch (error) {
        console.log(error)
    }finally{
    }
}