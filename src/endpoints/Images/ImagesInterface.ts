export type Image = {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds?: Record<string, any>[];
  categories?: Record<string, any>[];
};

export type GetImagesFilter = {
    limit?: number,
    page?: number,
    order?: "ASC" | "DESC" | "RAND",
    hasBreeds?: boolean,
    breeds?: string[],
    categories?: number[],
    subId?: string,
    mimeTypes?: ("jpg" | "png" | "gif")[],
    format?: "json" | "src",
    size?: "small" | "med" | "full",
};

export interface ImagesInterface {
  getImages(filter?: GetImagesFilter): Promise<Image[]>;
  getImage(id: string): Promise<Image>;
}
