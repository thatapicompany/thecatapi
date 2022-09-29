import { VotesInterface } from "./votes.interface";
import { ApiRequest } from "../../services/ApiRequest";
import {
  AddVote,
  AddVoteData,
  AddVoteResponse,
  DeleteVote,
  GetVote,
  GetVoteResponse,
  Vote,
  VoteResponse,
} from "./types";
import { buildQueryParams } from "../../util/buildQueryParams";
import { mapImageFilters } from "../images/mappers";
import { HttpMethod } from "../../services/ApiRequest/HttpMethod";
import { mapAddedVote, mapAddVoteData, mapVote, mapVotes } from "./mappers";

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

  async addVote(data: AddVoteData): Promise<AddVote> {
    const mappedData = mapAddVoteData(data);
    const addedVote = await this.api.request<AddVoteResponse>(
      HttpMethod.POST,
      this.endpoint,
      mappedData
    );
    return mapAddedVote(addedVote);
  }

  async deleteVote(id: number): Promise<DeleteVote> {
    return await this.api.request<DeleteVote>(
      HttpMethod.DELETE,
      `${this.endpoint}/${id}`
    );
  }
}

export default Votes;
