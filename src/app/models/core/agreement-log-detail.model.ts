import {
  AddendumModel,
  AdministratorModel, AgreementLogModel, AgreementStateModel,
  CatalogueModel,
  ExternalInstitutionModel, FileModel,
  FinancingModel,
  InternalInstitutionModel, ObligationModel
} from "@models/core";
import {EnablingDocumentFormEnum} from "@shared/enums";

export interface AgreementLogDetailModel {
  id?: string;
  agreementLog?: AgreementLogModel;
}
