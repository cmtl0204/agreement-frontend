import {CatalogueModel} from "@models/core/catalogue.model";

export interface FileModel {
  id?: string;
  name?: string;
  modelId?: string;
  description?: string;
  extension?: string;
  path?: string;
  size?: number;
  enabled?: boolean;
  type?: CatalogueModel;
  file?:any;
}
