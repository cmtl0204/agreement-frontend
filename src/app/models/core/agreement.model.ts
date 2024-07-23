import {
  AdministratorModel,
  CatalogueModel,
  ExternalInstitutionModel,
  FinancingModel,
  InternalInstitutionModel
} from "@models/core";

export interface AgreementModel {
  id?: string;
  number?: string;
  administrator?: AdministratorModel;
  internalNumber?: number;
  name?: string;
  originId?: string;
  typeId?: string;
  subscribedAt?: Date;
  startedAt?: Date;
  isFinishDate?: boolean;
  endedAt?: Date | null;
  endedReason?: string;
  yearTerm?: number;
  monthTerm?: number;
  dayTerm?: number;
  objective?: string;
  isFinancing?: boolean;
  userId?: string;
  origin?: CatalogueModel;
  type?: CatalogueModel;
  specialType?: CatalogueModel;
  externalInstitutions?: ExternalInstitutionModel[];
  internalInstitutions?: InternalInstitutionModel[];
  financings?: FinancingModel[];
}
