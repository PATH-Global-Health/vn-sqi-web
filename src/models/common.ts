export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
  errorMessage?: any;
  succeed: boolean;
}

export interface ResponseMessage<T> {
  data: T;
  errorMessage?: any;
  succeed: boolean;
}

export interface PaginationParams {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface ListParam {
  pageIndex?: number;
  pageSize?: number;
  [key: string]: any;
}

export interface FromToParam {
  from?: Date;
  to?: Date;
  [key: string]: any;
}
