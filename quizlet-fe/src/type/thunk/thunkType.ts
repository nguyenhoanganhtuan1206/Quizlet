export interface ThunkState<T> {
  data: T[];
  isLoading: boolean;
  isError: boolean;
}
