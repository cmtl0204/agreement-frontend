import { AgreementModel, CatalogueModel } from "@models/core";
import {InternalInstitutionDetailModel} from "@models/core/internal-institution-detail.model";


export interface InternalInstitutionModel {
  id: string;
  name: string;
  agreementId: string;
  agreement?: AgreementModel;
  internalInstitutionDetails: InternalInstitutionDetailModel[];
  personTypeId: string;
  personType?: CatalogueModel;
}
