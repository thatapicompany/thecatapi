import {
  GetImagesFilter,
  SearchImagesFilter,
  UploadedImage,
  UploadImageResponse,
  UserImage,
  UserImageResponse,
} from "./types";

export function mapUploadedImage(response: UploadImageResponse): UploadedImage {
  return {
    id: response.id,
    width: response.width,
    height: response.height,
    url: response.url,
    subId: response.sub_id,
    originalFilename: response.original_filename,
    pending: Boolean(response.pending),
    approved: Boolean(response.approved),
  };
}

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

export function mapImageFilters(filter: GetImagesFilter | SearchImagesFilter) {
  return Object.entries(filter).map(([key, value]) => {
    if (key === "hasBreeds") {
      return ["has_breeds", value ? 1 : 0];
    } else if (key === "breeds") {
      return ["breed_ids", (value as []).join(",")];
    } else if (key === "categories") {
      return ["category_ids", (value as []).join(",")];
    } else if (key === "mimeTypes") {
      return ["mime_types", (value as []).join(",")];
    } else if (key === "subId") {
      return ["sub_id", value];
    } else if (key === "originalFilename") {
      return ["original_filename", value];
    }
    return [key, value];
  });
}
