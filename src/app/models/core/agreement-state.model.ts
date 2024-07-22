import { AgreementModel, CatalogueModel } from "@models/core";

export interface AgreementStateModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  registeredAt: Date;
  stateId: string;
  state?: CatalogueModel;
  userId: string;  
}
