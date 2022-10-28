import { AddFavourite, DeleteFavourite, Favourite } from "./types";

export interface FavouritesInterface {
  /**
   * Returns favourites
   *
   * @param [subId] - specify this to filter favourites by subId
   * @returns list of favourites of this account (filtered by subId if specified)
   */
  getFavourites(subId?: string): Promise<Favourite[]>;

  /**
   * Returns a favourite
   *
   * @param id - id of the favourite
   * @returns favourite with the given id
   */
  getFavourite(id: number): Promise<Favourite>;

  /**
   * Adds an image to the favourites of this account
   *
   * @param imageId - id of the image to favourite
   * @param [subId] - custom value used to filter the favourites (usually a user id)
   * @returns created favourite data
   */
  addFavourite(imageId: string, subId?: string): Promise<AddFavourite>;

  /**
   * Deletes a favourite
   *
   * @param id - id of the favourite to be deleted
   * @returns delete favourite response message
   */
  deleteFavourite(id: number): Promise<DeleteFavourite>;
}
