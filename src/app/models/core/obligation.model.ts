import {CatalogueModel} from "@models/core";
import {ObligationDetailModel} from "@models/core/obligation-detail.model";


export interface ObligationModel {
  id?: string;
  institutionName: string;
  type: CatalogueModel;
  obligationDetails: ObligationDetailModel[];
}
