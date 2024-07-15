import {AgreementModel } from "@models/core";

export interface AdministratorModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  unitId: string;
  positionId: string;
  userId: string;
}
