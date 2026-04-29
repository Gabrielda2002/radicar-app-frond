import { DeskSource } from "../types/ITickets";

export const DESK_CONFIG = {
  sistemas: {
    label: "Sistemas",
    createEndpoint: "/tickets",
    closeEndpoint: "/comment-status",
    commentsEndpoint: "/comment/tickets/{id}",
    categoryRoute: "categories",
    categoryRequiresType: true,
    showLocation: false,
    showHeadquarter: false,
    showRemote: true,
    showMontoCotizado: false,
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
    closeEndpoint: "/infrastructure-comments/change-status",
    commentsEndpoint: "/infrastructure-comments/ticket/{id}",
    categoryRoute: "infrastructure-categories",
    categoryRequiresType: false,
    showLocation: true,
    showHeadquarter: true,
    showRemote: false,
    showMontoCotizado: true,
    attachmentsOptions: [
      { value: "photo", label: "Foto" },
      { value: "document", label: "Documento" },
      { value: "pdf", label: "PDF" },
      { value: "video", label: "Video" },
      { value: "other", label: "Otro" },
    ]
  },
  sst: {
    label: "SST",
    createEndpoint: "/sst-tickets",
    closeEndpoint: "/sst-comments/status",
    commentsEndpoint: "/sst-comments/ticket/{id}",
    categoryRoute: "sst-categories",
    categoryRequiresType: false,
    showLocation: true,
    showHeadquarter: true,
    showRemote: false,
    showMontoCotizado: false,
    attachmentsOptions: [
      { value: "photo", label: "Foto" },
      { value: "document", label: "Documento" },
      { value: "pdf", label: "PDF" },
      { value: "video", label: "Video" },
      { value: "other", label: "Otro" },
    ]
  }
} as const; 


export const DESK_VIEW_CONFIG: Record<string, string[]> = {
  "1":  ["/tickets-table", "/infrastructure-tickets", "/sst-tickets/table"],
  "17": ["/tickets-table"],
  "22": ["/infrastructure-tickets"],
  "23": ["/infrastructure-tickets"],
  "24": ["/sst-tickets/table"],
  "25": ["/sst-tickets/table"],
};

export const ATTACHMENT_BUCKET: Record<string, "attachments-tickets" | "attachments-infra-tickets" | "attachments-sst-tickets"> = {
  sistemas: "attachments-tickets",
  infraestructura: "attachments-infra-tickets",
  sst: "attachments-sst-tickets"
};

export function getCommentsEndpoint(source: DeskSource, ticketId: number): string {
  const template = DESK_CONFIG[source].commentsEndpoint;
  return template.replace("{id}", String(ticketId));
}