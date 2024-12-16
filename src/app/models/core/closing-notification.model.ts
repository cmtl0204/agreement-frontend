import {AgreementModel, CatalogueModel} from "@models/core";
import {UserModel} from "@models/auth";

export interface ClosingNotificationModel {
  id: string;
  agreement: AgreementModel;
  closeTypeId: string;
  closeType?: CatalogueModel;
  closedAt: Date;
  registeredAt: Date;
  closeDetail: string;
  userId: string;
  user: UserModel;
}
