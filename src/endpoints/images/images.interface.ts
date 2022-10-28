import * as stream from "stream";
import {
  GetImage,
  GetImageOptions,
  GetImagesFilter,
  GetRandomImageFilter,
  Image,
  ImageAnalysis,
  SearchImagesFilter,
  UploadedImage,
  UserImage,
} from "./types";

export interface ImagesInterface {
  /**
   * Searches all approved images
   *
   * @param [filter] - optional filter
   * @param [filter.size] - size of the images
   * @param [filter.mime_types] - format of the images
   * @param [filter.order] - order of the images
   * @param [filter.page] - used for paginating through all the results. Only used when order is ASC or DESC
   * @param [filter.limit] - number of images to be returned
   * @param [filter.categories] - list of unique category ids that represent a category
   * @param [filter.breeds] - breed enums
   * @param [filter.hasBreeds] - only return images which have breed data attached
   * @returns list of images matching the filter criteria
   */
  searchImages(filter?: SearchImagesFilter): Promise<Image[]>;

  /**
   * Returns an individual image
   *
   * @param id - id of the image
   * @param options - optional filter
   * @param [options.subId] - specify this to save this request the account stats
   * @param [options.size] - size of the image
   * @returns image with the given id
   */
  getImage(id: string, options?: GetImageOptions): Promise<GetImage>;

  /**
   * Returns the images uploaded to this account
   *
   * @param [filter] - optional filter
   * @param [filter.size] - size of the images
   * @param [filter.mime_types] - format of the images
   * @param [filter.order] - order of the images
   * @param [filter.page] - used for paginating through all the results. Only used when order is ASC or DESC
   * @param [filter.limit] - number of images to be returned
   * @param [filter.categories] - list of unique category ids that represent a category
   * @param [filter.breeds] - breed enums
   * @param [filter.hasBreeds] - only return images which have breed data attached
   * @param [filter.subId] - custom id (provided when uploading the image)
   * @param [filter.originalFilename] - original file name of the uploaded image
   * @returns images uploaded to this account
   */
  getImages(filter?: GetImagesFilter): Promise<UserImage[]>;

  /**
   * Returns a random image
   *
   * @param [filter] - optional filter
   * @param [filter.size] - size of the image
   * @param [filter.mime_types] - format of the image
   * @param [filter.categories] - list of unique category ids that represent a category
   * @param [filter.breeds] - breed enums
   * @param [filter.hasBreeds] - only return an image with breed data attached
   * @returns image matching the filter criteria, null if no image exists that matches the filter
   */
  getRandomImage(filter?: GetRandomImageFilter): Promise<Image | null>;

  /**
   * Returns the analysis of an images
   *
   * @param id - id of the image
   * @returns image analysis containing an array of labels detected in the image and the level of confidence by which they were detected
   */
  getImageAnalysis(id: string): Promise<ImageAnalysis[]>;

  /**
   * Uploads a cat/dog image
   *
   * @param image - Node stream or a blob of the image to be uploaded
   * @param [subId] - custom id
   * @returns uploaded image data
   */
  uploadImage(
    image: File | stream.Readable,
    subId?: string
  ): Promise<UploadedImage>;

  /**
   * Deletes an image
   *
   * @param id - id of the image
   */
  deleteImage(id: string): Promise<void>;
}
