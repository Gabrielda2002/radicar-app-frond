import type { TurnoPriorityType, TurnoStatusType } from "./ITurnos";

export interface ITurnoAtencionModule {
  isPriority: boolean;
  id: number;
  headquarterId: number;
  headquarterName: string;
  code: string;
  name: string;
  isAvailable: boolean;
}

export interface ITurnoAtencionService {
  id: number;
  name: string;
}

export interface ITurnoAtencionOptions {
  modules: ITurnoAtencionModule[];
  services: ITurnoAtencionService[];
  servicesByHeadquarter: { headquarterId: number; services: ITurnoAtencionService[] }[];
}

export interface ITurnoAtencionQueueItem {
  ticketCode: string;
  patientName: string;
  serviceName: string;
  priority: TurnoPriorityType;
  waitingMinutes: number;
}

export interface ITurnoAtencionActiveTurn {
  id: number;
  ticketCode: string;
  priority: TurnoPriorityType;
  status: TurnoStatusType;
  callCount: number;
  patient: { name: string };
  service: { id: number; name: string };
  calledAt: string | null;
  startedAt: string | null;
}

export interface ITurnoAtencionState {
  hasActiveSession: boolean;
  session: {
    id: number;
    startedAt: string;
    modulo: { id: number; code: string; name: string };
    services: ITurnoAtencionService[];
  } | null;
  activeTurn: ITurnoAtencionActiveTurn | null;
  pendingQueue: ITurnoAtencionQueueItem[];
  pendingQueueCount: number;
}

export interface ITurnoAtencionActionResponse {
  message: string;
  action: string;
  turno: ITurnoAtencionActiveTurn | null;
}
