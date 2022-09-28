import { ApiRequest } from "../../services/ApiRequest";
import { FavouritesInterface } from "./favourites.interface";
import {
  AddFavourite,
  DeleteFavourite,
  Favourite,
  FavouriteResponse,
} from "./types";
import { HttpMethod } from "../../services/ApiRequest/HttpMethod";
import { mapFavourite } from "./mappers";
import { buildQueryParams } from "../../util/buildQueryParams";
import { mapImageFilters } from "../images/mappers";

class Favourites implements FavouritesInterface {
  api: ApiRequest;
  endpoint: string;

  constructor(apiService: ApiRequest) {
    this.api = apiService;
    this.endpoint = "/favourites";
  }

  async getFavourites(subId?: string): Promise<Favourite[]> {
    const queryParams = subId
      ? buildQueryParams({ subId }, mapImageFilters)
      : "";
    const favourites = await this.api.request<FavouriteResponse[]>(
      HttpMethod.GET,
      `${this.endpoint}${queryParams}`
    );
    return favourites.map(mapFavourite);
  }

  async getFavourite(id: number): Promise<Favourite> {
    const favourite = await this.api.request<FavouriteResponse>(
      HttpMethod.GET,
      `${this.endpoint}/${id}`
    );
    return mapFavourite(favourite);
  }

  async addFavourite(imageId: string, subId?: string): Promise<AddFavourite> {
    const data = {
      image_id: imageId,
      sub_id: subId,
    };
    return await this.api.request<AddFavourite>(
      HttpMethod.POST,
      this.endpoint,
      data
    );
  }

  async deleteFavourite(id: number): Promise<DeleteFavourite> {
    return await this.api.request<DeleteFavourite>(
      HttpMethod.DELETE,
      `${this.endpoint}/${id}`
    );
  }
}

export default Favourites;
