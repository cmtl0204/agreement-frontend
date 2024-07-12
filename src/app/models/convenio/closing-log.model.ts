import { CatalogueModel } from "@models/convenio";

export interface ClosingLogModel {
  id: string;
  uploadedAt: Date;
  observation: string;
  isCurrent: boolean;
  stateId: string;
  state?: CatalogueModel;
  userId: string;
}
