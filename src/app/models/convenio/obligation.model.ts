import { InstitutionObligationModel, ObligationTypeModel } from "@models/convenio";


export interface ObligationModel {
  id: string;
  modelId: string;
  description: string;
  obligationType?: ObligationTypeModel;
  institutionObligation?: InstitutionObligationModel;
}
