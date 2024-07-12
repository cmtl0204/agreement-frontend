import { AgreementModel, CatalogueModel } from "@models/convenio";


export interface InternalInstitutionModel {
  id: string;
  name: string;
  positionId: string;
  unit: string;
  agreementId: string;
  agreement?: AgreementModel;
  personTypeId: string;
  personType?: CatalogueModel;
}
