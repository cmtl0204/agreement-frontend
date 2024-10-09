import { CatalogueModel, PeriodModel } from "@models/core";


export interface TrackingLogModel {
  id: string;
  periodId: string;
  period?: PeriodModel;
  stateId: string;
  state?: CatalogueModel;
  observation: string;
  isCurrent: boolean;
  registeredAt: Date;
  userId: string;
}
