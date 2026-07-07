
import REGLEMENTO_PDF_URL from "@/assets/pdf/Regalmento_interno.pdf?url";
import NOTIFICACION_ACOSO_SEXUAL from "@/assets/pdf/Notificacion_acoso_sexual.pdf?url";

type DocumentConfig = {
    title: string;
    subTitle: string;
    description: string;
    pdfUrl: string;
}

export const HOME_CONFIG_PDF: DocumentConfig[] = [
    {
        title: "JUR-R-001 — Reglamento Interno de Trabajo",
        subTitle: "JUR-R-001",
        description: "Consulta el reglamento interno de trabajo vigente.",
        pdfUrl: REGLEMENTO_PDF_URL,
    },
    {
        title: "Notificación acoso sexual",
        subTitle: "Notificación acoso sexual - Junio 2026",
        description: "Consulta la notificación sobre acoso sexual en Junio 2026.",
        pdfUrl: NOTIFICACION_ACOSO_SEXUAL,
    }
]