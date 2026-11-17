export type TurnoPriorityType = "GENERAL" | "PRIORITARIO";
export type TurnoStatusType = "PENDIENTE" | "LLAMADO" | "EN_ATENCION" | "FINALIZADO" | "NO_ASISTIO" | "CANCELADO" | "TRANSFERIDO";

export interface ITurnoOption {
  id: number;
  name: string;
}

export interface ITurnoSedeConfig {
  headquarter: ITurnoOption & { slug: string; address: string };
  geo: { latitude: number; longitude: number; geoRadiusMeters: number };
  averageServiceMinutes: number;
  services: ITurnoOption[];
  documentTypes: ITurnoOption[];
}

export interface ITurnoIdentity {
  documentNumber: string;
  documentType: number;
}

export interface ITurnoPatient {
  id: number;
  fullName: string;
  documentNumber: string;
  documentTypeId: number;
  phoneNumber: string;
}

export interface ITurnoActiveTicket {
  ticketToken: string;
  ticketCode: string;
  status: TurnoStatusType;
  serviceName: string;
  headquarterName: string;
}

export interface ITurnoVerification {
  exists: boolean;
  patient: ITurnoPatient | null;
  activeTurn: ITurnoActiveTicket | null;
}

export interface ITurnoRequest {
  slug: string;
  serviceId: number;
  documentNumber: string;
  documentTypeId: number;
  name: string;
  phoneNumber: string;
  priority: TurnoPriorityType;
  userLatitude?: number;
  userLongitude?: number;
  skipGeolocation?: boolean;
}

export interface ITurnoRequestForm {
  documentTypeId: string;
  documentNumber: string;
  name: string;
  phoneNumber: string;
  serviceId: string;
  priority: TurnoPriorityType | "";
}

export interface ITurnoCreatedTicket {
  token: string;
  ticketCode: string;
}

export interface ITurnoTicket {
  ticketToken: string;
  ticketCode: string;
  status: TurnoStatusType;
  priority: TurnoPriorityType;
  headquarter: ITurnoOption;
  service: ITurnoOption;
  patient: { name: string; documentNumber: string };
  modulo: (ITurnoOption & { code: string }) | null;
  advisorName: string | null;
  aheadCount: number;
  estimatedWaitMinutes: number | null;
  callCount: number;
  hasSurvey: boolean;
  createdAt: string;
}

export interface ITurnoTvItem {
  turnoId: number;
  ticketCode: string;
  priority: TurnoPriorityType;
  status: TurnoStatusType;
  moduloCode?: string;
  moduloName?: string;
  advisorName?: string | null;
  serviceName?: string;
  calledAt?: string;
  callCount?: number;
}

export interface ITurnoTvUpcomingItem {
  turnoId: number;
  ticketCode: string;
}

export interface ITurnoTvState {
  headquarter: ITurnoOption & { slug: string };
  activeTurns: ITurnoTvItem[];
  upcomingTurns: ITurnoTvUpcomingItem[];
}
