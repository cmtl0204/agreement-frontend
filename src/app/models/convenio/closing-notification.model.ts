import { CatalogueModel } from "@models/convenio";

export interface ClosingNotificationModel {
  id: string;
  closeTypeId: string;
  closeType?: CatalogueModel;
  closedAt: Date;
  closeDetail: string;
  userId: string;
}
