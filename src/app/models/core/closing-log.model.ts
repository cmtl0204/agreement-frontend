import {CatalogueModel, FileModel} from "@models/core";

export interface ClosingLogModel {
  id: string;
  uploadedAt: Date;
  observation: string;
  isCurrent: boolean;
  stateId: string;
  state?: CatalogueModel;
  userId: string;
  closingLogDocuments?: FileModel[];
}
