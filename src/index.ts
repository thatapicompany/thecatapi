import ApiRequest from "./services/ApiRequest/ApiRequest";

const HOST = "https://api.thecatapi.com/v1";

type Options = {
  host?: string;
};

class TheCatAPI {
  apiKey: string;
  host: string;

  constructor(apiKey: string, options?: Options) {
    const host = options?.host ?? HOST;
    this.apiKey = apiKey;
    this.host = host;
    const api = new ApiRequest({
      apiKey: apiKey,
      host,
    });
  }
}

export default TheCatAPI;
