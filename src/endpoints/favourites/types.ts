export type FavouriteResponse = {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: string | null;
  created_at: Date;
  image: {
    id: string;
    url: string;
  };
};

export type Favourite = {
  id: number;
  userId: string;
  imageId: string;
  subId: string | null;
  createdAt: Date;
  image: {
    id: string;
    url: string;
  };
};
