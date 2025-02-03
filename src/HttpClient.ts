export interface HttpClient {
  fetch(request: string | URL, init?: RequestInit): Promise<Response>;
}
