import {CatalogueModel, ExternalInstitutionModel} from "@models/core";


export interface ExternalInstitutionDetailModel {
  id: string;
  externalInstitution?: ExternalInstitutionModel;
  position: string;
  unit: string;
}
