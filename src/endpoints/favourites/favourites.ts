import { ApiRequest } from "../../services/ApiRequest";
import { FavouritesInterface } from "./favourites.interface";
import { Favourite, FavouriteResponse } from "./types";
import { HttpMethod } from "../../services/ApiRequest/HttpMethod";
import { mapFavourites } from "./mappers";
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
    return favourites.map(mapFavourites);
  }
}

export default Favourites;
