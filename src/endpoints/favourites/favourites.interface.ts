import { DeleteFavourite, Favourite } from "./types";

export interface FavouritesInterface {
  getFavourites(subId?: string): Promise<Favourite[]>;
  getFavourite(id: number): Promise<Favourite>;
  addFavourite(imageId: string, subId?: string): Promise<Favourite>;
  deleteFavourite(id: number): Promise<DeleteFavourite>;
}
