import { Favourite } from "./types";

export interface FavouritesInterface {
  getFavourites(subId?: string): Promise<Favourite[]>;
  getFavourite(id: number): Promise<Favourite>;
}
