import { HttpClient } from "./HttpClient";

export interface ApiOperation<TParams extends object, TReturn extends object> {
  request: (params: TParams) => string | URL;
  init: (params: TParams) => RequestInit | undefined;
}
export interface ApiService {
  createOperation<TParams extends object, TReturn extends object>(
    operation: ApiOperation<TParams, TReturn>,
  ): (params: TParams) => Promise<TReturn>;
}

export class SimpleApiService implements ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  createOperation<TParams extends object, TReturn extends object>(
    operation: ApiOperation<TParams, TReturn>,
  ) {
    return async (params: TParams): Promise<TReturn> => {
      const request = operation.request(params);
      const init = operation.init(params);
      const response = await this.httpClient.fetch(request, init);
      return response.json();
    };
  }
}
