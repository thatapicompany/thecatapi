import { Favourite, FavouriteResponse } from "./types";

export function mapFavourites(response: FavouriteResponse): Favourite {
  return {
    id: response.id,
    userId: response.user_id,
    subId: response.sub_id,
    imageId: response.image_id,
    image: {
      id: response.image.id,
      url: response.image.url,
    },
    createdAt: response.created_at,
  };
}
