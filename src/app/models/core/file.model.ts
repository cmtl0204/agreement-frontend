import {CatalogueModel} from "@models/core/catalogue.model";
import {UserModel} from "@models/auth";

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
  user?:UserModel;
}
