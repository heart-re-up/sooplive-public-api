import { HttpClient } from "./HttpClient";

export interface ApiOperation<TParams, TReturn> {
  request: (params: TParams) => string | URL;
  init: (params: TParams) => RequestInit | undefined;
}
