export interface CatalogueModel {
  id: string;
  enabled: boolean;
  parentId: string | null;
  code: string;
  description: string;
  name: string;
  sort: number;
  type: string;
  required: boolean;
  parent?: CatalogueModel;
}
