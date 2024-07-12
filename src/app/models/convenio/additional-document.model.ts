import { UserModel } from "@models/auth";
import { AgreementModel,CatalogueModel } from "@models/convenio";


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
  
}

