import { HomeOperation } from "./chapi/Home";
import { StationOperation } from "./chapi/Station";
import { StationBjOperation } from "./chapi/StationBj";
import { HttpClient } from "./HttpClient";
import { ApiOperation } from "./ApiOperation";

export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  private createOperation<TRequest, TResponse>(
    operation: ApiOperation<TRequest, TResponse>
  ) {
    return async (params: TRequest): Promise<TResponse> => {
      const request = operation.request(params);
      const init = operation.init(params);
      const response = await this.httpClient.fetch(request, init);
      return response.json();
    };
  }
}
