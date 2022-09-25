import * as stream from "stream";

export type Image = {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds?: Record<string, any>[];
  categories?: Record<string, any>[];
};

export type SearchImagesFilter = {
  limit?: number;
  page?: number;
  order?: "ASC" | "DESC" | "RAND";
  hasBreeds?: boolean;
  breeds?: string[];
  categories?: number[];
  subId?: string;
  mimeTypes?: ("jpg" | "png" | "gif")[];
  format?: "json" | "src";
  size?: "small" | "med" | "full";
};

export type GetRandomImageFilter = Omit<
  SearchImagesFilter,
  "limit" | "page" | "order"
>;

export type UploadImageResponse = Omit<Image, "categories"> & {
  sub_id?: string;
  originalFilename: string;
  pending: boolean;
  approved: boolean;
};

export type GetImagesFilter = SearchImagesFilter & {
  originalFilename?: string;
};

type ImageVote = {
  id: number;
  value: number;
};

type ImageFavourite = {
  id: number;
};

export type UserImageResponse = Image & {
  breeds: Record<string, any>;
  breed_ids: string | null;
  original_filename: string;
  sub_id: string | null;
  created_at: Date;
  vote?: ImageVote;
  favourite?: ImageFavourite;
};

export type UserImage = Image & {
  breeds: Record<string, any>;
  breedId: string | null;
  originalFilename: string;
  subId: string | null;
  createdAt: Date;
  vote?: ImageVote;
  favourite?: ImageFavourite;
};

export function mapUserImage(response: UserImageResponse): UserImage {
  return {
    id: response.id,
    originalFilename: response.original_filename,
    url: response.url,
    breeds: response.breeds,
    breedId: response.breed_ids ?? null,
    categories: response.categories,
    subId: response.sub_id ?? null,
    height: response.height,
    width: response.width,
    createdAt: response.created_at,
    favourite: response.favourite,
    vote: response.vote,
  };
}

export interface ImagesInterface {
  searchImages(filter?: SearchImagesFilter): Promise<Image[]>;
  getImage(id: string): Promise<Image>;
  getImages(filter?: GetImagesFilter): Promise<UserImage[]>;
  getRandomImage(filter?: GetRandomImageFilter): Promise<Image | null>;
  uploadImage(
    image: File | stream.Readable,
    subId?: string
  ): Promise<UploadImageResponse>;
  deleteImage(id: string): Promise<void>;
}
