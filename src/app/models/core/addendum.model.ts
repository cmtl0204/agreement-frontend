import {AgreementModel, FileModel} from "@models/core";

export interface AddendumModel {
  id?: string;
  agreement?: AgreementModel;
  description: string;
  file?: FileModel;
  files?: FileModel[];
}

