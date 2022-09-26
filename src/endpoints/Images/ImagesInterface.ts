import * as stream from "stream";
import {
  GetImagesFilter, GetRandomImageFilter,
  Image,
  SearchImagesFilter,
  UploadedImage,
  UserImage
} from "./types";

export interface ImagesInterface {
  searchImages(filter?: SearchImagesFilter): Promise<Image[]>;
  getImage(id: string): Promise<Image>;
  getImages(filter?: GetImagesFilter): Promise<UserImage[]>;
  getRandomImage(filter?: GetRandomImageFilter): Promise<Image | null>;
  uploadImage(
    image: File | stream.Readable,
    subId?: string
  ): Promise<UploadedImage>;
  deleteImage(id: string): Promise<void>;
}
