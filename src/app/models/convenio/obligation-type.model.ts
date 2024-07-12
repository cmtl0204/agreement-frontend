import { CatalogueModel } from "@models/convenio";

export interface ObligationTypeModel {
  id: string;
  typeId: string;
  type?: CatalogueModel;
}
