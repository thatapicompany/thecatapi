import { VotesInterface } from "./votes.interface";
import { ApiRequest } from "../../services/ApiRequest";
import { Vote, VoteResponse } from "./types";
import { buildQueryParams } from "../../util/buildQueryParams";
import { mapImageFilters } from "../images/mappers";
import { HttpMethod } from "../../services/ApiRequest/HttpMethod";
import { mapVotes } from "./mappers";

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
}

export default Votes;
