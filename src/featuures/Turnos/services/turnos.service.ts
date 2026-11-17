import axios from "axios";
import { api } from "@/utils/api-config";
import type {
  ITurnoActiveTicket,
  ITurnoCreatedTicket,
  ITurnoIdentity,
  ITurnoRequest,
  ITurnoSedeConfig,
  ITurnoTicket,
  ITurnoTvState,
  ITurnoVerification,
  TurnoStatusType,
} from "@/models/ITurnos";
import type {
  ITurnoAtencionActionResponse,
  ITurnoAtencionOptions,
  ITurnoAtencionState,
} from "@/models/ITurnoAtencion";

export const fetchTurnoAtencionOptions =
  async (): Promise<ITurnoAtencionOptions> => {
    const { data } = await api.get<ITurnoAtencionOptions>(
      "/turnos/atencion/opciones",
    );
    if (
      !Array.isArray(data.modules) ||
      !data.modules.every(
        (module) =>
          typeof module.isPriority === "boolean" &&
          Number.isInteger(module.headquarterId),
      ) ||
      !Array.isArray(data.servicesByHeadquarter) ||
      !data.servicesByHeadquarter.every(
        (group) =>
          Number.isInteger(group.headquarterId) &&
          Array.isArray(group.services) &&
          group.services.every(
            (service) =>
              Number.isInteger(service.id) && typeof service.name === "string",
          ),
      )
    ) {
      throw new Error("Las opciones de atención tienen un formato incorrecto.");
    }
    return {
      ...data,
      services: Array.isArray(data.services) ? data.services : [],
    };
  };

export const fetchTurnoAtencionState =
  async (): Promise<ITurnoAtencionState> => {
    const { data } = await api.get<ITurnoAtencionState>(
      "/turnos/atencion/estado-actual",
    );
    if (
      typeof data.hasActiveSession !== "boolean" ||
      !Array.isArray(data.pendingQueue)
    ) {
      throw new Error("El estado de atención tiene un formato incorrecto.");
    }
    return data;
  };

export const startTurnoAtencionSession = async (input: {
  moduloId: number;
  serviceIds: number[];
}): Promise<void> => {
  await api.post("/turnos/atencion/sesion/iniciar", input);
};

export const closeTurnoAtencionSession = async (): Promise<void> => {
  await api.post("/turnos/atencion/sesion/cerrar");
};

export const executeTurnoAtencionAction = async (input: {
  action:
  | "LLAMAR"
  | "RELLAMAR"
  | "INICIAR"
  | "FINALIZAR"
  | "NO_ASISTIO"
  | "TRANSFERIR"
  | "CANCELAR";
  newServiceId?: number;
  notes?: string;
}): Promise<ITurnoAtencionActionResponse> => {
  const { data } = await api.post<ITurnoAtencionActionResponse>(
    "/turnos/atencion/accion",
    input,
  );
  return data;
};

export const fetchTurnoConfig = async (
  slug: string,
): Promise<ITurnoSedeConfig> => {
  const { data } = await api.get<ITurnoSedeConfig>(
    `/turnos/sedes/${encodeURIComponent(slug)}/config`,
  );
  if (
    !data.headquarter ||
    !Array.isArray(data.services) ||
    !Array.isArray(data.documentTypes)
  )
    throw new Error(
      "La configuración de la sede está incompleta. Intenta consultarla nuevamente.",
    );
  return data;
};

export const verifyTurnoPatient = async (
  identity: ITurnoIdentity,
): Promise<ITurnoVerification> => {
  const { data } = await api.post<ITurnoVerification>(
    "/turnos/pacientes/verificar",
    identity,
  );
  if (typeof data.exists !== "boolean" || (data.exists && !data.patient))
    throw new Error(
      "No pudimos verificar los datos del paciente. Intenta nuevamente.",
    );
  return data;
};

export const createTurnoTicket = async (
  request: ITurnoRequest,
): Promise<string> => {
  try {
    const { data } = await api.post<ITurnoCreatedTicket>(
      "/turnos/ticket",
      request,
    );
    if (!data.token)
      throw new Error(
        "No se recibió el enlace del turno. Verifica tu documento antes de reintentar.",
      );
    return data.token;
  } catch (error: unknown) {
    if (
      axios.isAxiosError<{ activeTicket?: ITurnoActiveTicket }>(error) &&
      error.response?.status === 409
    ) {
      const token = error.response.data.activeTicket?.ticketToken;
      if (token) return token;
    }
    throw error;
  }
};

export const fetchTurnoTicket = async (
  token: string,
): Promise<ITurnoTicket> => {
  const { data } = await api.get<ITurnoTicket>(
    `/turnos/ticket/${encodeURIComponent(token)}`,
  );
  if (!data.ticketToken || !data.headquarter || !data.service || !data.patient)
    throw new Error(
      "La información del ticket está incompleta. Intenta consultarlo nuevamente.",
    );
  return data;
};

export const cancelTurnoTicket = async (
  token: string,
  reason?: string,
): Promise<{
  message: string;
  ticketCode: string;
  status: TurnoStatusType;
}> => {
  const payload = reason ? { reason } : {};
  const { data } = await api.post<{
    message: string;
    ticketCode: string;
    status: TurnoStatusType;
  }>(`/turnos/ticket/${encodeURIComponent(token)}/cancelar`, payload);
  return data;
};

export const submitTurnoSurvey = async (
  token: string,
  payload: { rating: number; comment?: string },
): Promise<{ message: string; rating: number }> => {
  const { data } = await api.post<{ message: string; rating: number }>(
    `/turnos/ticket/${encodeURIComponent(token)}/encuesta`,
    payload,
  );
  return data;
};

export const fetchTurnoTvState = async (
  slug: string,
): Promise<ITurnoTvState> => {
  const { data } = await api.get<ITurnoTvState>(
    `/turnos/tv/${encodeURIComponent(slug)}/estado`,
  );
  if (
    !data ||
    !data.headquarter ||
    typeof data.headquarter.id !== "number" ||
    !Array.isArray(data.activeTurns) ||
    !Array.isArray(data.upcomingTurns)
  ) {
    throw new Error(
      "La información de la pantalla de la sede no está disponible o tiene un formato incorrecto.",
    );
  }
  return data;
};

export const getTurnoError = (error: unknown): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    if (!error.response)
      return "No pudimos confirmar la respuesta. Revisa tu conexión e intenta nuevamente.";
    if (error.response.status >= 500)
      return "El servicio no está disponible en este momento. Intenta más tarde.";
    return (
      error.response.data?.message ||
      "No se pudo completar la solicitud. Intenta nuevamente."
    );
  }
  return error instanceof Error
    ? error.message
    : "Ocurrió un error inesperado. Intenta nuevamente.";
};
