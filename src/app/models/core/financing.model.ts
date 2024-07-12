import {AgreementModel, ExternalInstitutionModel, InternalInstitutionModel } from "@models/core";

export interface FinancingModel {
  id: string;
  modelId: string;
  budget: number;
  paymentMethod: string;
  source: string;
  agreementId: string;
  agreement?: AgreementModel;
  externalInstitution?: ExternalInstitutionModel;
  internalInstitution?: InternalInstitutionModel;
}
