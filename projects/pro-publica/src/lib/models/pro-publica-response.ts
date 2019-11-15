export interface ProPublicaResponse<T> {
  copyright: string;
  results: T;
  status: number;
  errors: Record<string, any>[];
}
