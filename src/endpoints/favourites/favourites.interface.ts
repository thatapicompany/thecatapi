import { Favourite } from "./types";

export interface FavouritesInterface {
  getFavourites(subId?: string): Promise<Favourite[]>;
}
