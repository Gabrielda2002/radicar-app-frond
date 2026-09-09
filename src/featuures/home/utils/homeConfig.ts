import REGLEMENTO_PDF_URL from "@/assets/pdf/Regalmento_interno.pdf?url";
import NOTIFICACION_ACOSO_SEXUAL from "@/assets/pdf/Notificacion_acoso_sexual.pdf?url";

export type DocumentCategory = "juridico" | "talento-humano" | "sst-calidad";

export type DocumentConfig = {
  code: string;
  title: string;
  subTitle: string;
  description: string;
  pdfUrl: string;
  category: DocumentCategory;
  badgeClassName?: string;
  meta?: string;
  confidential?: boolean;
};

export const HOME_CONFIG_PDF: DocumentConfig[] = [
  {
    code: "JUR-R-001",
    title: "JUR-R-001 — Reglamento Interno de Trabajo",
    subTitle: "JUR-R-001",
    description: "Consulta el reglamento interno de trabajo vigente para la sede Cúcuta y disposiciones laborales corporativas.",
    pdfUrl: REGLEMENTO_PDF_URL,
    category: "juridico",
    badgeClassName: "bg-teal-50 text-teal-700 border-teal-200",
    meta: "Vigente • PDF (1.8 MB)",
  },
  {
    code: "NOTIFICACION-ACOSO-SEXUAL",
    title: "Notificación acoso sexual",
    subTitle: "Notificación acoso sexual - Junio 2026",
    description: "Consulta la notificación sobre acoso sexual en Junio 2026, protocolo de ruta de denuncia interna y comité de convivencia.",
    pdfUrl: NOTIFICACION_ACOSO_SEXUAL,
    category: "talento-humano",
    badgeClassName: "bg-emerald-50 text-emerald-800 border-emerald-200",
    confidential: true,
  },
];