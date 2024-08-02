import {ObligationModel} from "@models/core";


export interface ObligationDetailModel {
  id: string;
  description?: string;
  obligation?: ObligationModel;
}
