import {AgreementModel, CatalogueModel, FileModel} from "@models/core";
import {UserModel} from "@models/auth";

export interface ClosedAgreementModel {
  id: string;
  agreementId: string;
  agreement?: AgreementModel;
  sendingDate: Date;
  closingDate: Date;
  sendingUserId: string;
  closingUserId: string;
  sendingUser: UserModel;
  closingUser: UserModel;
  files: FileModel[];
}
