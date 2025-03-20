interface ApiErrorResponseData {
  message: string;
  occurAt: string;
}

export interface ApiErrorResponse {
  status: number;
  data: ApiErrorResponseData;
}
