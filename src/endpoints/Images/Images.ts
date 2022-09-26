import { ImagesInterface } from "./ImagesInterface";
import { HttpMethod } from "../../services/ApiRequest/HttpMethod";
import { ApiRequest } from "../../services/ApiRequest";
import { createFormData } from "../../util/createFormData";
import {
  GetImagesFilter,
  GetRandomImageFilter,
  Image,
  SearchImagesFilter,
  UploadedImage,
  UploadImageResponse,
  UserImage,
  UserImageResponse,
} from "./types";
import { mapImageFilters, mapUploadedImage, mapUserImage } from "./mappers";

class Images implements ImagesInterface {
  api: ApiRequest;
  endpoint: string;

  constructor(apiService: ApiRequest) {
    this.api = apiService;
    this.endpoint = "/images";
  }

  async searchImages(filter?: SearchImagesFilter): Promise<Image[]> {
    const queryParams = this.buildQueryParams(filter);
    return await this.api.request<Image[]>(
      HttpMethod.GET,
      `${this.endpoint}/search${queryParams}`
    );
  }

  async getImage(id: string): Promise<Image> {
    return await this.api.request<Image>(
      HttpMethod.GET,
      `${this.endpoint}/${id}`
    );
  }

  async getImages(filter?: GetImagesFilter): Promise<UserImage[]> {
    const queryParams = this.buildQueryParams(filter);
    const images = await this.api.request<UserImageResponse[]>(
      HttpMethod.GET,
      `${this.endpoint}${queryParams}`
    );
    return images.map(mapUserImage);
  }

  async getRandomImage(filter?: GetRandomImageFilter): Promise<Image | null> {
    const images = await this.searchImages(filter);
    if (images.length > 0) {
      return images[0];
    }
    return null;
  }

  async uploadImage(image: any, subId?: string): Promise<UploadedImage> {
    const data = subId
      ? {
          file: image,
          sub_id: subId,
        }
      : { file: image };
    const formData = createFormData(data);
    const uploadedImage = await this.api.request<UploadImageResponse>(
      HttpMethod.POST,
      `${this.endpoint}/upload`,
      formData
    );
    return mapUploadedImage(uploadedImage);
  }

  async deleteImage(id: string): Promise<void> {
    await this.api.request(HttpMethod.DELETE, `${this.endpoint}/${id}`);
  }

  private buildQueryParams(
    filter?: SearchImagesFilter | GetImagesFilter
  ): string {
    if (!filter) {
      return "";
    }
    const filters = mapImageFilters(filter).map(
      ([key, value]) => `${key}=${value}`
    );
    return `?${filters.join("&")}`;
  }
}

export default Images;
