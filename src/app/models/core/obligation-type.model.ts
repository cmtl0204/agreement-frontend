import { CatalogueModel } from "@models/core";

export interface ObligationTypeModel {
  id: string;
  typeId: string;
  type?: CatalogueModel;
}
