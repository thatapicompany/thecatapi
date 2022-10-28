import { HttpMethod } from "./HttpMethod";

interface ApiCall {
  request<T>(method: HttpMethod, endpoint: string, payload?: any): Promise<T>;
}

export default ApiCall;
