import { GetImagesFilter, Image, ImagesInterface } from "./ImagesInterface";
import { HttpMethod } from "../../services/ApiRequest/HttpMethod";
import { ApiRequest } from "../../services/ApiRequest";

class Images implements ImagesInterface {
  api: ApiRequest;
  endpoint: string;

  constructor(apiService: ApiRequest) {
    this.api = apiService;
    this.endpoint = "/images";
  }

  async getImages(filter: GetImagesFilter): Promise<Image[]> {
    const endpoint = this.getImagesEndpoint(filter);
    return await this.api.request<Image[]>(HttpMethod.GET, endpoint);
  }

  private getImagesEndpoint(filter?: GetImagesFilter): string {
    let filters: string[] = [];
    if (filter !== undefined) {
      filters = Object.entries(filter)
        .map(([key, value]) => {
          if (key === "hasBreeds") {
            return ["has_breeds", value ? 1 : 0];
          } else if (key === "breeds") {
            return ["breed_ids", (value as []).join(",")];
          } else if (key === "categories") {
            return ["category_ids", (value as []).join(",")];
          } else if (key === "mimeTypes") {
            return ["mime_types", (value as []).join(",")];
          } else if (key === "subId") {
            return ["sub_id", value];
          }
          return [key, value];
        })
        .map(([key, value]) => `${key}=${value}`);
    }
    return `${this.endpoint}/search${
      filter !== undefined ? "?" : ""
    }${filters.join("&")}`;
  }
}

export default Images;
