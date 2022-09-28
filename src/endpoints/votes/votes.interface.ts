import { GetVote, Vote } from "./types";

export interface VotesInterface {
  getVotes(subId?: string): Promise<Vote[]>;
  getVote(id: number): Promise<GetVote>;
}
