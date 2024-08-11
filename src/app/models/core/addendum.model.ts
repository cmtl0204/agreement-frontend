import {AgreementModel, FileModel} from "@models/core";

export interface AddendumModel {
  id?: string;
  agreement?: AgreementModel;
  description: string;
  isModifiedFinishDate: boolean;
  agreementEndedAt: Date;
  file?: FileModel;

}

