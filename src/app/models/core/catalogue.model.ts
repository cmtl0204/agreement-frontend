export interface CatalogueModel {
  id?: string;
  parentId?: string;
  code?: string;
  name?: string;
  required?: boolean;
  sort?: number;
  type?: string;
  obj?: any;

 
  //datos nuevos revisar la base de datos (se pusiseron en opcional)
  enabled?: boolean;
  description?: string;
  parent?: CatalogueModel;
  
}
