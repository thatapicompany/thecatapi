import nock from "nock";
import TheCatAPI from "../../index";

describe("Votes", () => {
  let theCatAPI: TheCatAPI;

  beforeAll(() => {
    theCatAPI = new TheCatAPI("my-api-key");
  });

  describe("getVotes", () => {
    it("should fetch votes", async () => {
      const response = [
        {
          id: 603646,
          image_id: "non-existing-image-id",
          sub_id: "optional unique id of your user",
          created_at: "2022-09-21T15:30:11.000Z",
          value: 1,
          country_code: "DZ",
          image: {},
        },
        {
          id: 603649,
          image_id: "3rK7HGo7r",
          sub_id: "USR123",
          created_at: "2022-09-21T15:34:35.000Z",
          value: 1,
          country_code: "DZ",
          image: {
            id: "3rK7HGo7r",
            url: "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
          },
        },
      ];
      nock("https://api.thecatapi.com/v1/votes").get("").reply(200, response);
      const votes = await theCatAPI.votes.getVotes();
      expect(votes).toEqual([
        {
          id: 603646,
          imageId: "non-existing-image-id",
          subId: "optional unique id of your user",
          createdAt: new Date("2022-09-21T15:30:11.000Z"),
          value: 1,
          countryCode: "DZ",
          image: {},
        },
        {
          id: 603649,
          imageId: "3rK7HGo7r",
          subId: "USR123",
          createdAt: new Date("2022-09-21T15:34:35.000Z"),
          value: 1,
          countryCode: "DZ",
          image: {
            id: "3rK7HGo7r",
            url: "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
          },
        },
      ]);
    });
    it("should fetch votes using subId", async () => {
      const response = [
        {
          id: 603649,
          image_id: "3rK7HGo7r",
          sub_id: "USR123",
          created_at: "2022-09-21T15:34:35.000Z",
          value: 1,
          country_code: "DZ",
          image: {
            id: "3rK7HGo7r",
            url: "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
          },
        },
      ];
      nock("https://api.thecatapi.com/v1/votes")
        .get("")
        .query({ sub_id: "USR123" })
        .reply(200, response);
      const votes = await theCatAPI.votes.getVotes("USR123");
      expect(votes).toEqual([
        {
          id: 603649,
          imageId: "3rK7HGo7r",
          subId: "USR123",
          createdAt: new Date("2022-09-21T15:34:35.000Z"),
          value: 1,
          countryCode: "DZ",
          image: {
            id: "3rK7HGo7r",
            url: "https://cdn2.thecatapi.com/images/3rK7HGo7r.jpg",
          },
        },
      ]);
    });
  });

  describe("getVotes", () => {
    it("should fetch a vote", async () => {
      const response = {
        id: 604582,
        user_id: "7xmy56",
        image_id: "6ouipu94q",
        sub_id: "my-user-1234",
        created_at: "2022-09-25T08:12:12.000Z",
        value: 1,
        country_code: "DZ",
        image: {
          id: "6ouipu94q",
          url: "https://cdn2.thecatapi.com/images/6ouipu94q.jpg",
        },
      };
      nock("https://api.thecatapi.com/v1/votes")
        .get(`/${response.id}`)
        .reply(200, response);
      const vote = await theCatAPI.votes.getVote(604582);
      expect(vote).toEqual({
        id: 604582,
        userId: "7xmy56",
        imageId: "6ouipu94q",
        subId: "my-user-1234",
        createdAt: new Date("2022-09-25T08:12:12.000Z"),
        value: 1,
        countryCode: "DZ",
        image: {
          id: "6ouipu94q",
          url: "https://cdn2.thecatapi.com/images/6ouipu94q.jpg",
        },
      });
    });
  });
});
