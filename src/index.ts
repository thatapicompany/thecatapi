import ApiRequest from "./services/ApiRequest/ApiRequest";
import { ImagesInterface } from "./endpoints/images/images.interface";
import Images from "./endpoints/images/images";

const HOST = "https://api.thecatapi.com/v1";

type Options = {
  host?: string;
};

class TheCatAPI {
  apiKey: string;
  host: string;
  images: ImagesInterface;

  constructor(apiKey: string, options?: Options) {
    const host = options?.host ?? HOST;
    this.apiKey = apiKey;
    this.host = host;
    const api = new ApiRequest({
      apiKey: apiKey,
      host,
    });
    this.images = new Images(api);
  }
}

export default TheCatAPI;
