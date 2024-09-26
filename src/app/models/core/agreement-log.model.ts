import {
  AddendumModel,
  AdministratorModel, AgreementLogDetailModel, AgreementModel, AgreementStateModel,
  CatalogueModel,
  ExternalInstitutionModel, FileModel,
  FinancingModel,
  InternalInstitutionModel, ObligationModel
} from "@models/core";
import {EnablingDocumentFormEnum} from "@shared/enums";
import {UserModel} from "@models/auth";

export interface AgreementLogModel {
  id?: string;
  agreement?: AgreementModel;
  registeredAt?: Date;
  user: UserModel;
  agreementLogDetails: AgreementLogDetailModel[];
}
