import { AgreementModel, CatalogueModel } from "@models/core";


export interface ExternalInstitutionModel {
  id: string;
  name: string;
  position: string;
  unit: string;
  agreementId: string;
  agreement?: AgreementModel;
  personTypeId: string; 
  personType?: CatalogueModel;
}
