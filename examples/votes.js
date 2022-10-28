import { TheCatAPI } from "@thatapicompany/thecatapi";

const theCatAPI = new TheCatAPI("YOUR_API_KEY");

/**
 * get all votes of this account
 */
async function getVotes() {
  const votes = await theCatAPI.votes.getVotes();
  return votes;
}

/**
 * get all votes of a specific user
 */
async function getUserVotes() {
  const votes = await theCatAPI.votes.getVotes("USER_ID");
  return votes;
}

/**
 * get a specific vote using its id
 */
async function getVote() {
  const vote = await theCatAPI.votes.getVote(1);
  return vote;
}

/**
 * save an upvote of an image from a specific user
 */
async function upvoteImage() {
  const vote = await theCatAPI.votes.addVote({
    imageId: "IMAGE_ID",
    subId: "USER_ID",
    value: 1,
  });
  return vote;
}

/**
 * delete a specific vote using its id
 */
async function deleteVote() {
  const { message } = await theCatAPI.votes.deleteVote(1);
  return message;
}
