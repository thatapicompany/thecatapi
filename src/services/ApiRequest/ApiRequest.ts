import axios from "axios";
import { HttpMethod } from "./HttpMethod";
import ApiCall from "./ApiCall";
import ApiRequestError from "./ApiRequestError";
import ApiResponseError from "./ApiResponseError";
import { LIBRARY_VERSION } from "../../version";

type Config = {
  host: string;
  apiKey: string;
};

class ApiRequest implements ApiCall {
  private readonly host: string;
  private readonly headers: Record<string, string | number | boolean>;
  private readonly apiKey: string;

  constructor(config: Config) {
    const { host, apiKey } = config;
    this.host = host;
    this.apiKey = apiKey;
    this.headers = this._generateDefaultHeaders();

    this._init();
  }

  private _init() {
    const isoDateFormat =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;
    function isIsoDateString(value: any): boolean {
      return value && typeof value === "string" && isoDateFormat.test(value);
    }
    function handleDates(body: any) {
      if (body === null || body === undefined || typeof body !== "object") {
        return body;
      }
      for (const key of Object.keys(body)) {
        const value = body[key];
        if (isIsoDateString(value)) {
          body[key] = new Date(value);
        } else if (typeof value === "object") {
          handleDates(value);
        }
      }
    }

    axios.interceptors.response.use((response) => {
      handleDates(response.data);
      return response;
    });
  }

  async request<T>(
    method: HttpMethod,
    endpoint: string,
    payload?: any
  ): Promise<T> {
    try {
      const response = await axios.request<T>({
        baseURL: this.host,
        method: method,
        url: endpoint,
        data: payload,
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new ApiResponseError(
            error.response.status,
            error.response.data ?? error.response.statusText
          );
        } else if (error.request) {
          throw new ApiRequestError(error.message);
        }
      }
      throw error;
    }
  }

  private _generateDefaultHeaders() {
    return {
      "user-agent": `thecatapi-client-node/${LIBRARY_VERSION}`,
      "x-api-key": this.apiKey,
    };
  }
}

export default ApiRequest;
