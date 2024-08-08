import {PaginatorModel} from '@models/core';

export interface ServerResponse {
  data: any;
  pagination?: PaginatorModel;
  error?: string;
  message: string;
  detail: string;
  statusCode: number;
  title: string;
  version?: string;
}

export interface ServerResponsePaginator extends ServerResponse {
  meta: PaginatorModel;
  links?: Links;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
