import { Vote } from "./types";

export interface VotesInterface {
  getVotes(subId?: string): Promise<Vote[]>;
}
