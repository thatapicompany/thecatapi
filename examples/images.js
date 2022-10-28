import { Breed, TheCatAPI } from "@thatapicompany/thecatapi";
import fs from "fs";

const theCatAPI = new TheCatAPI("YOUR_API_KEY");

/**
 * get 10 images containing a breed, in png format
 */
async function getImagesWithBreeds() {
  const images = await theCatAPI.images.searchImages({
    limit: 10,
    hasBreeds: true,
    mimeTypes: ["png"],
  });
  return images;
}

/**
 * get 10 images of a specific breed (Chartreux)
 */
async function getChartreuxImages() {
  const images = await theCatAPI.images.searchImages({
    limit: 10,
    breeds: [Breed.CHARTREUX],
  });
  return images;
}

/**
 * get a random image containing a breed
 */
async function getRandomImage() {
  const image = await theCatAPI.images.getRandomImage({
    hasBreeds: true,
  });
  return image;
}

/**
 * uploading an image in the browser
 */
async function uploadImage(file) {
  const uploadedImage = await theCatAPI.images.uploadImage(file);
  return uploadedImage;
}

/**
 * uploading an image in node
 */
async function uploadImageNode() {
  const file = fs.createReadStream("PATH_TO_THE_IMAGE");
  const uploadedImage = await theCatAPI.images.uploadImage(file);
  return uploadedImage;
}

/**
 * get a specific image using its id
 */
async function getImage() {
  const image = await theCatAPI.images.getImage("IMAGE_ID");
  return image;
}

/**
 * get all images uploaded to your account
 */
async function getUploadedImages() {
  const images = await theCatAPI.images.getImages({
    limit: 10,
  });
  return images;
}

/**
 * delete uploaded image from your account
 */
async function deleteUploadedImage() {
  await theCatAPI.images.deleteImage("IMAGE_ID");
}
