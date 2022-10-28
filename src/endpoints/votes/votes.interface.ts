import { AddVote, AddVoteData, DeleteVote, GetVote, Vote } from "./types";

export interface VotesInterface {
  /**
   * Returns votes
   *
   * @param [subId] - specify this to filter votes by subId
   * @returns list of votes of this account (filtered by subId if specified)
   */
  getVotes(subId?: string): Promise<Vote[]>;

  /**
   * Returns a vote
   *
   * @param id - id of the vote
   * @returns vote with the given id
   */
  getVote(id: number): Promise<GetVote>;

  /**
   * Votes an image up or down
   *
   * @param data - data of the vote
   * @param data.imagesId - id of the image to be voted
   * @param data.value - vote value
   * @param [data.subId] - custom value used to filter votes (usually a user id)
   * @returns created vote data
   */
  addVote(data: AddVoteData): Promise<AddVote>;

  /**
   * Deletes a vote
   *
   * @param id - id of the vote to be deleted
   * @returns delete vote response message
   */
  deleteVote(id: number): Promise<DeleteVote>;
}
