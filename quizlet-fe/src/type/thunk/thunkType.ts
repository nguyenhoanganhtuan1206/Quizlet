import { AxiosError } from "axios";
import { ApiErrorResponse } from "../apiErrorResponse";

export interface ThunkState<T> {
  data: T[];
  isLoading: boolean;
  error: AxiosError | Error | ApiErrorResponse | null | unknown;
}
