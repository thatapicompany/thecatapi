import {
  AddVote,
  AddVoteData,
  AddVoteRequestData,
  AddVoteResponse,
  GetVote,
  GetVoteResponse,
  Vote,
  VoteResponse,
} from "./types";

export function mapVotes(response: VoteResponse): Vote {
  return {
    id: response.id,
    subId: response.sub_id,
    value: response.value,
    imageId: response.image_id,
    countryCode: response.country_code,
    createdAt: response.created_at,
    image: response.image,
  };
}

export function mapVote(response: GetVoteResponse): GetVote {
  return {
    ...mapVotes(response),
    userId: response.user_id,
  };
}

export function mapAddVoteData(data: AddVoteData): AddVoteRequestData {
  return {
    image_id: data.imageId,
    sub_id: data.subId,
    value: data.value,
  };
}

export function mapAddedVote(response: AddVoteResponse): AddVote {
  return {
    id: response.id,
    subId: response.sub_id,
    imageId: response.image_id,
    value: response.value,
    countryCode: response.country_code,
    message: response.message,
  };
}
