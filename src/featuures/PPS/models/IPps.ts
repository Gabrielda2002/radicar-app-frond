export type IdentificationType = "NI" | "DE" | "DI" | "MU";
export type DueYearRelation = "same" | "next";

export interface PpsHeadquartersOption {
  id: number;
  name: string;
  licenseCode?: string | null;
}

export interface PpsActionLine {
  id: number;
  code: string;
  description: string;
  strategicAxis: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PpsGoal {
  id: number;
  actionLineId: number;
  code: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  actionLineRelation?: PpsActionLine;
}

export interface PpsActivity {
  id: number;
  goalId: number;
  code: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  goalRelation?: PpsGoal;
}

export interface PpsTargetPopulation {
  id: number;
  code: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PpsPeriod {
  id: number;
  validityYear: number;
  startDate: string;
  endDate: string;
  cutoffDate: string | null;
  status: boolean;
  createdBy: number | null;
  activitiesCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PpsMonitoring {
  id: number;
  programmedActivityId: number;
  result: number | null;
  intervenedPopulationId: number | null;
  totalPersons: number | null;
  executedResources: number | null;
  fundingSourceId: number | null;
  evidenceLink: string | null;
  verificationMeans: string | null;
  updatedBy: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface PpsProgrammedActivity {
  id: number;
  periodId: number;
  headquartersId: number;
  territoryCode: string;
  actionLineCode: string;
  goalId: number | null;
  goalCode: string;
  goalDescription: string;
  activityId: number | null;
  activityCode: string;
  activityDescription: string;
  numericExpression: number;
  targetPopulationId: number;
  startDate: string;
  endDate: string;
  programmedResources: number;
  createdBy: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface PpsProgrammedActivityRow extends PpsProgrammedActivity {
  headquartersRelation?: { id: number; name: string; licenseCode: string | null };
  monitoringRelation?: PpsMonitoring | null;
  monitoringComplete?: boolean;
}

export interface PpsProgrammedActivityInput {
  headquartersId: number;
  activityId?: number;
  goalId?: number;
  actionLineCode?: string;
  goalCode?: string;
  goalDescription?: string;
  activityCode?: string;
  activityDescription?: string;
  numericExpression: number;
  targetPopulationId: number;
  startDate: string;
  endDate: string;
  programmedResources: number;
}

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
