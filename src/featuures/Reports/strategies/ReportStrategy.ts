import * as Yup from 'yup';
import { ColumnConfig } from "@/components/common/ReusableTable";
import { FilterFieldConfig } from "../types/Report.type";
import { RadicacionReportStrategy } from "./RadicacionReportStrategy";
import { EquiposReportStrategy } from "./EquiposReportStrategy";
import { BreaksReportStrategy } from "./BreaksReportStrategy";
import { SurgeriesReportStrategy } from "./SurgeriesReportStrategy";
import { DemandInducedReportStrategy } from "./DemandInducedReportStrategy";
import { AssistantsReportStrategy } from "./AssistantsReportStrategy";
import { BiometricRecordsReportStrategy } from "./BiometricRecordsReportStrategy";
import { HelpdeskTicketsReportStrategy } from "./HelpdeskTicketsReportStrategy";
import { NetworkDevicesReportStrategy } from "./NetworkDevicesReportStrategy";
import { GeneralInventoryReportStrategy } from "./GeneralInventoryReportStrategy";
import { TvReportStrategy } from "./TvReportStrategy";
import { PhonesReportStrategy } from "./PhonesReportStrategy";

// Generic strategy interface for all report types
export interface ReportStrategy<T = any> {
  // Get the preview endpoint for this report
  getPreviewEndpoint(): string;
  
  // Get the download endpoint for this report
  getDownloadEndpoint(): string;
  
  // Get the columns configuration for the preview table
  getColumns(): ColumnConfig<T>[];
  
  // Get the extra filter fields specific to this report (beyond dateStart/dateEnd)
  getFilterFields(): FilterFieldConfig[];
  
  // Get the validation schema for extra filters (dateStart/dateEnd are validated globally)
  getValidationSchema(): Yup.ObjectSchema<any>;
  
  // Build the API payload from form values
  buildPayload(values: Record<string, any>): Record<string, any>;
  
  // Get the unique key for each row in the table
  getRowKey(item: T): string;
  
  // Get the search fields for the table
  getSearchFields(): string[];
}

// Factory to get the correct strategy based on report ID
export const ReportStrategyFactory = {
  getStrategy(reportId: string): ReportStrategy<any> {
    switch (reportId) {
      case "radicacion":
        return new RadicacionReportStrategy();
      case "Equipos":
        return new EquiposReportStrategy();
      case "break":
        return new BreaksReportStrategy();
      case "surgeries":
        return new SurgeriesReportStrategy();
      case "demanda-inducida":
        return new DemandInducedReportStrategy();
      case "assistents":
        return new AssistantsReportStrategy();
      case "biometric-records":
        return new BiometricRecordsReportStrategy();
      case "helpdesk-tickets":
        return new HelpdeskTicketsReportStrategy();
      case "network-devices":
        return new NetworkDevicesReportStrategy();
      case "general-inventory":
        return new GeneralInventoryReportStrategy();
      case "tv":
        return new TvReportStrategy();
      case "phones":
        return new PhonesReportStrategy();
      default:
        throw new Error(`No hay estrategia definida para el reporte: ${reportId}`);
    }
  },
};
