import {AgreementModel, CatalogueModel} from "@models/core";

export interface ClosingNotificationModel {
  id: string;
  agreement: AgreementModel;
  closeTypeId: string;
  closeType?: CatalogueModel;
  closedAt: Date;
  closeDetail: string;
  userId: string;
}
