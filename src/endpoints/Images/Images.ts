import {
  SearchImagesFilter,
  GetRandomImageFilter,
  Image,
  ImagesInterface,
  UploadImageResponse,
} from "./ImagesInterface";
import { HttpMethod } from "../../services/ApiRequest/HttpMethod";
import { ApiRequest } from "../../services/ApiRequest";
import { createFormData } from "../../util/createFormData";

class Images implements ImagesInterface {
  api: ApiRequest;
  endpoint: string;

  constructor(apiService: ApiRequest) {
    this.api = apiService;
    this.endpoint = "/images";
  }

  async searchImages(filter?: SearchImagesFilter): Promise<Image[]> {
    const endpoint = this.getImagesEndpoint(filter);
    return await this.api.request<Image[]>(HttpMethod.GET, endpoint);
  }

  async getImage(id: string): Promise<Image> {
    return await this.api.request<Image>(
      HttpMethod.GET,
      `${this.endpoint}/${id}`
    );
  }

  async getRandomImage(filter?: GetRandomImageFilter): Promise<Image | null> {
    const images = await this.searchImages(filter);
    if (images.length > 0) {
      return images[0];
    }
    return null;
  }

  async uploadImage(image: any, subId?: string): Promise<UploadImageResponse> {
    const data = subId
      ? {
          file: image,
          sub_id: subId,
        }
      : { file: image };
    const formData = createFormData(data);
    return await this.api.request<UploadImageResponse>(
      HttpMethod.POST,
      `${this.endpoint}/upload`,
      formData
    );
  }

  async deleteImage(id: string): Promise<void> {
    await this.api.request(HttpMethod.DELETE, `${this.endpoint}/${id}`);
  }

  private getImagesEndpoint(filter?: SearchImagesFilter): string {
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
