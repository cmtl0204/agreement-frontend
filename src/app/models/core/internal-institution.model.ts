import { AgreementModel, CatalogueModel } from "@models/core";


export interface InternalInstitutionModel {
  id: string;
  name: string;
  positionId: string;
  unit: string;
  agreementId: string;
  agreement?: AgreementModel;
  personTypeId: string;
  personType?: CatalogueModel;
  position?: CatalogueModel;
}
