export interface UseDownloadReporteReturn {
  downloadReport: (
    filters: Filters,
    endPoint: string
  ) => Promise<void>;
  error: string | null;
  loading: boolean;
}

export type Filters = {
  dateStart: string;
  dateEnd: string;
  cupsCode?: string | null;
  statusCups?: string;
  headquarter: number;
  convenio?: number;
  specialty?: string;
}