import {AgreementModel } from "@models/convenio";

export interface AdministratorModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  unitId: string;
  positionId: string;
  userId: string;
}
