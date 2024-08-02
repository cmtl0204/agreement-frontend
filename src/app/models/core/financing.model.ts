import {AgreementModel} from "@models/core";

export interface FinancingModel {
  id?: string;
  institutionName?: string;
  budget?: number;
  paymentMethod?: string;
  source?: string;
  agreementId?: string;
  agreement?: AgreementModel;
}
