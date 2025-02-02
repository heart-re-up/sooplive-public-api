export interface HttpClient {
  fetch<T>(request: string | URL, init?: RequestInit): Promise<Response>;
}
