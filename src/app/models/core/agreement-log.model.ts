import {
  AddendumModel,
  AdministratorModel, AgreementModel, AgreementStateModel,
  CatalogueModel,
  ExternalInstitutionModel, FileModel,
  FinancingModel,
  InternalInstitutionModel, ObligationModel
} from "@models/core";
import {EnablingDocumentFormEnum} from "@shared/enums";

export interface AgreementLogModel {
  id?: string;
  agreement?: AgreementModel;
}
