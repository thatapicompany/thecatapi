import { VotesInterface } from "./votes.interface";
import { ApiRequest } from "../../services/ApiRequest";

class Votes implements VotesInterface {
  api: ApiRequest;
  endpoint: string;

  constructor(apiService: ApiRequest) {
    this.api = apiService;
    this.endpoint = "/votes";
  }
}

export default Votes;