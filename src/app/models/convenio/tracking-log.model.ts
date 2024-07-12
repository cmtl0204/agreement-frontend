import { CatalogueModel, PeriodModel } from "@models/convenio";


export interface TrackingLogModel {
  id: string;
  periodId: string;
  period?: PeriodModel;
  stateId: string;
  state?: CatalogueModel;
  observation: string;
  isCurrent: boolean;
  uploadedAt: Date;
  userId: string;
}
