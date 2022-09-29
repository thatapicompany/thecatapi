import ApiRequest from "./services/ApiRequest/ApiRequest";
import { ImagesInterface } from "./endpoints/images/images.interface";
import Images from "./endpoints/images/images";
import { FavouritesInterface } from "./endpoints/favourites/favourites.interface";
import Favourites from "./endpoints/favourites/favourites";
import { VotesInterface } from "./endpoints/votes/votes.interface";
import Votes from "./endpoints/votes/votes";

const HOST = "https://api.thecatapi.com/v1";

type Options = {
  host?: string;
};

class TheCatAPI {
  private readonly apiKey: string;
  private readonly host: string;
  images: ImagesInterface;
  favourites: FavouritesInterface;
  votes: VotesInterface;

  constructor(apiKey: string, options?: Options) {
    this.apiKey = apiKey;
    this.host = options?.host ?? HOST;
    const api = new ApiRequest({
      apiKey: apiKey,
      host: this.host,
    });
    this.images = new Images(api);
    this.favourites = new Favourites(api);
    this.votes = new Votes(api);
  }
}

export default TheCatAPI;
