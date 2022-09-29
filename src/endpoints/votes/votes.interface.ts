import { AddVote, AddVoteData, DeleteVote, GetVote, Vote } from "./types";

export interface VotesInterface {
  getVotes(subId?: string): Promise<Vote[]>;
  getVote(id: number): Promise<GetVote>;
  addVote(data: AddVoteData): Promise<AddVote>;
  deleteVote(id: number): Promise<DeleteVote>;
}
