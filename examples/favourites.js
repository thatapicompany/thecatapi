import { TheCatAPI } from "@thatapicompany/thecatapi";

const theCatAPI = new TheCatAPI("YOUR_API_KEY");

/**
 * get all favourites of this account
 */
async function getFavourites() {
  const favourites = await theCatAPI.favourites.getFavourites();
  return favourites;
}

/**
 * get all favourites of a specific user
 */
async function getUserFavourites() {
  const favourites = await theCatAPI.favourites.getFavourites("USER_ID");
  return favourites;
}

/**
 * get a specific favourite using its id
 */
async function getFavourite() {
  const favourite = await theCatAPI.favourites.getFavourite(1);
  return favourite;
}

/**
 * save a favourite of an image from a specific user
 */
async function favouriteImage() {
  const favourite = await theCatAPI.favourites.addFavourite(
    "IMAGE_ID",
    "USER_ID"
  );
  return favourite;
}

/**
 * delete a specific vote using its id
 */
async function deleteFavourite() {
  const { message } = await theCatAPI.favourites.deleteFavourite(1);
  return message;
}
