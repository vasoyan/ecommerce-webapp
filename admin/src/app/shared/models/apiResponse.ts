export interface ApiResponse<T> {
  success: boolean;
  data: T | null; // T can be any type
  message: string | null;
  statusCode: number;
}
