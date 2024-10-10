import {AgreementModel, TrackingLogModel} from "@models/core";

export interface PeriodModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  name: string;
  startedAt: Date;
  endedAt: Date;
  documentName: string;
  trackingLogs: TrackingLogModel[];
  trackingLog: TrackingLogModel;
}
