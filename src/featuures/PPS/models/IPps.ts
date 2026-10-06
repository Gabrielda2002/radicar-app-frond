export type IdentificationType = "NI" | "DE" | "DI" | "MU";
export type DueYearRelation = "same" | "next";

export interface PpsReportingEntity {
  id: number;
  identificationType: IdentificationType;
  identificationNumber: string;
  entityName: string;
  logoPath: string | null;
  programmingFilePrefix: string;
  monitoringFilePrefix: string;
  strictMode: boolean;
  programmingDueMonth: number;
  programmingDueDay: number;
  programmingDueYear: DueYearRelation;
  monitoringDueMonth: number;
  monitoringDueDay: number;
  monitoringDueYear: DueYearRelation;
  createdAt: string;
  updatedAt: string;
}
