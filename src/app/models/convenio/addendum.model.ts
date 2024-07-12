import { AgreementModel } from "@models/convenio";

export interface AddendumModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  isAddendum: boolean;
  description: string;
  isModifiedFinishDate: boolean;
  agreementEndedAt: Date; //fechas son at
 
}

