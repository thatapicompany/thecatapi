import { VotesInterface } from "./votes.interface";
import { ApiRequest } from "../../services/ApiRequest";
import { GetVote, GetVoteResponse, Vote, VoteResponse } from "./types";
import { buildQueryParams } from "../../util/buildQueryParams";
import { mapImageFilters } from "../images/mappers";
import { HttpMethod } from "../../services/ApiRequest/HttpMethod";
import { mapVote, mapVotes } from "./mappers";

class Votes implements VotesInterface {
  api: ApiRequest;
  endpoint: string;

  constructor(apiService: ApiRequest) {
    this.api = apiService;
    this.endpoint = "/votes";
  }

  async getVotes(subId?: string): Promise<Vote[]> {
    const queryParams = subId
      ? buildQueryParams({ subId }, mapImageFilters)
      : "";
    const votes = await this.api.request<VoteResponse[]>(
      HttpMethod.GET,
      `${this.endpoint}${queryParams}`
    );
    return votes.map(mapVotes);
  }

  async getVote(id: number): Promise<GetVote> {
    const vote = await this.api.request<GetVoteResponse>(
      HttpMethod.GET,
      `${this.endpoint}/${id}`
    );
    return mapVote(vote);
  }
}

export default Votes;
