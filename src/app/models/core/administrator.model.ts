import {AgreementModel, CatalogueModel} from "@models/core";
import {UserLdapModel} from "@models/auth";

export interface AdministratorModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  unit: CatalogueModel;
  unitId: string;
  positionId: string;
  position: CatalogueModel;
  user: UserLdapModel;
  userId: string;
}
