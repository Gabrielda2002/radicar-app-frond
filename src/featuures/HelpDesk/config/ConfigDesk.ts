
export const DESK_CONFIG = {
  sistemas: {
    label: "Sistemas",
    createEndpoint: "/tickets",
    categoryRoute: "categories",
    categoryRequiresType: true,
    showLocation: false,
    showHeadquarter: false,
    attachmentsOptions: [
      { value: "document", label: "Documento" },
      { value: "screenshot", label: "Imagen" },
      { value: "Video", label: "Video" },
      { value: "log", label: "Logs" },
      { value: "pdf", label: "PDF" },
      { value: "other", label: "Otro" },
    ]
  },
  infraestructura: {
    label: "Infraestructura",
    createEndpoint: "/infrastructure-tickets",
    categoryRoute: "infrastructure-categories",
    categoryRequiresType: false,
    showLocation: true,
    showHeadquarter: true,
    attachmentsOptions: [
      { value: "photo", label: "Foto" },
      { value: "document", label: "Documento" },
      { value: "pdf", label: "PDF" },
      { value: "video", label: "Video" },
      { value: "other", label: "Otro" },
    ]
  },
} as const;


export const DESK_VIEW_CONFIG: Record<string, string[]> = {
  "1":  ["/tickets-table", "/infrastructure-tickets"],
  "17": ["/tickets-table"],
  "22": ["/infrastructure-tickets"],
  "23": ["/infrastructure-tickets"],
};

export const ATTACHMENT_BUCKET: Record<string, "attachments-tickets" | "attachments-infra-tickets"> = {
  sistemas: "attachments-tickets",
  infraestructura: "attachments-infra-tickets",
};