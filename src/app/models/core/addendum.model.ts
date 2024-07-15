import { AgreementModel } from "@models/core";

export interface AddendumModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  isAddendum: boolean;
  description: string;
  isModifiedFinishDate: boolean;
  agreementEndedAt: Date; //fechas son at
 
}

