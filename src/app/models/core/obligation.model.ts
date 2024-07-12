import { InstitutionObligationModel, ObligationTypeModel } from "@models/core";


export interface ObligationModel {
  id: string;
  modelId: string;
  description: string;
  obligationType?: ObligationTypeModel;
  institutionObligation?: InstitutionObligationModel;
}
