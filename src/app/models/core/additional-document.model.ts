import {AgreementModel, CatalogueModel} from "@models/core";
import {UserModel} from "@models/auth";


export interface AdditionalDocumentModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  nameId: string;
  name?: CatalogueModel;
  sequence: number;
  detail: string;
  uploadedAt: Date;
  type: 'tracking' | 'closing';
  userId: string;
  user: UserModel;
}

