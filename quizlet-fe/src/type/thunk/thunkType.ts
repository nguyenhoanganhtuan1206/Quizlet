export interface ThunkState<T> {
  data: T[];
  isLoading: boolean;
  error: any;
}
