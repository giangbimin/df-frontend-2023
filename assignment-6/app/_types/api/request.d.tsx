interface ErrorField {
  error: string;
  field: string;
}

interface ErrorResponse {
  code: string;
  traceId: string;
  error?: string;
  message?: string;
  status?: number;
  errors?: ErrorField[];
}

interface Metadata {
  hasNext: boolean;
  page: number;
  pageSize: number;
  sort?: number;
  totalPages: number;
  totalRecords: number;
}

export const defaultMetadata: Metadata = {
  hasNext: false,
  page: 1,
  pageSize: 10,
  totalPages: 0,
  totalRecords: 0,
};

interface SuccessResponse<T> {
  data: T;
  metadata?: Metadata;
}

interface SuccessMessageResponse {
  message: string;
}

interface FetchResponse {
  status: number;
  success: boolean;
  data: unknown;
  metadata?: Metadata;
}

export const defaultFetchResponse: FetchResponse = {
  status: 200,
  success: true,
  data: undefined,
};

export type {
  ErrorField,
  ErrorResponse,
  Metadata,
  SuccessResponse,
  SuccessMessageResponse,
  FetchResponse,
};

export const RequestErrorCodes = {
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
};

export function extractData<T>(response: SuccessResponse<T>): T {
  return response.data;
}

export function extractMetaData<T>(
  response: SuccessResponse<T>,
): Metadata | undefined {
  return response.metadata;
}
