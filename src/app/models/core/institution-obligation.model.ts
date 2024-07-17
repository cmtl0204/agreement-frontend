import { ExternalInstitutionModel, InternalInstitutionModel, ObligationTypeModel } from "@models/core";

export interface InstitutionObligationModel {
  id: string;
  obligationTypeId: string;
  obligationType?: ObligationTypeModel;
  modelId: string;
  externalInstitution?: ExternalInstitutionModel;
  internalInstitution?: InternalInstitutionModel;
}
