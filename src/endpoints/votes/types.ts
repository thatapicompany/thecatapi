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
}

export type GetVote = Vote & {
  userId: string;
};
