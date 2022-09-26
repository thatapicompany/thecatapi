type BaseImage = {
  id: string;
  width: number;
  height: number;
  url: string;
};

type ImageSize = "small" | "med" | "full";

export type Image = BaseImage & {
  breeds?: Record<string, any>[];
  categories?: Record<string, any>[];
};

export type GetImageOptions = {
  subId?: string;
  size?: ImageSize;
};

export type GetImage = Image & {
  vote?: ImageVote;
  favourite?: ImageFavourite;
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
  size?: ImageSize;
};

export type GetRandomImageFilter = Omit<
  SearchImagesFilter,
  "limit" | "page" | "order"
>;

export type UploadImageResponse = BaseImage & {
  sub_id?: string;
  original_filename: string;
  pending: number;
  approved: number;
};

export type UploadedImage = BaseImage & {
  subId?: string;
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

export type UserImageResponse = Omit<Image, "breeds"> & {
  breeds: Record<string, any>[];
  breed_ids: string | null;
  original_filename: string;
  sub_id: string | null;
  created_at: Date;
  vote?: ImageVote;
  favourite?: ImageFavourite;
};

export type UserImage = Omit<Image, "breeds"> & {
  breeds: Record<string, any>[];
  breedId: string | null;
  originalFilename: string;
  subId: string | null;
  createdAt: Date;
  vote?: ImageVote;
  favourite?: ImageFavourite;
};
