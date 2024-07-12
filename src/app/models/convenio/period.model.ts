import { AgreementModel } from "@models/convenio";

export interface PeriodModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  name: string;
  startedAt: Date;
  endedAt: Date;
  documentName: string;
}
