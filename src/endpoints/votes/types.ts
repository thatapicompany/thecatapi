type VoteImage = {
  url?: string;
  id?: string;
};

export type VoteResponse = {
  id: number;
  image_id: string;
  sub_id: string | null;
  value: number;
  country_code: string;
  created_at: Date;
  image: VoteImage;
};

export type Vote = {
  id: number;
  imageId: string;
  subId: string | null;
  value: number;
  countryCode: string;
  createdAt: Date;
  image: VoteImage;
};

export type GetVoteResponse = VoteResponse & {
  user_id: string;
};

export type GetVote = Vote & {
  userId: string;
};

export type AddVoteData = {
  imageId: string;
  subId?: string;
  value: number;
};

export type AddVoteRequestData = {
  image_id: string;
  sub_id?: string;
  value: number;
};

export type AddVoteResponse = {
  id: number;
  image_id: string;
  sub_id?: string;
  value: number;
  country_code: string;
  message: string;
};

export type AddVote = Omit<Vote, "createdAt" | "image" | "subId"> & {
  subId?: string;
  message: string;
};

export type DeleteVote = {
  message: string;
};
