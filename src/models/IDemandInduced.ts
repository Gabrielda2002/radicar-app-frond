
export interface IDemandInduced {
  id: number;
  typeDocument: string;
  document: number;
  dateCreated: Date;
  elementDI: string;
  typeElementDI: string;
  objetive: string;
  numbersContact: string;
  classification: boolean;
  perconReceive: string | null;
  relationshipUser?: string | null;
  dateCall: Date | null;
  hourCall: string | null;
  textCall: string | null;
  summaryCall?: string | null;
  dificulties: boolean;
  areaDificulties: string | null;
  areaEps: string;
  conditionUser: boolean;
  suport: string | null;
  namePatient: string;
  phoneNumberPatient: string;
  emailPatient: string;
  resultCALL: string;
  dateSend: Date | null;
  hourSend: string | null;
  textSend: string | null;
  dateVisit: Date | null;
  sumaryVisit: string | null;
  reasonVisit: string;
  personProcess: string;
  areaPersonProcess: string;
  programPerson: string;
  assignmentDate: Date;
  profetional: string;
}
