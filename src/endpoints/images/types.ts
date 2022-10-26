import { Breed } from "./breed.enum";

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
  breeds?: Breed[];
  categories?: number[];
  mimeTypes?: ("jpg" | "png" | "gif")[];
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
  subId?: string;
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

type ImageAnalysisLabel = {
  confidence: number;
  instances?: {
    boundingBox: {
      height: number;
      left: number;
      top: number;
      width: number;
    };
    confidence: number;
  }[];
  name: string;
  parents?: {
    name: string;
  }[];
};

export type ImageAnalysisResponse = {
  labels: {
    Confidence: number;
    Instances?: {
      BoundingBox: {
        Height: number;
        Left: number;
        Top: number;
        Width: number;
      };
      Confidence: number;
    }[];
    Name: string;
    Parents?: {
      Name: string;
    }[];
  }[];
  moderation_labels: any[];
  vendor: string;
  image_id: string;
  created_at: Date;
};

export type ImageAnalysis = {
  labels: ImageAnalysisLabel[];
  moderationLabels: any;
  vendor: string;
  imageId: string;
  createdAt: Date;
};
