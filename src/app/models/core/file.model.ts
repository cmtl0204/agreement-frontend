import {CatalogueModel} from "@models/core/catalogue.model";

export interface FileModel {
    id?: string;
    name?: string;
    fullName?: string;
    fullPath?: string;
    description?: string;
    extension?: string;
    directory?: string;
    originalName?: string;
    type?: CatalogueModel;


    //datos nuevos revisar la base de datos (se pusiseron en opcional)
    modelId?: string;
    typeId?: string;
    path?: string;
    size?: number;
    enabled?: boolean;
}
