import {AgreementModel, CatalogueModel} from "@models/core";

export interface AdministratorModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  unit: CatalogueModel;
  unitId: string;
  positionId: string;
  position: CatalogueModel;
  userId: string;
}
