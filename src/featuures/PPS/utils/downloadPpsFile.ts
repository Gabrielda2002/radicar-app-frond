import type { AxiosError } from "axios";
import { api } from "@/utils/api-config";

const parseContentDisposition = (value: string | undefined): string | null => {
  if (!value) return null;

  const utf8Match = value.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match) {
    try {
      return decodeURIComponent(utf8Match[1]);
    } catch {
      return utf8Match[1];
    }
  }

  const plainMatch = value.match(/filename="([^"]+)"/i);
  if (plainMatch) {
    return plainMatch[1];
  }

  return null;
};

export async function downloadPpsFile(
  periodId: number,
  kind: "programming" | "monitoring",
  force = false
): Promise<void> {
  const url =
    kind === "programming"
      ? `/pps/periods/${periodId}/programmed-activities/file`
      : `/pps/periods/${periodId}/monitoring/file`;

  const query = force && kind === "monitoring" ? "?force=true" : "";

  try {
    const response = await api.get(`${url}${query}`, {
      responseType: "blob",
    });

    const disposition = response.headers["content-disposition"] as
      | string
      | undefined;
    const filename =
      parseContentDisposition(disposition) || `PPS_${kind}_${periodId}.txt`;

    const blobUrl = window.URL.createObjectURL(response.data as Blob);
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error: unknown) {
    const err = error as AxiosError<Blob>;
    if (err.response?.data instanceof Blob) {
      const text = await err.response.data.text();
      let message = "No se pudo generar el archivo. Intente nuevamente.";
      try {
        const json = JSON.parse(text) as { message?: string };
        if (json.message) {
          message = json.message;
        }
      } catch {
        // Se conserva el mensaje por defecto.
      }
      throw new Error(message);
    }

    throw new Error("No se pudo generar el archivo. Intente nuevamente.");
  }
}
