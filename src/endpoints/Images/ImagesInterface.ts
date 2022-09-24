export type Image = {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds?: Record<string, any>[];
  categories?: Record<string, any>[];
};

export type GetImagesFilter = {
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
  GetImagesFilter,
  "limit" | "page" | "order"
>;

export type UploadImageResponse = Omit<Image, "categories"> & {
  sub_id?: string;
  originalFilename: string;
  pending: boolean;
  approved: boolean;
};

export interface ImagesInterface {
  getImages(filter?: GetImagesFilter): Promise<Image[]>;
  getImage(id: string): Promise<Image>;
  getRandomImage(filter?: GetRandomImageFilter): Promise<Image | null>;
  uploadImage(image: any, subId?: string): Promise<UploadImageResponse>;
}
