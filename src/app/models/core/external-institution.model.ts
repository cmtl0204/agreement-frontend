import { AgreementModel, CatalogueModel } from "@models/core";
import {ExternalInstitutionDetailModel} from "@models/core/external-institution-detail.model";


export interface ExternalInstitutionModel {
  id: string;
  name: string;
  agreementId: string;
  agreement?: AgreementModel;
  externalInstitutionDetails: ExternalInstitutionDetailModel[];
  personTypeId: string;
  personType?: CatalogueModel;
}
