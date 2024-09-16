import {
  AddendumModel,
  AdministratorModel, AgreementStateModel,
  CatalogueModel,
  ExternalInstitutionModel, FileModel,
  FinancingModel,
  InternalInstitutionModel, ObligationModel
} from "@models/core";
import {EnablingDocumentFormEnum} from "@shared/enums";

export interface AgreementModel {
  id?: string;
  number?: string;
  administrator?: AdministratorModel;
  agreementState?: AgreementStateModel;
  internalNumber?: number;
  name?: string;
  originId?: string;
  typeId?: string;
  subscribedAt?: Date;
  startedAt?: Date;
  isFinishDate?: boolean;
  enabled?: boolean;
  endedAt?: Date | null;
  endedReason?: string;
  yearTerm?: number;
  monthTerm?: number;
  dayTerm?: number;
  objective?: string;
  isFinancing?: boolean;
  isAddendum?: boolean;
  userId?: string;
  origin?: CatalogueModel;
  type?: CatalogueModel;
  specialType?: CatalogueModel;
  totalTerm?: string;
  externalInstitutions: ExternalInstitutionModel[];
  internalInstitutions: InternalInstitutionModel[];
  financings: FinancingModel[];
  obligations: ObligationModel[];
  addendums: AddendumModel[];
  enablingDocuments: FileModel[];
}

export function createAgreementModel(): AgreementModel {
  return {
    externalInstitutions: [],
    internalInstitutions: [],
    financings: [],
    obligations: [],
    addendums: [],
    enablingDocuments: [],
  }
}
