import {CatalogueModel, InternalInstitutionModel} from "@models/core";


export interface InternalInstitutionDetailModel {
  id: string;
  internalInstitution: InternalInstitutionModel;
  positionId: string;
  position?: CatalogueModel;
  unit: string;
}
