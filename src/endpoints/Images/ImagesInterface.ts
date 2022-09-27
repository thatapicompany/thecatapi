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
  searchImages(filter?: SearchImagesFilter): Promise<Image[]>;
  getImage(id: string, options?: GetImageOptions): Promise<GetImage>;
  getImages(filter?: GetImagesFilter): Promise<UserImage[]>;
  getRandomImage(filter?: GetRandomImageFilter): Promise<Image | null>;
  getImageAnalysis(id: string): Promise<ImageAnalysis[]>;
  uploadImage(
    image: File | stream.Readable,
    subId?: string
  ): Promise<UploadedImage>;
  deleteImage(id: string): Promise<void>;
}
